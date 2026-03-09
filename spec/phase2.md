# Phase 2 — Export Pipeline

## Goal

Implement the minimum end-to-end pipeline as an Export Skill: paste a Notion page URL, get a clean `.txt` file.

## Deliverables

- **Export Skill** (`Skills/export-page.md`) — markdown instructions Claude follows to execute fetch + clean + save
- **Slugify utility** (`src/slugify.js`) — deterministic title-to-filename conversion
- **Output conventions** — `.gitignore` updated, `exports/` directory gitignored

## Skill Inputs

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | yes | — | Notion page URL or page ID |
| `out` | no | `./exports/` | Output directory override |
| `mode` | no | `overwrite` | `overwrite` or `append` |

## Skill Workflow

1. **Resolve page** — extract page ID from URL or normalize raw ID
2. **Fetch via MCP** — call `notion-fetch` for page properties + blocks
3. **Serialize blocks to plain text** using v1 rules (see Serialization Rules below)
4. **Compose output** — header (properties) + separator + body + optional media section
5. **Compute output path** — slugified title, collision handling (`-2`, `-3`, etc.)
6. **Write file** — overwrite by default
7. **Return** confirmation with path, title, URL, last edited

## Output Format

```
Title: {title}
URL: {notion_url}
Last edited: {date}
Tags: {comma-separated}

---

{serialized body text}

---
Media:
- [Image: caption] (url)
- [File: name] (url)
```

Media section omitted if no media on page.

## Serialization Rules (v1)

All output is flat, human-readable plain text — no markdown syntax.

| Block type | Output |
|------------|--------|
| Heading 1 | UPPERCASE text, blank lines around |
| Heading 2 | Title Case text, blank lines around |
| Heading 3 | Text as-is, blank lines around |
| Paragraph | Plain text, blank line between |
| Bulleted list | `- ` prefix |
| Numbered list | `1. `, `2. `, etc. |
| To-do (unchecked) | `- ` prefix |
| To-do (checked) | `- {text} (done)` |
| Quote | `"{text}"` |
| Code block | Plain text, no fences |
| Divider | Blank line (no visible marker) |
| Media (image/file/video) | `[Type: caption] (url)` |
| Child page | `[Child page: title]` (no recursion) |
| Unsupported | `[Unsupported: block_type]` |

## File Naming

- Slugify: lowercase, spaces to hyphens, strip special chars, collapse multi-hyphens
- Collision: append `-2`, `-3`, etc. if file already exists

## Success Criteria

1. Export Skill executes full fetch + clean + save workflow
2. Page properties appear in .txt header
3. Block content is stripped to flat readable text
4. Media references appear as links/descriptions
5. Output saved to `./exports/` by default with configurable override
6. File name is slugified from page title with collision handling
