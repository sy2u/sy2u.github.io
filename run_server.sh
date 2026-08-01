#!/usr/bin/env bash
set -euo pipefail

gem_bin="$(ruby -e 'print Gem.user_dir')/bin"
export PATH="${gem_bin}:${PATH}"

exec bundle _2.7.2_ exec jekyll serve "$@"
