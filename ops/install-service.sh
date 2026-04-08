#!/usr/bin/env bash
set -euo pipefail

cp /home/STONfiHackathon/ops/ton-compass.service /etc/systemd/system/ton-compass.service
systemctl daemon-reload
systemctl enable --now ton-compass.service

cp /home/STONfiHackathon/ops/deploy-nginx.conf /etc/nginx/sites-available/default
nginx -t
systemctl reload nginx

echo "TON Compass service and nginx proxy are installed."
