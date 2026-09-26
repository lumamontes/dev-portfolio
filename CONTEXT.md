# Context

## Identity

Luma's website presents one person with connected interests: software engineering, writing, music, culture, technology, memory and intersectionality. Professional and creative work are different facets of the same identity, not separate personas.

## Editorial archive

The **archive** is the public collection of things Luma chooses to share. It can contain writing, learning notes, book entries, zine entries, projects, photos and photo albums in one discoverable space.

An **entry** is the neutral structural term for an item in the archive. Visitors should see the natural term for each entry, such as project, text, book, zine or learning note.

**Writing** is the main editorial area for long and short texts, including technical writing, personal writing, cultural writing, reflections and unfinished-form experiments that Luma chooses to publish.

A **zine entry** documents a zine with its title, cover, context and related links. The complete zine may be read on an external publication such as Biblioteca de Zines.

A **photo entry** documents one photograph or a photo album. It can include images, captions, dates, place and context without requiring every image to become a separate archive entry. `photo` is the canonical type for both forms.

A **music entry** documents a musical listening experience, artist, album, music blog post or listening log. Live listening data is optional and must respect Luma's privacy.

A **playlist entry** documents a named playlist as a lightweight link preview (name, cover, destination link), with an optional short note or observation. It is not a music entry: a playlist is a pointer to a collection hosted elsewhere, not authored listening writing.
_Avoid_: treating a playlist as a music entry.

A **book entry** documents a book Luma wants to recommend or remember. It needs only the book's identity and can include a cover and a short personal impression. Reading-tracker metadata is optional and a separate reading-note entity is not required.

**Experience** is Luma's professional history (employment and volunteer roles: organization, dates, title, scope, responsibilities). It is not an archive entry type and never contains projects or repository links — a role that also produced a notable open-source project is represented as a separate `project` entry in the archive, referenced from the experience if useful, not folded into it.
_Avoid_: filing an open-source or personal project under Experience/Work.

## Editorial state

An entry has an **editorial state** describing where it is in Luma's process, such as idea, draft, pitch, submitted, editing, published here or published elsewhere.

**Visibility** is separate from editorial state. A private entry can exist in any working state and must not appear on the public website. An externally published entry may be visible in the archive while linking to its original publication.

## Languages

English and Brazilian Portuguese carry the same content: every public entry exists in both languages. Either language can be the original — the other is a translation or adaptation, not a guarantee of word-for-word equivalence. In flat collections, the second version is stored as `<slug>-en.md` / `<slug>-br.md` and routes under the original's slug, so switching language keeps the reader on the same entry.

## Discovery

An entry may have one primary **category** and optional **tags**. The initial categories are Technology and Zines. New categories should emerge from actual recurring content instead of being invented in advance.

## Publishing tools

The **authoring vault** is a private Obsidian vault synchronized with Git. It holds drafts, private notes and source assets. The **deploy vault** is this repository, `portfolio-deploy`: it contains the Astro application and only the public content promoted from the authoring vault. Promotion copies entries whose visibility is `public` and editorial state is `published-here`; it also removes entries that were unpublished. The deploy vault is not a second editorial source.

Promotion and production deployment are separate deliberate actions. A protected Cloudflare publishing page prepares a reviewed Git branch from the authoring vault, and a second action triggers the Cloudflare Pages build. The normal authoring flow does not require opening GitHub or using a terminal. See `docs/adr/0003-remove-wordpress.md` and `docs/adr/0004-two-vault-publishing.md`.
