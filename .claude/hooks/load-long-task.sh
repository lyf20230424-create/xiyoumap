#!/usr/bin/env bash
# SessionStart hook: 每次会话启动（startup | resume | compact | clear）时加载任务看板状态
# 让 agent 即使在上下文被压缩/清空后也能知道当前主任务。

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

BOARD="$PROJECT_ROOT/board.md"
TASKS="$PROJECT_ROOT/tasks.md"
PROGRESS="$PROJECT_ROOT/progress.md"

echo "=========================================="
echo "📋 长任务状态（自动加载）"
echo "=========================================="

if [ -f "$BOARD" ]; then
  echo ""
  echo "【当前焦点】"
  grep -A 3 '## 当前焦点' "$BOARD" | head -5
  echo ""
  echo "【待办】"
  sed -n '/## 看板/,/## 已完成/p' "$BOARD" | head -20
else
  echo "（无 board.md）"
fi

echo ""
echo "=========================================="
echo "📂 任务详情：tasks.md / progress.md"
echo "=========================================="
