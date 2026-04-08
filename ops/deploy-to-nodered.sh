#!/usr/bin/env bash
set -euo pipefail

SETTINGS_FILE="/root/.node-red/settings.js"
FLOWS_FILE="/root/.node-red/flows.json"
FLOWS_SOURCE="/home/STONfiHackathon/ops/nodered/flows.json"

cp "$FLOWS_SOURCE" "$FLOWS_FILE"

systemctl restart nodered.service

if systemctl list-unit-files | grep -q '^ton-compass\.service'; then
  systemctl disable --now ton-compass.service || true
fi

echo "Node-RED deployment applied."
