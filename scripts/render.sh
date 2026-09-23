#!/bin/bash

DIR="$1"
OUT="$2"
CONCURRENCY="${3:-4}"

npx remotion render audio2vj "$OUT" \
    --props="{\"path\":\"$DIR\"}" \
    --concurrency="$CONCURRENCY"