#!/bin/bash

ASSET="${1}"
PNG="${2}"
FRAME=$3

npx remotion still wav2vj "${PNG}" \
  --props="{\"path\":\"${ASSET}\"}" \
  --frame $FRAME
