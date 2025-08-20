#!/bin/bash

# Verificar se o diretório de saída foi fornecido como argumento
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <output_directory> <number_of_files>"
    exit 1
fi

# Diretório de saída fornecido como argumento
OUTPUT_DIR="$1"
echo "Output directory: $OUTPUT_DIR"

# Número de arquivos a serem gerados fornecido como argumento
NUM_FILES="$2"
echo "Number of files: $NUM_FILES"

# # Criar o diretório de saída se não existir
# mkdir -p "$OUTPUT_DIR"

# Gerar arquivos para os N dias anteriores à data atual
for ((i=1; i<=NUM_FILES; i++)); do
    DATE=$(date +%Y%m%d -d "$i days ago")
    FILENAME="db_${DATE}.sql"
    touch "$OUTPUT_DIR/$FILENAME"
    echo "Generated $FILENAME"
done

echo "Backup files generation completed."