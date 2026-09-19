---
title: "Book Review: Inference Engineering"
date: "2026-09-19"
excerpt: "A look at Philip Kiely's book on the stack that turns trained models into production services."
---

## Background

Low-latency edge and datacenter inference is extremely important for robotics. Edge in this case also includes on-robot, not just an HGX rack.

I've been looking for good material to hand seasoned system and/or performnance engineers to quickly understand the landscape of model inference.

That led me to [*Inference Engineering*](https://www.baseten.co/inference-engineering/) by Philip Kiely.

I first heard him on the [Latent Space podcast](https://www.latent.space/p/inference-eng), which included a reference to the book in addition to the rest of the conversation.

The book is available as a free PDF and ePUB download, so the entry fee to reading was low.

## Who it's for

*Inference Engineering* seems geared to a reader who is familiar with training models and wants to learn inference in more details. It is not as geared to a reader who has background in systems software and wants to learn about inference.

For example, the first chapter immediately jumps to mentioning KV Caches even before mentioning Transformers. MLPs and softmax are also mentioned but not described.

It also has a limited set of robotics centric information - the hardware survey doesn't include Jetson or related hardware, the multi-modal models don't cover VLAs. 

But, I'd still recommend this as a quick survey for someone who already has an understanding of common model primitives and architectures. If that reader already knows some of the material - such as quantization techniques - it can be a quick skim and refresher. If they don't know, it's a good survey with pointers to additional material to learn.

## What it covers

The strongest part about the book is it's breadth.

- **Hardware** — GPU architecture, NVIDIA's datacenter lineup, and the alternative accelerators
  chasing them.
- **Software** — CUDA, PyTorch, Transformers, and the inference engines (vLLM, TensorRT-LLM, and
  friends) that actually run requests.
- **Optimization** — quantization, speculative decoding, KV cache management, and model
  parallelism: the levers you pull once "it works" isn't good enough and you need it to be fast
  and cheap too.
- **Model types** — LLMs, vision-language models, image and video generation, and speech
  recognition/synthesis, each with its own serving quirks.
- **Production** — the infrastructure and application-layer concerns of actually running this in
  front of users.

The production chapter could probably be skipped as it is mostly focused on material such as docker and kubernetes which are also applicable outside of inference specifically. I would replace that with a chapter on agentic harness optimizations instead.

## Final Take
I'd recommend this to two classes of readers:
  * Researchers who are interested in learning more about how models will actually run at inference time.
  * Software devs or DevOps folks who may have to implement inference _after_ they have a good understanding of modern model architectures.
