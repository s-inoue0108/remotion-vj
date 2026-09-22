#!/bin/bash

THEME="${1}"
DIR="${2}"
OUT="${3}"

npx remotion render "${THEME}" "${OUT}" \
  --props="{\"path\":\"${DIR}\"}"