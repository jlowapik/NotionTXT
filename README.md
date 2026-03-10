# Notion to TXT

Paste a Notion page URL, get a clean .txt file — no manual copy-paste, no formatting noise, no lock-in.

## What It Does

Exports Notion pages to clean plain-text `.txt` files using Notion's official MCP integration. Claude Code fetches the page content, strips all Notion block formatting into flat readable text, and saves the result to your local filesystem.

## Quick Start

1. Open this workspace in Claude Code
2. Ensure Notion MCP is connected (`/mcp` shows Notion server)
3. Share your Notion page with the integration
4. Run: `/notion:export-page <page-url>`
5. Find your export in `./exports/`

## Architecture

- **Skills** do the work (export pipeline, docs generation)
- **Slash commands** are shortcuts that invoke Skills
- **Notion MCP** server provides API access (no custom HTTP calls)
- **Docs Skill** is the single source for README.md and docs/ content

## Commands

### /notion:export-page

Export a single Notion page to a clean `.txt` file.

```
/notion:export-page <page-url-or-id> [--out=path] [--mode=overwrite|append]
```

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| Page URL or ID | yes | — | Notion page URL or 32-char hex page ID |
| `--out` | no | `./exports/` | Output directory |
| `--mode` | no | `overwrite` | `overwrite` or `append` |

Example:
```
/notion:export-page https://www.notion.so/My-Page-abc123def456
```

### /docs:generate

Generate all project documentation from source artifacts.

```
/docs:generate [--scope=all|readme|docs]
```

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--scope` | no | `all` | What to generate: `all`, `readme`, or `docs` |

Example:
```
/docs:generate --scope=readme
```

## Output Format

Exported `.txt` files follow this structure:

```
Title: {page title}
URL: {notion page URL}
Last edited: {date}
Tags: {comma-separated values}

---

{plain text body}
```

Content is serialized as flat, human-readable text: headings become plain text (h1 UPPERCASE, h2 Title Case, h3 as-is), lists use `- ` prefixes, quotes use `"text"`, and media appears as `[Type: caption] (url)` references.

## Setup

This is a Claude Code workspace. You need:

1. **Claude Code** CLI installed
2. **Notion MCP** connected (automatic via Claude Code's cloud integration)
3. **Pages shared** with the Notion integration

See [docs/setup.md](docs/setup.md) for detailed setup instructions.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Page not accessible" | Share the page with the Notion integration in Notion's Share menu |
| "Invalid Notion page URL or ID" | Ensure the URL contains `notion.so` with a 32-char hex segment, or pass a raw 32-char hex ID |
| Empty export (header only) | The page has no content blocks — this is expected for blank pages |
| `/mcp` doesn't show Notion | Reconnect the Notion MCP server in Claude Code |

## Project Structure

```
CLAUDE.md                                  # Workspace context and phase proofs
Skills/
  export-page.md                           # Export pipeline logic
  docs-generate.md                         # Documentation generation logic
.claude/skills/
  notion:export-page/SKILL.md              # Export slash command wrapper
  docs:generate/SKILL.md                   # Docs slash command wrapper
src/
  slugify.js                               # Title-to-filename utility
exports/                                   # Default export output (gitignored)
docs/                                      # Generated reference documentation
spec/                                      # Phase specifications
.planning/                                 # Project planning files
```

## Documentation

Full reference docs in `docs/`:

- [Export Page Workflow](docs/export-page.md)
- [Commands Reference](docs/commands.md)
- [Setup Guide](docs/setup.md)
