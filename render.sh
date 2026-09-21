#!/bin/bash

ASSET="${1}"
VIDEO="${2}"

npx remotion render wav2vj "${VIDEO}" \
  --props="{\"path\":\"${ASSET}\"}"