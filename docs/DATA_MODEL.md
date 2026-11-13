# Data model

Question records retain stable IDs and use zero-based `correct` answer indices. Source JSON is preserved under `datasets/legacy/`; add normalized/versioned datasets separately rather than overwriting original source data. Collections expose a `questions` array. Visual learning resources use stable IDs, subject/unit/type/title, and provenance.

## Provenance
- Verify official exam source/year before marking it verified.
- Label original practice questions as original, not official past questions.
- Preserve original source fields and log all editorial changes.
- Do not place personal learner details in public metadata.
