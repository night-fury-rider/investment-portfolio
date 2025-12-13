#!/bin/bash

# --- Configuration ---
BUILD_DIR="build"
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
ZIP_FILE_NAME="dist-$TIMESTAMP.zip"

# 1. Determine the absolute project root path (Self-correcting logic)
SCRIPT_PATH=$(dirname "$0")
PROJECT_ROOT=$(cd "$SCRIPT_PATH" && pwd)
PROJECT_ROOT="${PROJECT_ROOT%/scripts}"  # Strip the '/scripts' part

BUILD_PATH="$PROJECT_ROOT/$BUILD_DIR"
ZIP_OUTPUT_NAME="$ZIP_FILE_NAME" # Will be created in the current working directory (BUILD_PATH)

# --- Validation ---
if [ ! -d "$BUILD_PATH" ]; then
    echo "========================================================="
    echo "  ❌ ERROR: Next.js build failed to find directory: $BUILD_PATH"
    echo "========================================================="
    exit 1
fi
echo "✅ Build directory found at: $BUILD_PATH"

# --- Zipping & Cleanup Process ---

echo "--- Preparing and cleaning up archives inside $BUILD_DIR/ ---"

# **1. Move into the BUILD_DIR to perform cleanup and zipping**
cd "$BUILD_PATH" || { echo "Failed to change directory to $BUILD_PATH"; exit 1; }

# **2. Zipping: Archive the current directory's CONTENTS**
echo "--- Starting Zipping process: Archiving contents of $BUILD_DIR/ into $ZIP_OUTPUT_NAME ---"

# Archive the contents of the current directory (.)
# The -x flags now apply directly to files/folders inside 'build'
zip -r "$ZIP_OUTPUT_NAME" . \
    -x "*.DS_Store" \
    -x "__MACOSX/*" \
    -x "*.git*" \
    -x "node_modules/*" \
    -x "$ZIP_OUTPUT_NAME" # EXCLUDE the zip file itself if it already exists (safety)

# 3. Move back to the project root
cd "$PROJECT_ROOT"

echo "--- Build package successfully created: $ZIP_OUTPUT_NAME in $BUILD_DIR/ ---"