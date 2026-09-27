# 03: Safe Unpublishing and Conflict Handling

**What to build:** Changing an entry to private or draft removes its previously promoted content safely, while shared assets remain intact. Unexpected manual changes in generated deploy content stop preparation instead of being overwritten.

**Blocked by:** 01: Public Snapshot Promotion; 02: Protected Prepare Publication Flow

**Status:** wontfix

Superseded: unpublishing is handled by editing or removing the copied public file in the website vault.

- [ ] Changing a promoted entry to a non-public state produces a deletion in the next promotion plan.
- [ ] The promoted-file manifest identifies which entries and assets the service owns.
- [ ] Unpublishing does not delete an asset still referenced by another promoted entry.
- [ ] Unexpected manual changes in generated deploy content cause preparation to stop.
- [ ] Conflict and deletion results appear in the preparation summary.
- [ ] No partial branch is created when conflict detection or deletion validation fails.
- [ ] Tests cover unpublishing, shared assets, stale manifest records and deploy-vault conflicts.
