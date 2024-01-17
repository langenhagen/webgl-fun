#!/bin/bash
# Build the `index.html` to contain the current directory listings file using the open source tool
# `tree`.
#
# Exectue the script manually or
# install the script as a pre-commit hook via e.g.:
#
#   ln build-index.sh .git/hooks/pre-commit
#
# author: andreasl
cd "$(git rev-parse --show-toplevel)" || exit 1

tree \
    -H '.' \
    -L 1 \
    --noreport \
    --dirsfirst \
    -T 'WebGL Fun' \
    --charset utf-8 \
    -I 'build-index.sh' \
    -I 'glsl/' \
    -I 'index.html' \
    -I 'js' \
    -I 'res' \
    -o 'index.html'

git add 'index.html'
