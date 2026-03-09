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

## Phase 2 — Export Pipeline Proof

**Date verified:** 2026-03-09

**Deliverables:**
```
Skills/export-page.md
src/slugify.js
.gitignore
```

**Input test:**
```
Notion URL: https://www.notion.so/31e174e5ef2a8028b25fe26a47ed0009
Command:    Export Skill with page URL parameter
Result:     File exported successfully
```

**Export result:** `exports/quarterly-sales-planning.txt`
```
Title: Quarterly sales planning
URL: https://www.notion.so/31e174e5ef2a8028b25fe26a47ed0009
Last edited: 2026-03-09
Tags: Account Management
Status: Not started
Priority: Medium
Start date: 2025-03-24
End date: 2025-03-28

---

About project

Provide an overview of the project's goals and context

Action items

- to do do do
```

**Serialization rules:**
```
Headings  → plain text (h1 UPPERCASE, h2 Title Case, h3 as-is)
To-dos    → - text / - text (done)
Quotes    → "text"
Code      → plain text, no fences
Dividers  → blank line
Media     → [Type: caption] (url)
```

**Slugify verified:**
```
Quarterly sales planning → quarterly-sales-planning.txt
Collision detection works (-2, -3)
Output directory override (--out) works
```

**Overwrite behavior:** Re-export overwrites existing file ✅

## Planning

Full project planning lives in `.planning/` — see PROJECT.md, REQUIREMENTS.md, ROADMAP.md.
