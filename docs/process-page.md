# Process Page Workflow

## Overview

The Process Skill fetches a Notion page via MCP, applies an AI transformation to the content, and saves the result as a new Notion page. It reuses the export serialization to read page content and the import block conversion to write the transformed output back to Notion.

## Command

```
/notion:process-page <page-url-or-id> --transform=<type> [--parent=<id>] [--title=<text>]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | yes | — | Source Notion page URL or page ID |
| `--transform` | yes | — | Transformation type or free-form instruction |
| `--parent` | no | same as source | Parent for the output page |
| `--title` | no | auto-generated | Custom title for the output page |

## Workflow Steps

1. **Resolve Source Page ID** — Extract page ID from URL or normalize raw ID to UUID format
2. **Fetch Source Page via MCP** — Call `notion-fetch` for page properties and content blocks
3. **Serialize to Plain Text** — Apply export serialization rules to convert blocks to flat text
4. **Apply AI Transformation** — Prompt based on `--transform` value (see types below)
5. **Build Output Title** — Auto-generate from source title + transform type, or use `--title`
6. **Convert to Notion Blocks** — Parse transformed text into Notion blocks using import conversion rules
7. **Resolve Output Parent** — Use `--parent` or same parent as source page
8. **Create Output Page via MCP** — Call `notion-create-pages` with title and converted blocks
9. **Return Confirmation** — Report source page, transform applied, output URL, block count

## Transformation Types

| Keyword | Description |
|---------|-------------|
| `summarize` | Produce a concise summary of the content |
| `action-items` | Extract all action items and tasks as a checklist |
| `translate:{lang}` | Translate content to the specified language |
| `reformat:bullets` | Rewrite content as bullet points |
| `reformat:outline` | Rewrite as a hierarchical outline with headings |
| `key-points` | Extract main takeaways as a numbered list |
| Free-form text | Apply as custom transformation instruction |

## Output Page

**Title generation:**
- If `--title` is provided, use it directly
- Otherwise: `"{source title} — {Transform Type}"`

Transform type labels:
- `summarize` → `Summary`
- `action-items` → `Action Items`
- `translate:{lang}` → `Translation ({lang})`
- `reformat:bullets` → `Bullet Points`
- `reformat:outline` → `Outline`
- `key-points` → `Key Points`
- Free-form → first 30 characters of the instruction

**Parent resolution:**
- If `--parent` is provided, resolve the parent page/database ID
- Otherwise, use the same parent as the source page

## Error Handling

| Condition | Response |
|-----------|----------|
| No argument provided | `Usage: /notion:process-page <page-url-or-id> --transform=<type>` |
| Missing transform | `--transform is required. Options: summarize, action-items, translate:{lang}, reformat:bullets, reformat:outline, key-points, or custom text` |
| Invalid page URL/ID | `Invalid Notion page URL or ID: {input}` |
| Page not accessible | `Page not accessible. Ensure it's shared with the Notion integration.` |
| Empty page | `Page has no content to transform.` |
| Create failure | `Failed to create output page: {error message}` |
