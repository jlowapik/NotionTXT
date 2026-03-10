# Phase 3b — AI Transformation Pipeline

## Goal

Implement a Process Skill that fetches a Notion page, applies an AI transformation (summarize, extract action items, translate, reformat), and writes the result as a new Notion page. This enables AI-powered content processing without leaving the Notion ecosystem.

## Deliverables

- **Process Skill** (`Skills/process-page.md`) — fetches page, applies AI transform, creates output page
- **Slash command** (`.claude/skills/notion:process-page/SKILL.md`) — thin wrapper invoking the Process Skill

## Skill Inputs

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page` | yes | — | Source Notion page URL or page ID |
| `transform` | yes | — | Transformation type or free-form instruction |
| `parent` | no | same as source | Parent for the output page |
| `title` | no | auto-generated | Custom title for the output page |

## Skill Workflow

1. **Resolve source page ID** — extract page ID from URL or normalize raw ID
2. **Fetch source page via MCP** — call `notion-fetch` for page properties + blocks
3. **Serialize to plain text** — apply the same serialization rules as the export pipeline
4. **Apply AI transformation** — prompt based on `--transform` value (see Transformation Types)
5. **Build output title** — `"{source title} — {Transform Type}"` unless `--title` given
6. **Convert to Notion blocks** — parse transformed text into Notion blocks (reuse import conversion rules)
7. **Resolve output parent** — use `--parent` or same parent as source page
8. **Create output page via MCP** — call `notion-create-pages` with title + blocks
9. **Return confirmation** — source page, transform applied, output page URL, block count

## Transformation Types

| Keyword | Instruction |
|---------|-------------|
| `summarize` | Produce a concise summary of the page content |
| `action-items` | Extract all action items and tasks as a checklist |
| `translate:{lang}` | Translate the content to the specified language |
| `reformat:bullets` | Rewrite the content as bullet points |
| `reformat:outline` | Rewrite as a hierarchical outline with headings and sub-points |
| `key-points` | Extract the main takeaways and key points |
| Free-form text | Apply the text as a custom transformation instruction |

## Output Page Format

The output page is created with:
- **Title**: `"{Source Title} — {Transform}"` (e.g., "Quarterly Sales Planning — Summary") or custom `--title`
- **Body**: the AI-transformed content, converted to Notion blocks
- **Parent**: same parent as source page, or `--parent` override

## Error Handling

| Error case | Detection | User message |
|------------|-----------|--------------|
| No argument | `$ARGUMENTS` is empty | `Usage: /notion:process-page <page-url-or-id> --transform=<type>` |
| Missing transform | `--transform` not provided | `--transform is required. Options: summarize, action-items, translate:{lang}, reformat:bullets, reformat:outline, key-points, or custom text` |
| Invalid page | Not a Notion URL or 32-char hex ID | `Invalid Notion page URL or ID: {input}` |
| Page not accessible | MCP returns error or empty | `Page not accessible. Ensure it's shared with the Notion integration.` |
| Empty page | Properties exist but no content blocks | `Page has no content to transform.` |
| Create failure | MCP create call fails | `Failed to create output page: {error message}` |

## Success Criteria

1. Process Skill fetches a Notion page and applies an AI transformation
2. Transformed content is written as a new Notion page via MCP
3. All predefined transformation types produce appropriate output
4. Free-form custom transformations are supported
5. Output page title is auto-generated or custom
6. Source page is not modified
7. Error messages are actionable for all failure modes
