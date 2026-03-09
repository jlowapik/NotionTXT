# Requirements: Notion to TXT

**Defined:** 2026-03-07
**Core Value:** Paste a Notion page URL, get a clean .txt file — no manual copy-paste, no formatting noise, no lock-in.

## Global Constraints

- **16-hour hard stop** — total project time budget. Track cumulative time per phase.
- **Phase 1 is setup/verification only** — no custom code required.
- **Zero comments in source code** — not even one line. README + docs Skill output are the only allowed explanation.
- **Spec before code** — each phase's first commit is its spec. Code commits follow.
- **Bonus phase specs are separate commits** — visible in git history as distinct entries.

## v1 Requirements

### MCP Integration

- [x] **MCP-01**: User can connect to Notion via official MCP server
- [x] **MCP-02**: User can fetch page content by Notion URL or page ID
- [x] **MCP-03**: User can read page properties (title, dates, tags, metadata)
- [x] **MCP-04**: User can read block content (text, headings, lists, quotes, media references)
- [x] **MCP-05**: User can read database content

### Export

- [x] **EXPT-01**: Content is stripped of Notion block formatting into flat readable plain text
- [x] **EXPT-02**: Output is saved as .txt file to default ./exports/ directory with configurable output path
- [x] **EXPT-03**: Output file is auto-named from page title (slugified)
- [x] **EXPT-04**: Page properties are included as header section in .txt output

### Skills & Commands

- [x] **SKLL-01**: Export Skill executes full fetch + clean + save workflow
- [x] **SKLL-02**: Slash command alias invokes export Skill
- [ ] **SKLL-03**: Docs Skill generates README.md and usage guides in docs/
- [ ] **SKLL-04**: Slash command alias invokes docs Skill

### Documentation

- [ ] **DOCS-01**: README.md with project overview, setup instructions, and quick start
- [ ] **DOCS-02**: Per-Skill usage guides in docs/ folder
- [ ] **DOCS-03**: All documentation generated exclusively by docs Skill

### GSD & Token Economy

- [ ] **GSD-01**: GSD installed via npx get-shit-done-cc
- [ ] **GSD-02**: Eco/budget profile set via /gsd:settings
- [ ] **GSD-03**: /cost run before each phase to track token spend
- [ ] **GSD-04**: GSD config documented in CLAUDE.md

### Process Gates

- [ ] **PROC-01**: Each phase's first commit is its spec (spec before code)
- [ ] **PROC-02**: Checkpoint — spec shared for review before Phase 1 execution
- [ ] **PROC-03**: Bonus phase specs are separate commits visible in git history

## v2 Requirements

### Database Export

- **DBEX-01**: User can export full database as multiple .txt files
- **DBEX-02**: User can filter database rows before export
- **DBEX-03**: User can export database to CSV

### Export Enhancements

- **EXPT-05**: Custom output filename override
- **EXPT-06**: Re-export with overwrite detection
- **EXPT-07**: List recent exports

### Child Pages

- **CHLD-01**: Recursive export of nested child pages

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time sync | One-shot export, not continuous sync |
| Image/file downloading | Media referenced as links only |
| Preview/approval step | Auto-save on invocation for speed |
| OAuth/auth management | MCP handles Notion auth |
| Mobile app | CLI workspace only |
| Code comments | Zero-comment policy — docs Skill handles explanation |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| GSD-01 | Phase 0 | Done |
| GSD-02 | Phase 0 | Done |
| GSD-03 | Phase 0 | Done |
| GSD-04 | Phase 0 | Done |
| PROC-01 | Phase 0 | Done |
| PROC-02 | Phase 0 | Done |
| PROC-03 | Phase 0 | Done |
| MCP-01 | Phase 1 | Done |
| MCP-02 | Phase 1 | Done |
| MCP-03 | Phase 1 | Done |
| MCP-04 | Phase 1 | Done |
| MCP-05 | Phase 1 | Done |
| EXPT-01 | Phase 2 | Done |
| EXPT-02 | Phase 2 | Done |
| EXPT-03 | Phase 2 | Done |
| EXPT-04 | Phase 2 | Done |
| SKLL-01 | Phase 2 | Done |
| SKLL-02 | Phase 3 | Done |
| SKLL-03 | Phase 4 | Pending |
| SKLL-04 | Phase 4 | Pending |
| DOCS-01 | Phase 4 | Pending |
| DOCS-02 | Phase 4 | Pending |
| DOCS-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0

**Phase Distribution:**
- Phase 0: 7 requirements (GSD setup + process gates + scaffolding)
- Phase 1: 5 requirements (MCP connection verification including database)
- Phase 2: 5 requirements (Export Skill core)
- Phase 3: 1 requirement (Export command interface)
- Phase 4: 5 requirements (Docs Skill + documentation)

---
*Requirements defined: 2026-03-07*
*Last updated: 2026-03-09 — Phase 3 complete*
