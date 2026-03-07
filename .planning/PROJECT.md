# Notion to TXT

## What This Is

A Claude Code workspace that connects to Notion via the official MCP integration and provides Skills (invoked via slash commands) to export Notion page content into clean plain-text .txt files on the local filesystem. Content goes through an AI-assisted cleaning step that strips Notion block formatting into flat, readable text. Documentation is generated exclusively by a dedicated docs Skill.

## Core Value

Paste a Notion page URL, get a clean .txt file — no manual copy-paste, no formatting noise, no lock-in.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Export a single Notion page to a clean .txt file via slash command
- [ ] Connect to Notion through official MCP integration
- [ ] AI-assisted transform: strip Notion block formatting into flat readable text
- [ ] Include text content (paragraphs, headings, lists, quotes)
- [ ] Include embedded media as references (links/descriptions)
- [ ] Include page properties (title, dates, tags, metadata)
- [ ] Save output to project subfolder (./exports/)
- [ ] Dedicated docs Skill generates README.md + usage guides in docs/
- [ ] Skills do the work, slash commands are shortcuts to invoke them
- [ ] URL/ID in → auto fetch + clean + save → done (no preview/confirmation step)

### Out of Scope

- Child page recursion — v1 is single pages only
- Database exports — planned for later milestone
- Image/file downloading — media referenced as links only
- Real-time sync — one-shot export, not continuous
- Preview/approval step — auto-save on invocation

## Context

- Uses Notion's official MCP server for API access
- Built as a Claude Code workspace with Skills and slash commands
- Output .txt files serve dual purpose: local archive/backup AND input to downstream pipelines
- GSD budget model profile (Haiku where possible) to control token spend
- Greenfield project — no existing code

## Constraints

- **MCP Integration**: Must use Notion's official MCP server (not custom API calls)
- **Token Budget**: GSD agents use budget profile (Haiku where possible)
- **Output Format**: Plain .txt files only — no markdown, no HTML
- **Docs Generation**: README and docs produced exclusively by docs Skill, never by other Skills

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Skills as primary mechanism, slash commands as aliases | Skills provide structured, reusable workflows; slash commands are ergonomic shortcuts | — Pending |
| No preview step before saving | Optimizes for speed; archive + pipeline use cases don't need human review | — Pending |
| Budget model profile for GSD | Controls token spend during planning/execution | — Pending |
| Docs Skill owns all documentation | Prevents scattered doc generation, single source of truth | — Pending |

---
*Last updated: 2026-03-07 after initialization*
