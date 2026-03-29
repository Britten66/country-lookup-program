#!/bin/bash

echo ""
echo "=========================================="
echo "  Git History Cleaner"
echo "=========================================="
echo ""
echo "1) Fix git config (name/email) going forward"
echo "2) Squash all history into one clean commit (recommended)"
echo "3) Both"
echo ""
read -p "Choose an option [1-3]: " choice

read -p "Enter your name [Chris Britten]: " git_name
git_name=${git_name:-"Chris Britten"}

read -p "Enter your email: " git_email

if [[ "$choice" == "1" || "$choice" == "3" ]]; then
  echo ""
  echo "→ Setting global git config..."
  git config --global user.name "$git_name"
  git config --global user.email "$git_email"
  echo "✓ Done"
fi

if [[ "$choice" == "2" || "$choice" == "3" ]]; then
  echo ""
  read -p "Enter commit message [Initial commit]: " commit_msg
  commit_msg=${commit_msg:-"Initial commit"}

  echo ""
  echo "⚠ This will DELETE all commit history and force push."
  read -p "Are you sure? (yes to confirm): " confirm

  if [[ "$confirm" == "yes" ]]; then
    echo ""
    echo "→ Creating clean orphan branch..."
    git checkout --orphan clean-main

    echo "→ Staging all files..."
    git add -A

    echo "→ Committing..."
    git -c user.name="$git_name" -c user.email="$git_email" commit -m "$commit_msg"

    echo "→ Replacing main branch..."
    git branch -D main
    git branch -m main

    echo "→ Force pushing..."
    git push --force origin main

    echo ""
    echo "✓ Done. History is clean."
  else
    echo "Aborted."
  fi
fi
