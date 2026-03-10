# Setup Guide

## Prerequisites

- **Claude Code** CLI installed
- **Notion** account with pages to export

## Connect Notion MCP

1. Open Claude Code in this workspace
2. The Notion MCP server connects automatically via Claude Code's cloud-hosted integration
3. Verify connection: run `/mcp` — should show `claude_ai_NotionMCP` server with tools like `notion-fetch`, `notion-search`, `notion-create-pages`, and `notion-update-page`

## Share Pages with the Integration

Notion pages must be explicitly shared with the integration before they can be accessed.

1. Open the Notion page you want to work with
2. Click **Share** in the top right
3. Invite the Notion integration (search for the connection name)
4. The page (and its children) will become accessible via MCP

## Verify Setup

1. Run `/mcp` — confirm `claude_ai_NotionMCP` server appears in the list
2. Try exporting a page: `/notion:export-page <any-shared-page-url>`
3. Check `./exports/` for the output `.txt` file

## Troubleshooting

### "Page not accessible"

The page hasn't been shared with the Notion integration. Open the page in Notion, click Share, and add the integration.

### "Invalid Notion page URL or ID"

The input doesn't look like a Notion URL or page ID. Valid formats:
- **URL**: must contain `notion.so` with a 32-character hex segment (e.g., `https://www.notion.so/Page-Title-abc123def456...`)
- **Page ID**: 32 hexadecimal characters, with or without hyphens

### Empty export (header only)

The page has properties but no content blocks. This is expected for blank pages. The export will include the header section and a note: "Note: page has no content blocks."

### Export directory doesn't exist

The `exports/` directory is created automatically on first export. If using `--out` to specify a custom directory, ensure the parent directory exists.

### "File not found"

When using `/notion:import-page`, the specified file path doesn't exist. Check that the path is correct and the file exists.

### "--transform is required"

When using `/notion:process-page`, you must specify a transformation type. Options: `summarize`, `action-items`, `translate:{lang}`, `reformat:bullets`, `reformat:outline`, `key-points`, or provide free-form custom text.

### `/mcp` doesn't show Notion server

The Notion MCP integration may not be connected. This is a cloud-hosted integration managed by Claude Code — ensure you're running Claude Code with MCP support enabled and that the Notion integration has been authorized.
