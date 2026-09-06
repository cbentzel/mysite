---
title: "Roam - Remote Machine Development"
date: "2026-09-06"
excerpt: "Remote Persistent Development with Macbook head and Linux server."
---

# Remote Connection

This page documents my setup for working primarily from a MacBook as a simple terminal, with a 
Linux dev environment (desktop, VM, etc) as the "real" workhorse. 

It is opinionated and detailed because the goal is to give you a recipe
you can copy. Other setups (VSCode Remote SSH, RDP, VNC) are out of scope here and may be
documented separately later.

Most of this should apply well to a Linux laptop going to a Linux workhorse, but I've only validated it with this setup.

## Goals

The setup below is built to satisfy three specific requirements:

1. **Robot SSH certificates obtained on the MacBook are usable from the Linux dev environment.** 
   Boston Dynamics uses SSH certificates as the primary mechanism for SSH authentication to robots. 
   This has a number of advatages - the certificates are short-lived, scoped to a device, and can
   provide an audit trail for who authenticates. 
   To obtain a certificate, users need to authenticate to a service via SSO with MFA. 
   I want to authenticate on my MacBook but pass along the credential to the Linux Dev Environment.
   This way both the MacBook and the Linux Dev Environment can ssh to the robot using the same credentials.
   This requires **SSH agent forwarding** end to end.

2. **All real work runs in `tmux` on the Linux dev environment.** Long-running builds, editors, and
   shells must survive the MacBook closing its lid, the laptop sleeping, or the network
   changing. Nothing important runs in a process tied to the MacBook-side terminal.

3. **The MacBook automatically reconnects after sleeps, Wi-Fi changes, and VPN drops.** When I
   open my laptop in a new location, I should be back in my existing `tmux` session within a
   few seconds with no manual intervention.

The pieces:

| Where         | What            | Purpose                                                                                 |
| ------------- | --------------- | --------------------------------------------------------------------------------------- |
| MacBook       | `~/.ssh/config` | Server-alive pings so a dead TCP connection is noticed within ~10 seconds.              |
| MacBook       | `~/.zshrc`      | A shell function that wraps `ssh` in a retry loop and reattaches `tmux` on the far end. |
| Linux         | `~/.bashrc`     | Pin a stable symlink to the forwarded `SSH_AUTH_SOCK`.                                  |
| Linux         | `~/.tmux.conf`  | Make new `tmux` panes use the stable symlink path.                                      |

No third-party tools are required — the MacBook side is just stock `ssh` plus a small `zsh`
function.

## MacBook Side

### `~/.ssh/config`

```text
Host linux-machine
    ServerAliveInterval 5
    ServerAliveCountMax 2
```

Replace `linux-machine` with your dev host. The two `ServerAlive*` lines are the
important part: `ssh` will send a keepalive every 5 seconds and exit after 2 missed responses
(~10 seconds total). That timeout is what makes the retry loop below feel responsive after a
sleep / Wi-Fi change / VPN drop. Tighter values trade bandwidth and false-positives on flaky
links for faster recovery.

### `~/.zshrc`

```zsh
roam() {
    # Parameterize the session name: defaults to 'main' if no argument is given
    local session="${1:-main}"
    local target="linux-machine"

    while true; do
        clear
        echo "🚀 [$(date +%H:%M:%S)] Connecting to $target..."
        echo "📂 tmux session: $session"

        # We use standard ssh here. Your ~/.ssh/config (ServerAlive settings)
        # will force this to exit 10s after a network drop.
        # The 'grep' part hides the "nodename nor servname" spam.
        ssh -A -o ControlPath=none -t "$target" "tmux new -A -s $session" 2> >(grep -v "nodename nor servname provided" >&2)

        # This runs only when SSH exits (due to a drop or manual exit)
        echo -e "\n\033[0;31m❌ CONNECTION LOST or DISCONNECTED.\033[0m"
        echo "Retrying in 5 seconds... (Press Ctrl+C to stop)"
        sleep 5
    done
}
```

What each piece is doing:

| Piece                                                | Why                                                                                                                                                                                                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `local session="${1:-main}"`                         | First argument names the tmux session; defaults to `main`. Lets you keep separate persistent sessions: `roam work`, `roam debug`, `roam`.                                                                                                       |
| `while true; do ... sleep 5; done`                   | The reconnect loop. When `ssh` returns (network drop, lid close, manual exit), the loop pauses 5 seconds and tries again — until you `Ctrl-C` out of it.                                                                                        |
| `clear` + echoed banner                              | Visible feedback that you're connecting / have just reconnected.                                                                                                                                                                                |
| `ssh -A`                                             | Forwards the MacBook's `ssh-agent` to the dev desktop. This is the agent-forwarding leg that makes robot SSH from the desktop work.                                                                                                             |
| `-o ControlPath=none`                                | Disables SSH connection multiplexing for this invocation. Without this, a stale control-master socket from a previous session can hijack the new attempt and produce confusing failures. Each retry is guaranteed to be a fresh TCP connection. |
| `-t`                                                 | Forces a TTY — required for `tmux`.                                                                                                                                                                                                             |
| `tmux new -A -s $session`                            | "Attach to session `$session` if it exists, otherwise create it." Same one-liner works first-time and on every reconnect.                                                                                                                       |
| `2> >(grep -v "nodename nor servname provided" >&2)` | While VPN is down, DNS lookup fails and `ssh` prints a noisy error every retry. This filters that one specific message out of stderr; real failures still surface.                                                                              |

To stop reconnecting: `Ctrl-C` out of the loop, or close the terminal window.

## Linux Side

The remaining problem is specific to long-lived `tmux` sessions and forwarded SSH agents.

When you connect with `ssh -A`, sshd on the Linux side creates a per-session Unix socket
(typically `/tmp/ssh-XXXXXX/agent.NNNN`) and exposes its path via `$SSH_AUTH_SOCK`. When the
SSH connection dies and the retry loop reconnects, the new session has a **different** socket
path. Long-running `tmux` panes still hold the old `SSH_AUTH_SOCK` value pointing at a now-dead
socket, so `ssh some-robot` from inside those panes fails with "Could not open a connection to
your authentication agent."

The fix: maintain a stable symlink at `~/.ssh/ssh_auth_sock` that always points at the current
live forwarded socket, and configure `tmux` to use that stable path inside panes.

### `~/.bashrc`

This snippet must go at the **very top** of `~/.bashrc`, above any non-interactive guard.
Stock Ubuntu/Debian `.bashrc` files start with something like:

```bash
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

If the SSH agent setup runs _after_ that guard, non-interactive SSH invocations
(`ssh dev "some command"`, scripted tooling, VS Code Remote, anything that runs a remote
command without a login shell) won't have `SSH_AUTH_SOCK` set correctly. Putting the snippet
above the guard makes it apply to every shell — interactive or not.

```bash
# Update the symlink to the current SSH hand-off
if [ -n "$SSH_AUTH_SOCK" ] && [ "$SSH_AUTH_SOCK" != "$HOME/.ssh/ssh_auth_sock" ]; then
    ln -sf "$SSH_AUTH_SOCK" "$HOME/.ssh/ssh_auth_sock"
fi
export SSH_AUTH_SOCK="$HOME/.ssh/ssh_auth_sock"
```

Two things to notice:

- The `if` only fires for fresh SSH logins (where `$SSH_AUTH_SOCK` is the per-session
  `/tmp/ssh-XXXXXX/agent.NNNN` path). Inside `tmux`, `$SSH_AUTH_SOCK` is already
  `~/.ssh/ssh_auth_sock` and the symlink is left alone.
- The `export` is **outside** the `if` so that `$SSH_AUTH_SOCK` always ends up pointing at
  the symlink, even in shells that don't have a fresh forwarded socket to update with. Tools
  in those shells either find the live agent through the symlink or fail cleanly with no
  agent — no stale per-session paths leak through.

### `~/.tmux.conf`

```text
# Use the stable SSH agent socket symlink so existing panes keep working
# after the underlying SSH connection is replaced.
set-environment -g SSH_AUTH_SOCK "$HOME/.ssh/ssh_auth_sock"
```

This makes every new pane created by `tmux` inherit `SSH_AUTH_SOCK=~/.ssh/ssh_auth_sock`,
regardless of the value that happened to be set when the `tmux` server was originally
started. Combined with the `.bashrc` snippet repointing the symlink on every reconnect,
existing panes keep working through every connection cycle.

If you change `~/.tmux.conf` while a `tmux` server is already running, reload it from inside
tmux with `prefix : source-file ~/.tmux.conf`, or kill the server (`tmux kill-server`) and
start fresh.

## Daily Usage

1. On the MacBook, ensure your robot cert is loaded in the local agent. Verify with `ssh-add -l`.
2. Run `roam` (or `roam <session-name>` to use a non-default session). You land in the named
   tmux session on the Linux desktop.
3. Organize your workspace however you like. Both styles work and `roam` is agnostic between
   them:
   - **Inside one tmux session.** Use tmux's own splits and windows (`Ctrl-b "` for a
     horizontal pane, `Ctrl-b %` for vertical, `Ctrl-b c` for a new window) within the
     session you attached to.
   - **Multiple iTerm2 windows, multiple tmux sessions.** Open additional iTerm2 windows and
     run `roam <session-name>` with a different name in each — e.g. `roam build`, `roam
  logs`, `roam`. Each iTerm2 window owns its own SSH connection and its own tmux session.
     You can mix the two — e.g. one window with split panes for primary editing, a second
     window for build output. Every iTerm2 window running `roam` has its own independent
     reconnect loop.
4. Close the laptop. Open it again, possibly on a different network. Each `roam` terminal
   will print the red "CONNECTION LOST" banner, retry every 5 seconds, and re-attach to its
   tmux session as soon as the network is back.
5. To deliberately detach without stopping the loop: `Ctrl-b d` (you'll reconnect on the next
   loop iteration). To exit cleanly: `Ctrl-C` out of the `roam` loop.

To SSH into a robot from a tmux pane on the dev desktop:

```sh
ssh -A bd@some-robot.example.com
```

This works because:

- The pane's `SSH_AUTH_SOCK` is `~/.ssh/ssh_auth_sock` (set by `tmux`).
- That symlink points to the currently-forwarded socket on the dev desktop.
- The forwarded socket reaches the MacBook's `ssh-agent`.
- The agent presents the robot cert to the robot.

## Verifying It Works

After connecting with `roam` and landing in `tmux`:

```sh
# Should list the same identities as `ssh-add -l` on the MacBook.
ssh-add -l

# Should be a symlink to /tmp/ssh-XXXXXX/agent.NNNN
ls -l ~/.ssh/ssh_auth_sock
echo "$SSH_AUTH_SOCK"
```

To exercise the reconnect path end-to-end:

1. From a tmux pane, run `ssh -A bd@some-robot` and confirm it works.
2. Disconnect: close the laptop lid, toggle Wi-Fi off and on, or kill the SSH process from
   another terminal.
3. Wait for the `roam` loop to reconnect (you'll see the red banner and then the green one
   again).
4. In the **same** tmux pane (not a new one), run `ssh some-robot` again. It should still work
   — that's the test that the symlink trick is doing its job. If it fails with "Could not open
   a connection to your authentication agent", the symlink update or the `tmux` env line is
   not in place.

## Caveats

- **Agent forwarding has security implications.** Anyone with root on the dev desktop can use
  your forwarded agent for the duration of the connection — they can SSH to any robot you have
  a cert for. For BDI internal dev hosts this is generally accepted; be aware before enabling
  it elsewhere.
- **Cert expiry.** Robot SSH certificates intentionally expire. If `ssh
some-robot` suddenly fails with a permission error, refresh the cert on the MacBook. The
  forwarded agent will pick up the new cert on the next reconnect — kill the current SSH from
  the dev desktop side (or `Ctrl-C` and re-run `roam`) to force one.
- **First boot of the day.** If the MacBook agent is empty (cert not yet loaded), agent
  forwarding still works but presents zero identities. Load the cert before running `roam`,
  or `roam` will succeed but robot SSH from the desktop will fail until you do.
- **The retry loop hides nothing.** Unlike `autossh -f`, this is a foreground loop with
  visible banners on every cycle. If something is wrong (typo in the hostname, cert problem,
  VPN never coming back), you'll see it.

## References

- [`ssh_config(5)`](https://man.openbsd.org/ssh_config) — full list of client options
- [`ssh(1)`](https://man.openbsd.org/ssh) — including `-A`, `-t`, `-o`
- [tmux documentation](https://github.com/tmux/tmux/wiki) — sessions, windows, panes
