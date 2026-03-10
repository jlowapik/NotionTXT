# Import Page Workflow

## Overview

The Import Skill reads a local `.txt` file (in the export format), parses the header and body, converts text patterns to Notion blocks, and calls MCP to create or update a Notion page.

## Command

```
/notion:import-page <file-path> --parent=<page-or-db-id> [--page=<page-id>] [--mode=create|update]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `file` | yes | — | Path to local `.txt` file |
| `--parent` | yes (create) | — | Notion parent page or database URL/ID |
| `--page` | no | — | Existing page URL/ID to update |
| `--mode` | no | `create` | `create` or `update` (auto-set to `update` if `--page` provided) |

## Workflow Steps

1. **Read File** — Read the `.txt` file at the provided path
2. **Parse Header** — Split at `---` separator, extract Title, URL, Tags, Status, Priority, dates
3. **Parse Body** — Text below first separator; detect media section if second `---` + `Media:` line
4. **Convert Text to Notion Blocks** — Reverse of export serialization (see conversion rules below)
5. **Resolve Operation** — Create vs update based on `--page`/`--mode`
6. **Call MCP** — `notion-create-pages` (create) or `notion-update-page` (update)
7. **Return Confirmation** — Operation type, page URL, title, block count, skipped content

## Text-to-Blocks Conversion Rules

| Text Pattern | Notion Block |
|--------------|--------------|
| UPPERCASE line (blank lines around) | `heading_1` |
| Title Case line (blank lines around) | `heading_2` |
| `- {text} (done)` | `to_do` (checked: true) |
| `- {text}` | `bulleted_list_item` |
| `{n}. {text}` | `numbered_list_item` |
| `"{text}"` | `quote` (strip surrounding quotes) |
| `[Image: ...]`, `[File: ...]`, `[Video: ...]` | `paragraph` (keep as reference text) |
| `[Child page: ...]` | Skip (cannot recreate child pages) |
| `[Unsupported: ...]` | Skip (cannot recreate unsupported blocks) |
| Blank line | Block separator (do not create a block) |
| Other text | `paragraph` |

**Heading detection rules:**
- **UPPERCASE heading**: line is all uppercase letters/spaces/punctuation, at least 2 characters, surrounded by blank lines (or at start/end of body)
- **Title Case heading**: each word starts with uppercase (articles/prepositions excepted), surrounded by blank lines, not matching other patterns

## Header Property Mapping

| Header Field | Notion Property |
|-------------|-----------------|
| `Title: {title}` | Page title (required) |
| `URL: {url}` | Informational, not used for import |
| `Last edited: {date}` | Informational, not used for import |
| `Tags: {values}` | `multi_select` property |
| `Status: {value}` | `status` property |
| `Priority: {value}` | `select` property |
| `Start date: {date}` | `date` property |
| `End date: {date}` | `date` property |

## Create vs Update

- If `--page` is provided: mode is `update`, uses the provided page ID
- If `--mode=update` without `--page`: error (page ID required)
- Otherwise: mode is `create`, requires `--parent`

**Create mode** calls `notion-create-pages` with parent, title, properties, and children blocks.

**Update mode** calls `notion-update-page` with page ID and updated properties.

## Error Handling

| Condition | Response |
|-----------|----------|
| No argument provided | `Usage: /notion:import-page <file-path> --parent=<page-or-db-id>` |
| File not found | `File not found: {path}` |
| Invalid file format | `Invalid file format: expected header section with --- separator` |
| No parent for create | `--parent is required when creating a new page` |
| No page for update | `--page is required when updating an existing page` |
| MCP failure | `Notion API error: {error message}` |
| Page not accessible | `Page not accessible. Ensure it's shared with the Notion integration.` |
