---
name: notion:import-page
description: Import a local .txt file to Notion as a new or updated page
argument-hint: <file-path> --parent=<page-or-db-id> [--page=<page-id>] [--mode=create|update]
allowed-tools: mcp__claude_ai_NotionMCP__notion-create-pages, mcp__claude_ai_NotionMCP__notion-update-page, mcp__claude_ai_NotionMCP__notion-fetch, Bash, Read, Write, Glob, Edit
---

# Import Text to Notion Page

Import a local `.txt` file to Notion as a new or updated page.

## 1. Parse Arguments

Extract from `$ARGUMENTS`:

- **File path** (required): the first non-flag token. Path to a local `.txt` file.
- **`--parent=<page-or-db-id>`** (required for create): Notion parent page or database URL/ID.
- **`--page=<page-id>`** (optional): existing Notion page URL/ID to update.
- **`--mode=<create|update>`** (optional): operation mode. Default: `create`. Auto-set to `update` if `--page` is provided.

## 2. Validate Input

**No argument provided:**
If `$ARGUMENTS` is empty or contains only flags, stop and respond:
```
Usage: /notion:import-page <file-path> --parent=<page-or-db-id>
```

**File not found:**
If the file does not exist at the provided path, stop and respond:
```
File not found: {path}
```

**Invalid file format:**
Read the file. If it does not contain a `---` separator line, stop and respond:
```
Invalid file format: expected header section with --- separator
```

**No parent for create:**
If mode is `create` and `--parent` is not provided, stop and respond:
```
--parent is required when creating a new page
```

**No page for update:**
If `--mode=update` is specified but `--page` is not provided, stop and respond:
```
--page is required when updating an existing page
```

## 3. Execute Import Pipeline

Follow the full workflow defined in `Skills/import-page.md`:

1. Read the .txt file at the provided path
2. Parse the header section (above `---`) for title, tags, status, priority, dates
3. Parse the body section (below `---`) for content blocks
4. Convert text lines to Notion blocks using the text-to-blocks conversion rules
5. Resolve the operation (create vs update) based on `--page`/`--mode`
6. Call MCP to create or update the page

Use `--parent` for the parent page/database when creating.
Use `--page` for the target page when updating.

## 4. Handle Errors

**MCP failure:**
If the MCP call returns an error, stop and respond:
```
Notion API error: {error message}
```

**Page not accessible:**
If updating and the target page is not found or inaccessible, stop and respond:
```
Page not accessible. Ensure it's shared with the Notion integration.
```

## 5. Return Confirmation

After successful import, respond with:
- Operation performed (created or updated)
- Notion page URL
- Page title
- Number of blocks created
- Any skipped content (child pages, unsupported blocks)
