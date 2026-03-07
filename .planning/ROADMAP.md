# Roadmap: Notion to TXT

## Overview

This roadmap delivers a Claude Code workspace that exports Notion pages to clean plain-text files through slash commands. The journey starts with project specification and GSD setup (spec-first + time tracking gates), verifies MCP connection to Notion with no custom code, builds the core export Skill that fetches and cleans Notion content, adds slash command interfaces, and implements documentation generation through a dedicated Skill.

## Phases

**Phase Numbering:**
- Integer phases (0, 1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 0: Spec + Project Setup** - Specification with Mermaid diagram, GSD installation, planning files, directory scaffolding
- [ ] **Phase 1: Notion MCP Connection** - MCP verification only, no custom code
- [ ] **Phase 2: Export Pipeline** - Export Skill with fetch + clean + save workflow
- [ ] **Phase 3: Commands** - Slash command interface for export invocation
- [ ] **Phase 4: Docs** - Documentation generation Skill and command alias

## Phase Details

### Phase 0: Spec + Project Setup
**Goal**: Project is specified, GSD configured, and planning artifacts exist with spec-first + time tracking gates enforced
**Depends on**: Nothing (first phase)
**Requirements**: GSD-01, GSD-02, GSD-03, GSD-04, PROC-01, PROC-02, PROC-03
**Success Criteria** (what must be TRUE):
  1. GSD is installed and eco/budget profile is chosen and documented
  2. .planning/PROJECT.md exists (required by GSD)
  3. CLAUDE.md exists with project context and token economy rules
  4. Mermaid diagram is included in specification
  5. First commit is the spec (plus minimal planning files)
  6. Directory scaffolding exists (exports/, docs/, Skills/)
  7. Each phase's first commit will be its spec (spec before code rule documented)
  8. User can track cumulative time per phase via /cost command
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 1: Notion MCP Connection
**Goal**: Notion MCP server is connected and verified to work — strictly setup/verification, no custom code
**Depends on**: Phase 0
**Requirements**: MCP-01, MCP-02, MCP-03, MCP-04, MCP-05
**Success Criteria** (what must be TRUE):
  1. /mcp command confirms Notion server is connected
  2. User can read one Notion page via MCP (verify page fetch)
  3. User can read one Notion database via MCP (verify database access)
  4. Page properties and block content are accessible through MCP
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 2: Export Pipeline
**Goal**: Users can export a single Notion page to a clean .txt file via Skill invocation
**Depends on**: Phase 1
**Requirements**: EXPT-01, EXPT-02, EXPT-03, EXPT-04, SKLL-01
**Success Criteria** (what must be TRUE):
  1. Export Skill executes full fetch + clean + save workflow
  2. Page properties (title, dates, tags, metadata) appear in .txt header
  3. Block content (text, headings, lists, quotes) is stripped of Notion formatting into flat readable text
  4. Media references appear as links/descriptions in output
  5. Output is saved to default ./exports/ directory with configurable output path override
  6. Output file is auto-named from page title (slugified)
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 3: Commands
**Goal**: Users can export Notion pages via slash command shortcuts
**Depends on**: Phase 2
**Requirements**: SKLL-02
**Success Criteria** (what must be TRUE):
  1. Slash command invokes export Skill
  2. Command accepts Notion URL or page ID as parameter
  3. Command accepts optional output path parameter
**Plans**: TBD

Plans:
- [ ] TBD

### Phase 4: Docs
**Goal**: Documentation is generated exclusively by docs Skill, covering setup, usage, and Skills reference
**Depends on**: Phase 2
**Requirements**: SKLL-03, SKLL-04, DOCS-01, DOCS-02, DOCS-03
**Success Criteria** (what must be TRUE):
  1. Docs Skill generates README.md with project overview, setup instructions, and quick start
  2. Docs Skill generates per-Skill usage guides in docs/ folder
  3. User can invoke docs Skill via slash command alias
  4. All documentation is produced by docs Skill (no manual doc creation)
  5. "Docs generated only by docs skill" rule is enforced and documented
**Plans**: TBD

Plans:
- [ ] TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 0 → 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 0. Spec + Project Setup | 0/TBD | Not started | - |
| 1. Notion MCP Connection | 0/TBD | Not started | - |
| 2. Export Pipeline | 0/TBD | Not started | - |
| 3. Commands | 0/TBD | Not started | - |
| 4. Docs | 0/TBD | Not started | - |
