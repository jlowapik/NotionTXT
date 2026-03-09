---
name: notion:export-page
description: Export a Notion page to a clean .txt file
argument-hint: <page-url-or-id> [--out=path] [--mode=overwrite|append]
allowed-tools: mcp__claude_ai_NotionMCP__notion-fetch, mcp__claude_ai_NotionMCP__notion-search, Bash, Read, Write, Glob, Edit
---

# Export Notion Page

Export a single Notion page to a clean plain-text `.txt` file.

## 1. Parse Arguments

Extract from `$ARGUMENTS`:

- **Page identifier** (required): the first non-flag token. Either a Notion URL or a page ID.
- **`--out=<path>`** (optional): output directory. Default: `./exports/`
- **`--mode=<overwrite|append>`** (optional): write mode. Default: `overwrite`

## 2. Validate Input

**No argument provided:**
If `$ARGUMENTS` is empty or contains only flags, stop and respond:
```
Usage: /notion:export-page <page-url-or-id>
```

**Invalid page identifier:**
The page identifier must be one of:
- A Notion URL containing `notion.so` with a 32-character hex segment
- A 32-character hex string (with or without hyphens)

If it matches neither, stop and respond:
```
Invalid Notion page URL or ID: {input}
```

## 3. Execute Export Pipeline

Follow the full workflow defined in `Skills/export-page.md`:

1. Resolve page ID from the URL or raw ID
2. Fetch page via MCP (`notion-fetch`)
3. Serialize blocks to plain text using the serialization rules
4. Compose the output file (header + body + optional media section)
5. Compute output path using `node src/slugify.js resolve "{title}" "{out}"`
6. Write the file

Use the `--out` directory if provided, otherwise default to `./exports/`.
Use the `--mode` if provided, otherwise default to `overwrite`.

## 4. Handle Fetch Errors

**Page not accessible:**
If the MCP call returns an error, empty result, or indicates the page was not found, stop and respond:
```
Page not accessible. Ensure it's shared with the Notion integration.
```

**Empty page (no content blocks):**
If the page has properties but no content blocks, export the header section only and append a note:
```
Note: page has no content blocks.
```

## 5. Return Confirmation

After successful export, respond with:
- Output file path
- Page title
- Notion URL
- Last edited timestamp
