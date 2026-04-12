# Security Policy

## Supported Versions

This repository currently supports the latest `main` branch only.

## Reporting a Vulnerability

Please do not open a public GitHub issue for a security vulnerability.

If GitHub Security Advisories are enabled for this repository, use a private
security advisory. Otherwise, contact the maintainers privately before
disclosing any issue publicly.

When reporting, include:

- A clear summary of the issue
- Steps to reproduce
- Impact assessment
- Screenshots or logs if relevant
- Whether the issue exposes secrets, user data, or admin actions

## Scope

This frontend repository should never contain:

- Production secrets
- Backend private keys
- Database credentials
- Proprietary prompts or admin-only internal tooling
- Private datasets or unpublished content files

## Safe Open-Source Guidance

Open sourcing this frontend under the MIT license allows others to reuse the
code. That is good for adoption, but it does not prevent people from reusing
implementation ideas.

If you want to protect VedVani strategically:

- Keep the backend, ingestion pipelines, and private datasets in a separate private repository
- Keep API keys and admin credentials out of the frontend and out of git
- Treat brand protection separately from code licensing by registering and enforcing the `VedVani` name and logo as trademarks if needed
- Remove any unpublished content, premium logic, or internal-only product strategy before publishing
- Rotate any key that was ever committed, even temporarily
