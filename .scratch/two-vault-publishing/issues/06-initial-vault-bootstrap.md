# 06: Initial Vault Bootstrap and Operational Setup

**What to build:** The current public content is preserved as the initial deploy snapshot, the separate private authoring vault is initialized, and Cloudflare/GitHub permissions and secrets are configured with a documented rollback path.

**Blocked by:** 01: Public Snapshot Promotion; 04: Review and Production Deployment

**Status:** wontfix

Superseded: only the local draft vault and the Git-synced website vault are required.

- [ ] The existing public deploy-vault content and Git history remain available after bootstrap.
- [ ] The private authoring vault is initialized as a separate repository.
- [ ] The current public content is identified as the initial deploy snapshot.
- [ ] The GitHub App is installed with only the required repository permissions.
- [ ] Secret path, Basic Auth password, session configuration, GitHub App credentials and Cloudflare deploy hook are configured as encrypted server-side variables.
- [ ] Automatic preview deployments are disabled.
- [ ] A rollback path is documented for failed preparation and failed production deployment.
- [ ] The complete workflow is manually verified from Obsidian through Cloudflare production.
