# Phase 2b — Import Pipeline

## Goal

Implement an Import Skill that takes a local `.txt` file (in the export format) and creates or updates a Notion page via MCP write tools. This completes the round-trip: export to .txt, edit locally, import back to Notion.

## Deliverables

- **Import Skill** (`Skills/import-page.md`) — reads .txt file, parses header/body, converts to Notion blocks, calls MCP to create or update a page
- **Slash command** (`.claude/skills/notion:import-page/SKILL.md`) — thin wrapper invoking the Import Skill
- **MCP permissions** — `notion-create-pages` and `notion-update-page` added to `.claude/settings.local.json`

## Skill Inputs

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `file` | yes | — | Path to local .txt file |
| `parent` | yes (create) | — | Notion parent page or database URL/ID |
| `page` | no | — | Existing page URL/ID to update |
| `mode` | no | `create` | `create` or `update` (auto-set to `update` if `--page` provided) |

## Skill Workflow

1. **Read file** — read .txt at provided path
2. **Parse header** — split at `---` separator, extract Title, URL, Tags, Status, Priority, dates
3. **Parse body** — text below first separator; detect media section if second `---` + `Media:` line
4. **Convert text to Notion blocks** — reverse of export serialization (see Text-to-Blocks table)
5. **Resolve operation** — create vs update based on `--page`/`--mode`
6. **Call MCP** — `notion-create-pages` (create) or `notion-update-page` (update)
7. **Return confirmation** — operation type, page URL, title, block count, skipped content

## Text-to-Blocks Conversion Rules

| Text pattern | Notion block |
|--------------|--------------|
| UPPERCASE line (blank lines around) | `heading_1` |
| Title Case line (blank lines around) | `heading_2` |
| `- {text} (done)` | `to_do` (checked) |
| `- {text}` | `bulleted_list_item` |
| `{n}. {text}` | `numbered_list_item` |
| `"{text}"` | `quote` |
| `[Image/File/Video: ...]` | `paragraph` (reference text) |
| `[Child page: ...]` / `[Unsupported: ...]` | Skip |
| Other text | `paragraph` |

## Error Handling

| Error case | Detection | User message |
|------------|-----------|--------------|
| No argument | `$ARGUMENTS` is empty | `Usage: /notion:import-page <file-path> --parent=<page-or-db-id>` |
| File not found | File does not exist at path | `File not found: {path}` |
| Invalid format | No `---` separator in file | `Invalid file format: expected header section with --- separator` |
| No parent (create) | `--parent` missing and mode is create | `--parent is required when creating a new page` |
| MCP failure | MCP call returns error | `Notion API error: {error message}` |
| Page not accessible | Update target not found | `Page not accessible. Ensure it's shared with the Notion integration.` |

## Success Criteria

1. Import Skill reads a .txt file and creates a new Notion page via MCP
2. Import Skill can update an existing Notion page via MCP
3. Header properties (title, tags) are mapped to Notion page properties
4. Body text is converted to appropriate Notion block types
5. Round-trip test: export a page, import it back, content matches
6. Error messages are actionable for all failure modes
