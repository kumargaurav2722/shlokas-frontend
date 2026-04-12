# Changelog

All notable changes to this repository will be published through GitHub
Releases and summarized here.

This project uses:

- pull request labels to group release notes
- `.github/release.yml` to control release-note categories
- `.github/workflows/release.yml` to publish releases from tags

## Unreleased

- Ongoing development on `main`

## Release Process

1. Merge pull requests into `main`
2. Apply useful labels to pull requests before merge when possible
3. Create and push a semantic version tag such as `v1.0.0`
4. GitHub Actions creates a release with automatically generated notes
5. Use the GitHub release page as the canonical per-release changelog

## Notes

- Pull requests labeled `ignore-for-release` are excluded from generated notes
- Dependency updates, docs, fixes, and features are grouped by labels
- Pre-release tags such as `v1.0.0-beta.1` are published as prereleases
