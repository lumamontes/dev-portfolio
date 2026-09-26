# 04: Review and Production Deployment

**What to build:** From the protected publishing page, the editor can approve and merge the prepared branch and deliberately trigger a Cloudflare Pages production deployment without logging into GitHub.

**Blocked by:** 02: Protected Prepare Publication Flow; 03: Safe Unpublishing and Conflict Handling

**Status:** ready-for-agent

- [ ] GitHub access uses a narrowly scoped GitHub App installed only for the authoring and deploy repositories.
- [ ] The protected interface can approve or merge the prepared publishing branch after review.
- [ ] Production deployment is refused unless the approved content is merged into the production branch.
- [ ] The deploy action triggers the configured Cloudflare Pages deploy hook.
- [ ] Cloudflare Pages builds the merged production branch.
- [ ] Ordinary pushes and pull requests do not create automatic previews or production deployments.
- [ ] GitHub and Cloudflare calls are covered by contract-shaped fakes without real credentials.
- [ ] Production trigger failures are visible and actionable in the protected interface.
