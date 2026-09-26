# 02: Protected Prepare Publication Flow

**What to build:** Visiting the secret publishing URL, authenticating with HTTP Basic Auth, and selecting “Prepare publication” creates or updates a deploy-vault publishing branch and displays added, changed and rejected content.

**Blocked by:** 01: Public Snapshot Promotion

**Status:** ready-for-agent

- [ ] The publishing control plane is available through a configurable secret path.
- [ ] Requests without the secret path or valid HTTP Basic Auth are rejected.
- [ ] Successful authentication creates a short-lived secure session.
- [ ] The prepare action reads the authoring repository through the server-side GitHub integration.
- [ ] Preparation creates or updates the deploy-vault publishing branch using the promotion plan.
- [ ] The protected page shows affected entries and added, changed and rejected files without exposing private source content.
- [ ] Authentication, session and prepare failures return actionable messages without leaking secrets.
