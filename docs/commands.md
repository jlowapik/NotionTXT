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
| `README.md` | Project overview, quick start, architecture, commands, output format, troubleshooting |
| `docs/export-page.md` | Export workflow, serialization rules, output format, error handling |
| `docs/commands.md` | Both commands with syntax, parameters, examples, error messages |
| `docs/setup.md` | Prerequisites, MCP connection, page sharing, verification, troubleshooting |

### Error Messages

| Condition | Message |
|-----------|---------|
| Invalid scope value | `Invalid scope: {value}. Must be one of: all, readme, docs` |
| Missing source file | Warning in confirmation (generation continues) |
| Write failure | Error reported for that file (remaining files still generated) |
