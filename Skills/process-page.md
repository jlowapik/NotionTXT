# Skill: Process Notion Page

Fetch a Notion page, apply an AI transformation, and save the result as a new Notion page.

## Parameters

- `page` (required) — source Notion page URL or page ID
- `transform` (required) — transformation type or free-form instruction
- `parent` (optional) — parent page/database URL/ID for the output page (default: same as source)
- `title` (optional) — custom title for the output page (default: auto-generated)

## Execution Steps

### 1. Resolve Source Page ID

If `page` is a URL, extract the page ID:
- Notion URLs contain the page ID as the last 32-character hex segment (with or without hyphens)
- Pattern: take the last path segment, strip the title prefix before the final 32 hex chars, insert hyphens to form UUID format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

If `page` is already an ID (32 hex chars, with or without hyphens), normalize to hyphenated UUID format.

This is the same resolution logic used in `Skills/export-page.md` step 1.

### 2. Fetch Source Page via MCP

Call `notion-fetch` with the page URL or ID to retrieve the page content.

The response includes:
- **Page properties**: title, status, dates, tags, and other metadata
- **Page blocks**: the content blocks that make up the page body

If the page has no content blocks, stop and report: `Page has no content to transform.`

### 3. Serialize to Plain Text

Apply the same serialization rules as `Skills/export-page.md` step 3:

| Block type | Serialization |
|------------|---------------|
| `heading_1` | `{TEXT}` (UPPERCASE, blank line before and after) |
| `heading_2` | `{Text}` (Title Case, blank line before and after) |
| `heading_3` | `{Text}` (as-is, blank line before and after) |
| `paragraph` | `{text}` (blank line between paragraphs) |
| `bulleted_list_item` | `- {text}` |
| `numbered_list_item` | `{n}. {text}` |
| `to_do` (unchecked) | `- {text}` |
| `to_do` (checked) | `- {text} (done)` |
| `quote` | `"{text}"` |
| `code` | `{text}` (plain text, no fences) |
| `divider` | (blank line) |
| `image` | `[Image: {caption}] ({url})` |
| `file` | `[File: {name}] ({url})` |
| `video` | `[Video: {caption}] ({url})` |
| `child_page` | `[Child page: {title}]` |
| Any other | `[Unsupported: {block_type}]` |

Strip all rich text formatting (bold, italic, strikethrough, underline). Keep link text with URLs as `{text} ({url})`.

### 4. Apply AI Transformation

Based on the `--transform` value, apply the appropriate transformation to the serialized text:

| Keyword | Instruction to follow |
|---------|----------------------|
| `summarize` | Produce a concise summary of the content. Keep the key information, remove details. Output as plain paragraphs. |
| `action-items` | Extract all action items, tasks, and to-dos from the content. Output as a bulleted checklist with `- ` prefix. |
| `translate:{lang}` | Translate the entire content to the specified language. Preserve the structure (headings, lists, paragraphs). |
| `reformat:bullets` | Rewrite the content as bullet points. Each key idea becomes a bullet. |
| `reformat:outline` | Rewrite as a hierarchical outline. Use UPPERCASE headings for major sections, Title Case for subsections, and bullet points for details. |
| `key-points` | Extract the main takeaways and key points. Output as a numbered list. |
| Free-form text | Apply the provided text as a custom transformation instruction. |

The transformation operates on the plain text content only. Produce clean plain text output following the same formatting conventions (headings, lists, paragraphs).

### 5. Build Output Title

If `--title` is provided, use it directly.

Otherwise, auto-generate: `"{source page title} — {Transform Type}"`

Transform type labels:
- `summarize` → `Summary`
- `action-items` → `Action Items`
- `translate:{lang}` → `Translation ({lang})`
- `reformat:bullets` → `Bullet Points`
- `reformat:outline` → `Outline`
- `key-points` → `Key Points`
- Free-form → first 30 characters of the instruction

### 6. Convert to Notion Blocks

Parse the transformed text and convert to Notion blocks using the same rules as `Skills/import-page.md` step 4:

| Text pattern | Notion block |
|--------------|--------------|
| UPPERCASE line (blank lines around) | `heading_1` |
| Title Case line (blank lines around) | `heading_2` |
| `- {text} (done)` | `to_do` (checked: true) |
| `- {text}` | `bulleted_list_item` |
| `{n}. {text}` | `numbered_list_item` |
| `"{text}"` | `quote` |
| Other text | `paragraph` |

### 7. Resolve Output Parent

If `--parent` is provided, resolve the parent page/database ID (same logic as step 1).

If `--parent` is not provided, use the same parent as the source page. Fetch the source page's parent information from the MCP response.

### 8. Create Output Page via MCP

Call `notion-create-pages` with:
- **Parent**: the resolved parent page or database ID
- **Title**: from step 5
- **Children**: the converted Notion blocks from step 6

### 9. Return Confirmation

Report to the user:
- Source page title and URL
- Transformation applied
- Output page URL (from MCP response)
- Output page title
- Number of blocks created
