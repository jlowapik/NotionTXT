---
name: notion:process-page
description: Fetch a Notion page, apply an AI transformation, and save as a new Notion page
argument-hint: <page-url-or-id> --transform=<type> [--parent=<id>] [--title=<text>]
allowed-tools: mcp__claude_ai_NotionMCP__notion-fetch, mcp__claude_ai_NotionMCP__notion-create-pages, mcp__claude_ai_NotionMCP__notion-search, Bash, Read, Write, Glob, Edit
---

# Process Notion Page

Fetch a Notion page, apply an AI transformation, and save the result as a new Notion page.

## 1. Parse Arguments

Extract from `$ARGUMENTS`:

- **Page identifier** (required): the first non-flag token. Either a Notion URL or a page ID.
- **`--transform=<type>`** (required): transformation to apply. Predefined keywords: `summarize`, `action-items`, `translate:{lang}`, `reformat:bullets`, `reformat:outline`, `key-points`. Or any free-form text as a custom instruction.
- **`--parent=<id>`** (optional): parent page/database URL/ID for the output page. Default: same parent as source.
- **`--title=<text>`** (optional): custom title for the output page. Default: auto-generated.

## 2. Validate Input

**No argument provided:**
If `$ARGUMENTS` is empty or contains only flags, stop and respond:
```
Usage: /notion:process-page <page-url-or-id> --transform=<type>
```

**Missing transform:**
If `--transform` is not provided, stop and respond:
```
--transform is required. Options: summarize, action-items, translate:{lang}, reformat:bullets, reformat:outline, key-points, or custom text
```

**Invalid page identifier:**
The page identifier must be one of:
- A Notion URL containing `notion.so` with a 32-character hex segment
- A 32-character hex string (with or without hyphens)

If it matches neither, stop and respond:
```
Invalid Notion page URL or ID: {input}
```

## 3. Execute Process Pipeline

Follow the full workflow defined in `Skills/process-page.md`:

1. Resolve the source page ID from the URL or raw ID
2. Fetch source page via MCP (`notion-fetch`)
3. Serialize page blocks to plain text using the serialization rules
4. Apply the AI transformation based on `--transform` value
5. Build the output page title (auto-generated or from `--title`)
6. Convert the transformed text to Notion blocks
7. Resolve the output parent (from `--parent` or same as source)
8. Create the output page via MCP (`notion-create-pages`)

## 4. Handle Errors

**Page not accessible:**
If the MCP fetch call returns an error or empty result, stop and respond:
```
Page not accessible. Ensure it's shared with the Notion integration.
```

**Empty page:**
If the page has properties but no content blocks, stop and respond:
```
Page has no content to transform.
```

**Create failure:**
If the MCP create call fails, stop and respond:
```
Failed to create output page: {error message}
```

## 5. Return Confirmation

After successful processing, respond with:
- Source page title and URL
- Transformation applied
- Output page URL
- Output page title
- Number of blocks created
