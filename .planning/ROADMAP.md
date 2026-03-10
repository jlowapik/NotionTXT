# Roadmap: Notion to TXT

## Overview

This roadmap delivers a Claude Code workspace that exports Notion pages to clean plain-text files through slash commands. The journey starts with project specification and GSD setup (spec-first + time tracking gates), verifies MCP connection to Notion with no custom code, builds the core export Skill that fetches and cleans Notion content, adds slash command interfaces, and implements documentation generation through a dedicated Skill.

## Phases

**Phase Numbering:**
- Integer phases (0, 1, 2, 3, 4): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 0: Spec + Project Setup** - Specification with Mermaid diagram, GSD installation, planning files, directory scaffolding
- [x] **Phase 1: Notion MCP Connection** - MCP verification only, no custom code
- [x] **Phase 2: Export Pipeline** - Export Skill with fetch + clean + save workflow
- [x] **Phase 2b: Import Pipeline** - Import Skill with read + parse + convert + create/update workflow
- [x] **Phase 3: Commands** - Slash command interface for export invocation
- [x] **Phase 3b: AI Transformation Pipeline** - Process Skill with fetch + transform + create workflow
- [x] **Phase 4: Docs** - Documentation generation Skill and command alias

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

### Phase 2b: Import Pipeline
**Goal**: Users can import a local .txt file back to Notion as a new or updated page via Skill invocation
**Depends on**: Phase 2
**Requirements**: IMPT-01, IMPT-02, IMPT-03, IMPT-04, IMPT-05, SKLL-05, SKLL-06
**Success Criteria** (what must be TRUE):
  1. Import Skill reads a .txt file and creates a new Notion page via MCP
  2. Import Skill can update an existing Notion page via MCP
  3. Header properties are mapped to Notion page properties
  4. Body text is converted to appropriate Notion block types
  5. File format validation rejects files without header/separator
  6. Slash command invokes import Skill
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

### Phase 3b: AI Transformation Pipeline
**Goal**: Users can fetch a Notion page, apply an AI transformation, and save the result as a new Notion page
**Depends on**: Phase 2, Phase 2b
**Requirements**: XFRM-01, XFRM-02, XFRM-03, XFRM-04, XFRM-05, SKLL-07, SKLL-08
**Success Criteria** (what must be TRUE):
  1. Process Skill fetches a Notion page and applies an AI transformation
  2. Transformed content is written as a new Notion page via MCP
  3. Predefined transformation types produce appropriate output
  4. Free-form custom transformations are supported
  5. Source page is not modified
  6. Slash command invokes process Skill
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
Phases execute in numeric order: 0 → 1 → 2 → 2b → 3 → 3b → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 0. Spec + Project Setup | Done | Complete | 2026-03-07 |
| 1. Notion MCP Connection | Done | Complete | 2026-03-09 |
| 2. Export Pipeline | Done | Complete | 2026-03-09 |
| 2b. Import Pipeline | Done | Complete | 2026-03-10 |
| 3. Commands | Done | Complete | 2026-03-09 |
| 3b. AI Transformation Pipeline | Done | Complete | 2026-03-10 |
| 4. Docs | Done | Complete | 2026-03-10 |
