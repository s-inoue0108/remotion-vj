#!/bin/bash

THEME="${1}"
DIR="${2}"
OUT="${3}"
FRAME=$4

npx remotion still "${THEME}" "${OUT}" \
  --props="{\"path\":\"${DIR}\"}" \
  --frame $FRAME
