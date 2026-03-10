# Phase 4 — Documentation Skill

## Goal

Implement a Docs Skill that generates all project documentation automatically. Documentation must never be written manually — the Docs Skill is the single source for `README.md` and `docs/`. It reads project structure and regenerates docs on demand, preventing drift between code and documentation.

## Deliverables

- **Docs Skill** (`Skills/docs-generate.md`) — reads project artifacts, generates all documentation
- **Slash command** (`.claude/skills/docs:generate/SKILL.md`) — thin wrapper invoking the Docs Skill
- **Generated docs** — `README.md` + `docs/` reference pages

## Generated Outputs

| File | Content |
|------|---------|
| `README.md` | Project overview, architecture, quick start, command usage |
| `docs/export-page.md` | Export workflow, pipeline steps, serialization rules, output format |
| `docs/commands.md` | Slash commands reference with parameters, behavior, error handling |
| `docs/setup.md` | Claude Code workspace setup, Notion MCP connection, permissions |

## Command Interface

```
/docs:generate [--scope=all|readme|docs]
```

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--scope` | no | `all` | What to generate: `all`, `readme`, or `docs` |

## Skill Workflow

1. **Scan repository** — read `.planning/`, `Skills/`, `.claude/skills/`, `spec/`, `src/`
2. **Extract info** — skills, commands, architecture, serialization rules
3. **Generate README.md** — overview, setup, quick start, troubleshooting
4. **Generate docs/** — reference pages from skill definitions and spec
5. **Write files** — overwrite existing docs to keep them synchronized
6. **Return** confirmation with list of generated files

## Success Criteria

1. `/docs:generate` slash command is invocable in Claude Code
2. Docs Skill reads project structure and extracts current state
3. `README.md` is generated automatically
4. Documentation files are generated in `docs/`
5. Generated docs accurately describe skills, commands, and setup
6. Existing docs are overwritten when regenerated
7. No manual documentation edits are required
