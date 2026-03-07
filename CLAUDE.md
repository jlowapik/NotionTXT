# Notion to TXT — Claude Code Workspace

## Project

Export Notion pages to clean plain-text .txt files via Skills and slash commands, using Notion's official MCP integration. AI cleans Notion block formatting into flat readable text.

**Core workflow:** Paste Notion page URL → auto fetch via MCP → strip formatting → save .txt to `./exports/`

## Architecture

- **Skills** do the work (export, transform, docs generation)
- **Slash commands** are shortcuts that invoke Skills
- **Notion MCP** server provides API access (no custom HTTP calls)
- **Docs Skill** is the only source for README.md and docs/ content

## Constraints

- Output format: plain .txt only
- v1 scope: single pages (no database export, no child page recursion)
- Media: referenced as links/descriptions, not downloaded
- GSD uses budget model profile (Haiku agents)

## Planning

Full project planning lives in `.planning/` — see PROJECT.md, REQUIREMENTS.md, ROADMAP.md.
