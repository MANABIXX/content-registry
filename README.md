# MANABIXX Content Registry

Canonical content repository for MANABIXX learning products.

This repository stores structured learning content independently from application code. Applications consume versioned JSON datasets from this repository; UI code must not duplicate content records.

## Principles
- Preserve source records and stable IDs; do not silently rewrite educational content.
- Every dataset has a manifest entry, schema version, provenance, counts, and validation status.
- Distinguish verified public-exam sources from original practice questions and unverified source references.
- Keep private/personal study material out of public collections. The historical `private-*` datasets are editorially classified as restricted/original practice content pending an explicit publication decision. **Important:** this repository is public, so every committed file (including those datasets) is currently readable from GitHub and raw file URLs. Registry `visibility` metadata and filename prefixes are not access controls. Do not treat these files as private; a publication decision and coordinated migration are required before they can be considered restricted in practice.
- Never put personal school targets or other private profile details in public metadata.

## Layout
- `registry.json`: top-level registry index.
- `schemas/`: JSON Schemas for questions, collections, and visual resources.
- `datasets/`: source-preserving datasets migrated from `knotspace/study`.
- `docs/`: authoring, validation, and integration guides.
- `scripts/`: validation and inventory tools.

## Source
Initial migration source: `knotspace/study@main` (2026-11-13). Original dataset files are preserved under `datasets/legacy/`; normalized registry metadata is maintained separately.
