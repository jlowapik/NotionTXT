---
name: docs:generate
description: Generate all project documentation from source artifacts
argument-hint: [--scope=all|readme|docs]
allowed-tools: Bash, Read, Write, Glob, Edit
---

# Generate Documentation

Generate all project documentation from source artifacts. The Docs Skill is the single source of truth for `README.md` and `docs/` content.

## 1. Parse Arguments

Extract from `$ARGUMENTS`:

- **`--scope=<all|readme|docs>`** (optional): what to generate. Default: `all`

## 2. Validate Input

**Invalid scope value:**
If `--scope` is provided but is not one of `all`, `readme`, or `docs`, stop and respond:
```
Invalid scope: {value}. Must be one of: all, readme, docs
```

## 3. Execute Docs Pipeline

Follow the full workflow defined in `Skills/docs-generate.md`:

1. Parse scope parameter
2. Scan repository source files
3. Generate README.md (if scope is `all` or `readme`)
4. Generate docs/export-page.md (if scope is `all` or `docs`)
4b. Generate docs/import-page.md (if scope is `all` or `docs`)
4c. Generate docs/process-page.md (if scope is `all` or `docs`)
5. Generate docs/commands.md (if scope is `all` or `docs`)
6. Generate docs/setup.md (if scope is `all` or `docs`)
7. Write files, overwriting existing content

Use the `--scope` if provided, otherwise default to `all`.

## 4. Handle Errors

**Missing source files:**
If a source file listed in the scan step is missing, skip it and note the gap in the confirmation message. Do not fail the entire generation.

**Write failure:**
If a file cannot be written (e.g., permission error), report the error and continue with remaining files.

## 5. Return Confirmation

After successful generation, respond with:
- List of generated files with paths
- Scope used
- Any warnings (missing sources, write failures)
