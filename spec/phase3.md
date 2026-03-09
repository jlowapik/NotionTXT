# Phase 3 — Slash Command + Hardening

## Goal

Wrap the Export Skill in a `/notion:export-page` slash command so users invoke it as a Claude Code command, with error handling for bad inputs.

## Deliverables

- **Slash command** (`.claude/skills/notion:export-page/SKILL.md`) — invocable via `/notion:export-page`
- **Error handling** — actionable messages for missing args, invalid IDs, inaccessible pages

## Command Interface

```
/notion:export-page <page-url-or-id> [--out=path] [--mode=overwrite|append]
```

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `page-url-or-id` | yes | — | Notion page URL or 32-char hex page ID |
| `--out` | no | `./exports/` | Output directory override |
| `--mode` | no | `overwrite` | `overwrite` or `append` |

## Error Handling

| Error case | Detection | User message |
|------------|-----------|--------------|
| No argument | `$ARGUMENTS` is empty | `Usage: /notion:export-page <page-url-or-id>` |
| Invalid URL/ID | Not a Notion URL or 32-char hex ID | `Invalid Notion page URL or ID: {input}` |
| Page not found | MCP returns error or empty | `Page not accessible. Ensure it's shared with the Notion integration.` |
| Empty page | Properties exist but no content blocks | Export header only, warn: `Note: page has no content blocks` |
| Unsupported blocks | Unrecognized block type | `[Unsupported: block_type]` in output (existing behavior) |

## Workflow

1. Parse `$ARGUMENTS` for page URL/ID, `--out`, `--mode` flags
2. Validate input (error on missing/invalid)
3. Delegate to Export Skill (`Skills/export-page.md`) for the full pipeline
4. Return confirmation with file path, title, URL, last edited

## Success Criteria

1. `/notion:export-page` slash command is invocable in Claude Code
2. Command accepts Notion URL or page ID as parameter
3. Command accepts optional `--out` and `--mode` flags
4. Command produces identical output to direct Skill invocation
5. Missing/invalid input shows actionable error message
6. Inaccessible page shows actionable error message
