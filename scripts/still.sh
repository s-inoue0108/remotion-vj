#!/bin/bash

DIR="$1"
OUT="$2"
FRAME="${3:-0}"
CONCURRENCY="${4:-4}"

npx remotion still audio2vj "$OUT" \
    --props="{\"path\":\"$DIR\"}" \
    --frame="$FRAME" \
    --concurrency="$CONCURRENCY"