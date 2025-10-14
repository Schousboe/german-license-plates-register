#!/usr/bin/env bash
set -e

TAG_NAME=${1:-${GITHUB_REF#refs/tags/}}
LAST_TAG=$(git describe --tags --abbrev=0 --exclude=$TAG_NAME 2>/dev/null || echo "")
DATE=$(date +'%Y-%m-%d')

echo "Generating release notes for ${TAG_NAME}"
echo "Last tag: ${LAST_TAG}"

# Get commits since last tag
if [ -n "$LAST_TAG" ]; then
  COMMITS=$(git log $LAST_TAG..HEAD --pretty=format:"%s")
else
  COMMITS=$(git log --pretty=format:"%s")
fi

COMMITS=$(echo "$COMMITS" | sed 's/\[changelog update\]//g' | sed 's/\s\+$//')

# Categorize commits by prefix
FEATURES=$(echo "$COMMITS" | grep -E '^feat:' | sed 's/^feat: //') || true
FIXES=$(echo "$COMMITS" | grep -E '^fix:' | sed 's/^fix: //') || true
CHORES=$(echo "$COMMITS" | grep -E '^chore:' | sed 's/^chore: //') || true
REFACTORS=$(echo "$COMMITS" | grep -E '^refactor:' | sed 's/^refactor: //') || true
DOCS=$(echo "$COMMITS" | grep -E '^docs:' | sed 's/^docs: //') || true
TESTS=$(echo "$COMMITS" | grep -E '^test:' | sed 's/^test: //') || true
CI=$(echo "$COMMITS" | grep -E '^ci:' | sed 's/^ci: //') || true

# --- Build release markdown ---
BODY="![Release](https://img.shields.io/badge/${TAG_NAME}-blue.svg)"
BODY+=" [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)\n\n"
BODY+="**Release date:** ${DATE}\n\n---\n\n# What's changed?\n\n"

add_section() {
  local TITLE=$1
  local CONTENT=$2
  if [ -n "$CONTENT" ]; then
    BODY+="### ${TITLE}\n"
    while IFS= read -r line; do
      BODY+="- ${line}\n"
    done <<< "$CONTENT"
    BODY+="\n"
  fi
}

add_section "Features" "$FEATURES"
add_section "Fixes" "$FIXES"
add_section "Chores" "$CHORES"
add_section "Refactors" "$REFACTORS"
add_section "Documentation" "$DOCS"
add_section "Tests" "$TESTS"
add_section "CI" "$CI"

BODY+="---\n\n# File Changes\n\n"

# File diff
ADDED=$(git diff --name-only --diff-filter=A HEAD^ HEAD || true)
CHANGED=$(git diff --name-only --diff-filter=M HEAD^ HEAD || true)
DELETED=$(git diff --name-only --diff-filter=D HEAD^ HEAD || true)

add_file_section() {
  local TITLE=$1
  local FILES=$2
  if [ -n "$FILES" ]; then
    BODY+="## ${TITLE}\n"
    while IFS= read -r line; do
      BODY+="- ${line}\n"
    done <<< "$FILES"
    BODY+="\n"
  fi
}

add_file_section "Added" "$ADDED"
add_file_section "Changed" "$CHANGED"
add_file_section "Deleted" "$DELETED"

echo -e "$BODY" > RELEASE_BODY.md
echo "✅ RELEASE_BODY.md generated"
