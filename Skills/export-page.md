# Skill: Export Notion Page

Export a single Notion page to a clean plain-text `.txt` file.

## Parameters

- `page` (required) — Notion page URL or page ID
- `out` (optional) — output directory (default: `./exports/`)
- `mode` (optional) — `overwrite` or `append` (default: `overwrite`)

## Execution Steps

### 1. Resolve Page ID

If `page` is a URL, extract the page ID:
- Notion URLs contain the page ID as the last 32-character hex segment (with or without hyphens)
- Pattern: take the last path segment, strip the title prefix before the final 32 hex chars, insert hyphens to form UUID format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

If `page` is already an ID (32 hex chars, with or without hyphens), normalize to hyphenated UUID format.

### 2. Fetch Page via MCP

Call `notion-fetch` with the page URL or ID to retrieve the page content.

The response includes:
- **Page properties**: title, status, dates, tags, and other metadata
- **Page blocks**: the content blocks that make up the page body

### 3. Serialize Blocks to Plain Text

Strip all Notion/markdown formatting to produce flat, human-readable plain text.

| Block type | Serialization |
|------------|---------------|
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
| `image` | `[Image: {caption}] ({url})` — collect for Media section |
| `file` | `[File: {name}] ({url})` — collect for Media section |
| `video` | `[Video: {caption}] ({url})` — collect for Media section |
| `child_page` | `[Child page: {title}]` |
| `child_database` | `[Child database: {title}]` |
| Any other | `[Unsupported: {block_type}]` |

Rich text formatting rules:
- Bold, italic, strikethrough, underline: strip all formatting, keep text only
- Links: render as `{text} ({url})`
- Inline code: keep text only, no backticks

Blank line between blocks. For consecutive list items of the same type, no blank line between them.

### 4. Compose Output File

Assemble the output in this format:

```
Title: {page title}
URL: {notion page URL}
Last edited: {last_edited_time}
Tags: {comma-separated tags/multi-select values, or omit line if none}

---

{serialized body text from step 3}
```

If media blocks were found (images, files, videos), append:

```

---
Media:
- [Image: caption] (url)
- [File: name] (url)
```

### 5. Compute Output Path

Run the slugify utility to determine the output file path:

```bash
node src/slugify.js resolve "{page title}" "{out directory}"
```

This handles:
- Slugification: lowercase, spaces to hyphens, strip special chars
- Collision detection: appends `-2`, `-3`, etc. if file exists

If `mode` is `overwrite` and the exact slugified path already exists, overwrite it directly (skip collision detection).

### 6. Write File

- If `mode` is `overwrite`: write (or overwrite) the file at the computed path
- If `mode` is `append`: append content to existing file, or create if it doesn't exist

Ensure the output directory exists before writing (create it if needed).

### 7. Return Confirmation

Report to the user:
- Output file path
- Page title
- Notion URL
- Last edited timestamp
