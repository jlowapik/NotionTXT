# Skill: Import Text to Notion Page

Import a local `.txt` file (in the export format) to Notion as a new or updated page.

## Parameters

- `file` (required) — path to .txt file
- `parent` (required for create) — Notion parent page or database URL/ID
- `page` (optional) — existing Notion page URL/ID to update
- `mode` (optional) — `create` or `update` (default: `create`; auto-set to `update` if `--page` provided)

## Execution Steps

### 1. Read File

Read the .txt file at the provided path. The file must exist and contain text content.

### 2. Parse Header

Split the file content at the first `---` separator line.

The header section (above `---`) contains key-value pairs:
- `Title: {title}` — page title (required)
- `URL: {url}` — original Notion URL (informational, not used for import)
- `Last edited: {date}` — original edit date (informational)
- `Tags: {comma-separated values}` — mapped to multi_select property if present
- `Status: {value}` — mapped to status property if present
- `Priority: {value}` — mapped to select property if present
- `Start date: {date}` — mapped to date property if present
- `End date: {date}` — mapped to date property if present

Extract the `Title` value — this becomes the Notion page title. Other properties are mapped to page properties when creating/updating.

### 3. Parse Body

The body is everything below the first `---` separator.

If a second `---` separator exists followed by a `Media:` line, treat everything below that second separator as the media section. Media references are informational and included as paragraph blocks.

### 4. Convert Text to Notion Blocks

Parse each line of the body text and convert to the appropriate Notion block type. This reverses the export serialization rules.

| Text pattern | Notion block |
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

Detection rules for heading inference:
- **UPPERCASE heading**: line is all uppercase letters/spaces/punctuation, at least 2 characters, surrounded by blank lines (or at start/end of body)
- **Title Case heading**: each word starts with an uppercase letter (articles/prepositions excepted), surrounded by blank lines (or at start/end of body), and not matching any other pattern (not a list item, quote, or media reference)

### 5. Resolve Operation

Determine whether to create or update:
- If `--page` is provided: set mode to `update`, use the provided page ID
- If `--mode=update` without `--page`: error (page ID required for update)
- Otherwise: mode is `create`, requires `--parent`

For create mode, resolve the parent:
- If parent is a URL, extract the page/database ID (same logic as export page ID resolution)
- If parent is a raw ID, normalize to hyphenated UUID format

### 6. Call MCP

**Create mode:**
Call `notion-create-pages` with:
- Parent: the resolved parent page or database ID
- Title: from the parsed header
- Properties: mapped from header (tags, status, priority, dates) where applicable
- Children: the converted Notion blocks from step 4

**Update mode:**
Call `notion-update-page` with:
- Page ID: the resolved page ID from `--page`
- Properties: updated from header values
- Note: block content updates replace existing blocks

### 7. Return Confirmation

Report to the user:
- Operation performed (created or updated)
- Notion page URL (from MCP response)
- Page title
- Number of blocks created
- Any skipped content (child pages, unsupported blocks)
