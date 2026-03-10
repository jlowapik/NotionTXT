# Export Page Workflow

## Overview

The Export Skill fetches a single Notion page via MCP, strips all block formatting into flat readable plain text, and saves the result as a `.txt` file.

## Command

```
/notion:export-page <page-url-or-id> [--out=path] [--mode=overwrite|append]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | yes | — | Notion page URL or page ID |
| `out` | no | `./exports/` | Output directory |
| `mode` | no | `overwrite` | `overwrite` or `append` |

## Workflow Steps

1. **Resolve Page ID** — Extract the 32-character hex page ID from a Notion URL, or normalize a raw ID to hyphenated UUID format
2. **Fetch Page via MCP** — Call `notion-fetch` to retrieve page properties (title, status, dates, tags) and content blocks
3. **Serialize Blocks to Plain Text** — Strip all Notion/markdown formatting using the serialization rules below
4. **Compose Output File** — Assemble header (properties) + separator + body + optional media section
5. **Compute Output Path** — Run `node src/slugify.js resolve "{title}" "{out}"` for slugified filename with collision detection
6. **Write File** — Write or overwrite the file at the computed path (or append if mode is `append`)
7. **Return Confirmation** — Report output path, page title, URL, and last edited timestamp

## Serialization Rules

All output is flat, human-readable plain text — no markdown syntax.

| Block Type | Output |
|------------|--------|
| `heading_1` | `{TEXT}` (UPPERCASE, blank line before and after) |
| `heading_2` | `{Text}` (Title Case, blank line before and after) |
| `heading_3` | `{Text}` (as-is, blank line before and after) |
| `paragraph` | `{text}` (blank line between paragraphs) |
| `bulleted_list_item` | `- {text}` |
| `numbered_list_item` | `{n}. {text}` (track numbering per consecutive run) |
| `to_do` (unchecked) | `- {text}` |
| `to_do` (checked) | `- {text} (done)` |
| `quote` | `"{text}"` |
| `code` | `{text}` (plain text, no fences, no language tag) |
| `divider` | (blank line — no visible marker) |
| `image` | `[Image: {caption}] ({url})` |
| `file` | `[File: {name}] ({url})` |
| `video` | `[Video: {caption}] ({url})` |
| `child_page` | `[Child page: {title}]` |
| `child_database` | `[Child database: {title}]` |
| Any other | `[Unsupported: {block_type}]` |

Blank line between blocks. For consecutive list items of the same type, no blank line between them.

## Rich Text Formatting

- Bold, italic, strikethrough, underline: stripped, text only
- Links: rendered as `{text} ({url})`
- Inline code: text only, no backticks

## Output Format

```
Title: {page title}
URL: {notion page URL}
Last edited: {last_edited_time}
Tags: {comma-separated tags/multi-select values, or omit line if none}

---

{serialized body text}
```

If media blocks were found (images, files, videos), a media section is appended:

```

---
Media:
- [Image: caption] (url)
- [File: name] (url)
```

## File Naming

- **Slugify**: lowercase, spaces to hyphens, strip special characters, collapse multiple hyphens
- **Collision handling**: append `-2`, `-3`, etc. if file already exists
- **Overwrite mode**: if the exact slugified path exists and mode is `overwrite`, overwrite directly (skip collision detection)

## Error Handling

| Condition | Response |
|-----------|----------|
| No argument provided | `Usage: /notion:export-page <page-url-or-id>` |
| Invalid URL or ID | `Invalid Notion page URL or ID: {input}` |
| Page not accessible | `Page not accessible. Ensure it's shared with the Notion integration.` |
| Empty page (no blocks) | Exports header only, appends `Note: page has no content blocks.` |
| Unsupported block type | `[Unsupported: {block_type}]` in output |
