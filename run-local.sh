#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"

if ! [[ "$PORT" =~ ^[0-9]+$ ]] || (( PORT < 1 || PORT > 65535 )); then
  echo "Uso: $0 [puerto válido entre 1 y 65535]" >&2
  exit 2
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "Se requiere Python 3 para iniciar la vista local." >&2
  echo "En MX Linux puedes instalarlo con: sudo apt install python3" >&2
  exit 1
fi

for file in index.html styles.css script.js config.js assets/sji-logo.jpeg assets/favicon.png assets/favicon.ico assets/apple-touch-icon.png; do
  if [[ ! -f "$file" ]]; then
    echo "No se encontró $file. Ejecuta este comando desde la carpeta del proyecto." >&2
    exit 1
  fi
done

if command -v curl >/dev/null 2>&1 && curl -fsS "http://127.0.0.1:${PORT}/" >/dev/null 2>&1; then
  echo "El puerto ${PORT} ya está en uso. Prueba: $0 $((PORT + 1))" >&2
  exit 1
fi

printf 'SJI disponible localmente en http://127.0.0.1:%s/\n' "$PORT"
printf 'Para detener el servidor, presiona Ctrl+C.\n'
exec python3 -m http.server "$PORT" --bind 127.0.0.1
