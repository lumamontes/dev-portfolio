Status: wontfix

This spec is superseded by the simpler two-local-vault decision in
`docs/adr/0004-two-vault-publishing.md`. No separate private Git repository,
promotion service or publishing control plane will be implemented.

# Two-Vault Publishing and Cloudflare Deployment

## Problem Statement

Luma wants to write and edit the archive in Obsidian across multiple devices,
including private drafts, source material and unpublished assets. The website
must not expose that entire working vault, and normal publishing should not
require opening GitHub, using a terminal, or treating Obsidian Git as a build
system.

The current repository already contains the Astro application and the public
Markdown collections used by the site. It is therefore the deploy vault, but
it is not a safe place for private editorial work. There is currently no
promotion boundary between private authoring content and public deployable
content, no protected publishing interface, and no deliberate production
deployment flow.

## Solution

Use two private Git repositories with separate responsibilities:

- The **authoring vault** is a private Obsidian vault synchronized with Git.
  It contains drafts, private entries, source material and unpublished assets.
- The **deploy vault** is the existing portfolio repository. It contains the
  Astro application and only the public content snapshot promoted from the
  authoring vault.

Use a Cloudflare-hosted publishing control plane behind a secret URL and HTTP
Basic Auth. From an Obsidian button or the protected page, Luma can prepare a
publication. The control plane validates the authoring vault, selects only
entries marked `visibility: public` and
`editorialState: published-here`, handles deletions for entries that are no
longer eligible, and creates or updates a publishing branch in the deploy
vault.

After reviewing the preparation summary, Luma can approve/merge the
publishing branch through the same protected interface and trigger production
deployment. Cloudflare Pages builds the merged `main` branch. Ordinary pushes
do not create previews or production deployments.

## User Stories

1. As an editor, I want a private Obsidian authoring vault, so that I can keep drafts and personal notes away from the public website.
2. As an editor, I want the authoring vault synchronized through Obsidian Git, so that I can write from more than one device.
3. As an editor, I want the authoring vault and deploy vault to be separate repositories, so that private material cannot enter the public build merely because it exists in my working vault.
4. As an editor, I want the existing portfolio repository to remain the deploy vault, so that the current Astro application and public URL history are preserved.
5. As an editor, I want to write entries in the existing Markdown collections, so that the publishing workflow preserves the current archive model.
6. As an editor, I want to mark an entry as public using `visibility: public`, so that public intent is explicit.
7. As an editor, I want to mark an entry as published here using `editorialState: published-here`, so that a draft or externally published entry cannot be promoted accidentally.
8. As an editor, I want private entries to remain in the authoring vault without being copied to the deploy vault, so that unfinished work stays private.
9. As an editor, I want invalid frontmatter to block preparation, so that a malformed entry cannot create a broken public build.
10. As an editor, I want to trigger preparation from a protected web page, so that I do not need to open GitHub or use a terminal.
11. As an editor, I want an Obsidian button to open the protected publishing page, so that publishing fits naturally into my writing workflow.
12. As an editor, I want the publishing page protected by a secret URL and HTTP Basic Auth, so that casual visitors cannot access editorial controls.
13. As an editor, I want the authentication session to expire after a short period, so that leaving the publishing page open does not create a permanent publishing session.
14. As an editor, I want the publishing control plane to use server-side credentials, so that GitHub App credentials and deployment secrets never reach the browser.
15. As an editor, I want preparation to validate the authoring vault before changing the deploy vault, so that a failed publication produces no partial public snapshot.
16. As an editor, I want preparation to create or update a publishing branch, so that public changes can be reviewed before they reach production.
17. As an editor, I want the preparation result to list added, changed and removed files and affected entries, so that I can catch an accidental bulk change.
18. As an editor, I want unpublishing an entry to remove its promoted content from the deploy snapshot, so that changing an entry back to private actually removes it from the website.
19. As an editor, I want promoted assets tracked separately from arbitrary deploy-vault assets, so that unpublishing does not delete an image still used by another public entry.
20. As an editor, I want preparation to stop if the deploy vault has unexpected manual changes, so that generated public state is not overwritten silently.
21. As an editor, I want to approve and merge a prepared publishing branch through the protected interface, so that I do not need GitHub login for routine publishing.
22. As an editor, I want production deployment to be a separate deliberate action from preparation, so that I can review the public snapshot before it goes live.
23. As an editor, I want production deployment to trigger Cloudflare Pages, so that Cloudflare performs the Astro build in its normal deployment environment.
24. As an editor, I want ordinary authoring-vault pushes not to create site previews, so that sync activity does not create unnecessary builds or confusing preview URLs.
25. As an editor, I want ordinary deploy-vault pushes not to deploy automatically, so that production changes happen only through the deliberate deployment action.
26. As an editor, I want the production branch to be `main`, so that Cloudflare Pages has one clear public source.
27. As an editor, I want the workflow to preserve Git history in the deploy vault, so that each public snapshot remains auditable and reversible.
28. As an editor, I want the initial public content to remain available during migration to the two-vault model, so that introducing the authoring vault does not cause a content outage.
29. As an editor, I want a GitHub App with narrowly scoped repository permissions, so that the publishing service cannot access more GitHub data than necessary.
30. As an editor, I want secrets such as the Basic Auth password, secret path, GitHub App credentials and Cloudflare deploy hook stored as encrypted server-side variables, so that they are not committed to either vault.
31. As a visitor, I want the public website to be built only from the deploy vault, so that private authoring material cannot be fetched at request time.
32. As a visitor, I want the existing archive behavior and canonical URLs to remain unchanged, so that publishing infrastructure does not alter the visitor-facing content model.
33. As a maintainer, I want the promotion logic to be independent from Astro page rendering, so that the publishing boundary can be tested without browser or build tests.
34. As a maintainer, I want Cloudflare control-plane failures to report actionable errors, so that a failed preparation or deployment can be corrected without guessing.
35. As an editor, I want to rotate the secret URL and password without changing the vaults, so that access can be revoked without an editorial migration.

## Implementation Decisions

- The existing portfolio repository remains `portfolio-deploy`, the deploy
  vault. It contains Astro source, public Markdown collections and public
  assets. It is not an editorial workspace.
- A separate private repository, provisionally named `personal-vault`, is the
  authoring vault. Obsidian Git synchronizes it across devices. The repository
  may contain any private Markdown or source material, but only recognized
  public archive entries and their required assets are eligible for promotion.
- Promotion eligibility requires both `visibility: public` and
  `editorialState: published-here`. The existing canonical content model
  remains the validation authority; the promotion service must not invent a
  second schema with different publication semantics.
- The promotion boundary is a pure planner/service seam. It receives the
  validated authoring snapshot and the known promoted state in the deploy
  vault, then returns either validation errors or a complete change plan of
  additions, updates and deletions. A plan is all-or-nothing.
- The change plan includes a manifest of promoted files and assets. The
  manifest allows unpublishing to remove only files previously promoted by the
  service, never arbitrary files in the deploy vault.
- The service creates or updates one publishing branch in the deploy vault.
  It must refuse to overwrite unexpected manual changes in generated content
  rather than silently resolving them.
- A preparation summary is the public interface of the plan: it reports
  affected entries and added, changed and removed files without exposing
  private source material that was rejected from promotion.
- The publishing control plane runs as Cloudflare server-side code, separate
  from the static Astro output. It exposes protected prepare, approval/merge
  and deployment operations, but it does not render private vault content as a
  public page.
- The publishing page is reached through a configurable secret path and uses
  HTTP Basic Auth. Successful authentication creates a short-lived, secure,
  HTTP-only session. The secret path and password are rotated through
  server-side environment configuration.
- GitHub access uses a GitHub App installed only on the authoring and deploy
  repositories, with the minimum contents, pull-request and workflow
  permissions required. The browser never receives GitHub credentials and
  routine publishing does not require GitHub login.
- The control plane reads the authoring repository through the GitHub App,
  validates and promotes eligible content into the deploy repository, and
  uses Git history to preserve the publishing audit trail.
- Cloudflare Pages builds only the deploy vault's merged `main` branch. The
  production action triggers a protected Cloudflare Pages deploy hook after
  the publishing branch has been reviewed and merged.
- Automatic preview deployments are disabled for authoring pushes, deploy-vault
  branch pushes and ordinary pull requests. Preview behavior is not part of
  the publishing contract.
- The publishing flow has two primary editor intents: prepare publication and
  deploy production. Approval/merge is an intermediate step in the deploy
  flow, required before production can be triggered.
- The initial migration preserves the current deploy-vault Git history and
  public content. It does not rewrite the repository or require moving the
  existing public files through a new history.
- WordPress is not part of the new workflow. Existing external provenance links
  remain ordinary content links and do not create a runtime dependency.

## Testing Decisions

- The primary test seam is the promotion planner/service: a complete source
  snapshot plus deploy manifest should produce a deterministic plan or
  actionable validation errors. Tests assert external behavior such as which
  entries and assets are copied or removed, not internal helper structure.
- The planner tests cover public/published entries, private entries, drafts,
  externally published entries, invalid frontmatter, translated entries,
  updated entries, newly added entries, unpublished entries, shared assets and
  unexpected deploy-vault changes.
- The planner must be tested as an all-or-nothing operation: any invalid
  eligible entry prevents a partial plan from being created.
- The HTTP control-plane seam is tested for authentication behavior: secret
  path rejection, Basic Auth rejection, successful short-lived session
  creation, session expiry and authorization of prepare, approval and deploy
  actions.
- GitHub and Cloudflare integrations are tested through contract-shaped fakes
  at the service boundary. Tests verify that the expected branch, commit,
  merge and deploy-hook operations are requested without making real remote
  changes.
- The existing Vitest suite is the prior art for pure content-model and
  service-boundary tests. The promotion planner should follow that style and
  avoid requiring a running Astro server, GitHub account or Cloudflare project
  in unit tests.
- A build-level acceptance check remains required after a prepared snapshot is
  merged: the deploy vault must pass the existing Astro build and must not
  produce routes for rejected private content.
- Manual acceptance checks cover the Obsidian button, password-protected page,
  preparation summary, approval/merge flow, production trigger, disabled
  automatic previews and unpublishing behavior.

## Out of Scope

- Building a full CMS or browser-based Markdown editor.
- Replacing Obsidian with another authoring application.
- Treating Obsidian Git as a deployment or build service.
- Automatically deploying every authoring-vault push.
- Automatically creating previews for every push or pull request.
- Requiring routine GitHub login or terminal commands from the editor.
- Building Astro inside a Cloudflare Worker.
- Deploying to Netlify in this implementation; Cloudflare is the selected
  deployment platform.
- Copying private notes, drafts, arbitrary vault files or unrecognized assets
  into the deploy vault.
- Supporting arbitrary Obsidian wiki-link rendering in the public website.
- Reintroducing WordPress, a WordPress API dependency or a hosted CMS.
- Changing the archive information architecture, entry schemas or visitor
  routes except where required to make promoted content build correctly.
- Rewriting the deploy repository's existing Git history.
- Solving source control conflicts between two devices beyond reporting them
  and requiring the editor to resolve them before preparation.
- Adding a public admin route or exposing publishing status without
  authentication.

## Further Notes

- The deploy vault is a generated public snapshot, not a second source of
  truth. Editorial changes belong in the authoring vault.
- The current static Astro build already passes its focused tests and builds
  successfully. The new work is the promotion/control-plane boundary around
  that build, not a rewrite of the site renderer.
- The GitHub App, Cloudflare server-side environment variables and deploy hook
  require one-time human setup. They must be documented separately from the
  runtime code and never committed to either repository.
- The issue is ready for agent implementation once the two private repositories
  and the Cloudflare project credentials are available.
