# 05: Obsidian Publishing Entry Point

**What to build:** A button or command inside the authoring vault opens the protected publishing flow, so normal publishing can be completed without GitHub or terminal access.

**Blocked by:** 02: Protected Prepare Publication Flow; 04: Review and Production Deployment

**Status:** ready-for-agent

- [ ] The authoring vault contains a documented publishing entry point that opens the protected publishing URL.
- [ ] The entry point works from Obsidian on supported authoring devices.
- [ ] The workflow explains when to pull and push with Obsidian Git.
- [ ] The workflow directs the editor through prepare, review/merge and deploy in the correct order.
- [ ] The documentation makes clear that the deploy vault is a generated public snapshot, not an editorial workspace.
- [ ] The entry point does not store GitHub App credentials or Cloudflare secrets in Obsidian notes.
