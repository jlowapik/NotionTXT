# Commands Reference

## /notion:export-page

Export a single Notion page to a clean plain-text `.txt` file.

### Syntax

```
/notion:export-page <page-url-or-id> [--out=path] [--mode=overwrite|append]
```

### Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| Page URL or ID | yes | — | Notion page URL (containing `notion.so`) or 32-character hex page ID |
| `--out` | no | `./exports/` | Output directory for the exported file |
| `--mode` | no | `overwrite` | Write mode: `overwrite` replaces existing file, `append` adds to it |

### Examples

```
/notion:export-page https://www.notion.so/My-Page-31e174e5ef2a8028b25fe26a47ed0009
```

```
/notion:export-page 31e174e5ef2a8028b25fe26a47ed0009 --out=./backup/
```

```
/notion:export-page https://www.notion.so/My-Page-abc123 --mode=append
```

### Error Messages

| Condition | Message |
|-----------|---------|
| No argument provided | `Usage: /notion:export-page <page-url-or-id>` |
| Invalid URL or ID | `Invalid Notion page URL or ID: {input}` |
| Page not accessible | `Page not accessible. Ensure it's shared with the Notion integration.` |
| Empty page (no content blocks) | Exports header only, warns: `Note: page has no content blocks.` |
| Unsupported block type | `[Unsupported: {block_type}]` included in output |

## /notion:import-page

Import a local `.txt` file to Notion as a new or updated page.

### Syntax

```
/notion:import-page <file-path> --parent=<page-or-db-id> [--page=<page-id>] [--mode=create|update]
```

### Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `file-path` | yes | — | Path to local `.txt` file in export format |
| `--parent` | yes (create) | — | Notion parent page or database URL/ID for the new page |
| `--page` | no | — | Existing Notion page URL/ID to update |
| `--mode` | no | `create` | `create` or `update` (auto-set to `update` if `--page` provided) |

### Examples

```
/notion:import-page exports/my-page.txt --parent=https://notion.so/Parent-Page-abc123
```

```
/notion:import-page exports/my-page.txt --page=abc123def456 --mode=update
```

```
/notion:import-page notes.txt --parent=abc123def456
```

### Error Messages

| Condition | Message |
|-----------|---------|
| No argument provided | `Usage: /notion:import-page <file-path> --parent=<page-or-db-id>` |
| File not found | `File not found: {path}` |
| Invalid file format | `Invalid file format: expected header section with --- separator` |
| No parent for create | `--parent is required when creating a new page` |
| No page for update | `--page is required when updating an existing page` |
| MCP failure | `Notion API error: {error message}` |
| Page not accessible | `Page not accessible. Ensure it's shared with the Notion integration.` |

## /notion:process-page

Fetch a Notion page, apply an AI transformation, and save as a new Notion page.

### Syntax

```
/notion:process-page <page-url-or-id> --transform=<type> [--parent=<id>] [--title=<text>]
```

### Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| Page URL or ID | yes | — | Source Notion page URL or 32-character hex page ID |
| `--transform` | yes | — | Transformation type or free-form custom instruction |
| `--parent` | no | same as source | Parent page/database URL/ID for the output page |
| `--title` | no | auto-generated | Custom title for the output page |

### Transform Options

| Keyword | Description |
|---------|-------------|
| `summarize` | Produce a concise summary |
| `action-items` | Extract all action items as a checklist |
| `translate:{lang}` | Translate to the specified language |
| `reformat:bullets` | Rewrite as bullet points |
| `reformat:outline` | Rewrite as a hierarchical outline |
| `key-points` | Extract main takeaways |
| Free-form text | Apply as custom transformation instruction |

### Examples

```
/notion:process-page https://notion.so/My-Page-abc123 --transform=summarize
```

```
/notion:process-page abc123def456 --transform=translate:es
```

```
/notion:process-page abc123def456 --transform=action-items --title="Q4 Tasks"
```

```
/notion:process-page abc123def456 --transform="rewrite for a technical audience"
```

### Error Messages

| Condition | Message |
|-----------|---------|
| No argument provided | `Usage: /notion:process-page <page-url-or-id> --transform=<type>` |
| Missing transform | `--transform is required. Options: summarize, action-items, translate:{lang}, reformat:bullets, reformat:outline, key-points, or custom text` |
| Invalid page URL/ID | `Invalid Notion page URL or ID: {input}` |
| Page not accessible | `Page not accessible. Ensure it's shared with the Notion integration.` |
| Empty page | `Page has no content to transform.` |
| Create failure | `Failed to create output page: {error message}` |

## /docs:generate

Generate all project documentation from source artifacts. The Docs Skill is the single source of truth for `README.md` and `docs/` content.

### Syntax

```
/docs:generate [--scope=all|readme|docs]
```

### Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--scope` | no | `all` | What to generate: `all` (README + docs/), `readme` (README.md only), `docs` (docs/*.md only) |

### Examples

```
/docs:generate
```

```
/docs:generate --scope=readme
```

```
/docs:generate --scope=docs
```

### Generated Files

| File | Content |
|------|---------|
| `README.md` | Project overview, data flow diagram, quick start, commands, output format, troubleshooting |
| `docs/export-page.md` | Export workflow, serialization rules, output format, error handling |
| `docs/import-page.md` | Import workflow, conversion rules, property mapping, error handling |
| `docs/process-page.md` | Process workflow, transformation types, output page, error handling |
| `docs/commands.md` | All commands with syntax, parameters, examples, error messages |
| `docs/setup.md` | Prerequisites, MCP connection, page sharing, verification, troubleshooting |

### Error Messages

| Condition | Message |
|-----------|---------|
| Invalid scope value | `Invalid scope: {value}. Must be one of: all, readme, docs` |
| Missing source file | Warning in confirmation (generation continues) |
| Write failure | Error reported for that file (remaining files still generated) |
