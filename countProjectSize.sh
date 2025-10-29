#!/bin/bash

# Директорії, які треба перевірити
DIRS=("app" "src" "tests/end-to-end")

for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "=== $dir ==="
    # wc: -l = рядки, -w = слова, -m = символи
    find "$dir" -type f -exec wc -lwm {} + | tail -n 1
  else
    echo "Директорії $dir не існує"
  fi
done