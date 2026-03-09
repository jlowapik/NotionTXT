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

## Phase 1 — MCP Verification Proof

**Date verified:** 2026-03-09

**/mcp:** Notion connected
```
Server:  claude_ai_NotionMCP (cloud-hosted, Notion official MCP integration)
Tools:   notion-fetch, notion-search, notion-create-pages, notion-update-page, ...
Allowed: mcp__claude_ai_NotionMCP__notion-fetch
```
Three successful MCP calls confirmed connectivity (fetch page, fetch database, search database).

**Page read test:** "Quarterly sales planning" ✅
```
Properties: { Status: "Not started", Priority: "Medium", Team: ["Account Management"],
              Start: "2025-03-24", End: "2025-03-28" }
Blocks:     ### About project — "Provide an overview of the project's goals and context"
            ### Action items — [ ] to do do do
```

**Database read test:** "Projects" ✅
```
Schema:  Project name (title), Status (status), Priority (select), Assignee (person),
         Team (multi_select), Start date (date), End date (date), Attach file (file)
Views:   "By Status" (board), "All Projects" (table), "Gantt" (timeline)
Rows:    5 returned via notion-search
         - "Quarterly sales planning"
         - "Public launch of iOS app"
         - "Revamp new hire onboarding"
```

**Notes:** Page/DB must be shared with the Notion integration.

## Planning

Full project planning lives in `.planning/` — see PROJECT.md, REQUIREMENTS.md, ROADMAP.md.
