#!/bin/sh
# Fails when the head commit moves the content/blog submodule pointer relative to the point it branched from.
# Usage: check-blog-pointer.sh <base-sha> <head-sha>
set -eu

base=$(git merge-base "$1" "$2")
before=$(git rev-parse "${base}:content/blog")
after=$(git rev-parse "${2}:content/blog")

if [ "${before}" != "${after}" ]; then
  echo "::error::This change moves content/blog from ${before} to ${after}." >&2
  echo "Only the 'Update blog content' workflow may move the blog-posts pointer. Restore it with: git checkout ${base} -- content/blog" >&2
  exit 1
fi

echo "content/blog is unchanged at ${after}"
