I’m building a dynamic SOW (Scope of Work) generator in Next.js/React + TypeScript + Zustand.

I have already provided you with the project files, including:

sow-print.css
useSOWStore.ts
DynamicSOWDocument.tsx
SOWPage1.tsx
SOWPage2.tsx
PreviewPanel.tsx
Global CSS
SOW types/data/utils
Main problem

Currently the document is hard-coded into Page 1 and Page 2.

I need to change this into a true dynamic A4 pagination system, similar to Google Docs/Microsoft Word.

The user can dynamically add:

Modules
Financial items
Overview bullets
Milestone stages
Terms & conditions
Long descriptions/text
Other future SOW sections

When content becomes larger than the available A4 page height, the content must automatically continue onto the next page.

For example:

Page 1
  Header
  Client
  Overview
  Modules 1–5

Page 2
  Modules 6–10
  Financial items 1–4

Page 3
  Financial items 5–10
  AMC
  Payment milestones

Page 4
  Terms
  Signatures


If the user deletes content, the pages should automatically reflow:

Page 1
  More content fits

Page 2
  Remaining content

Important requirements

Do NOT hard-code Page 1/Page 2 anymore.

The number of pages must be completely dynamic:

1 page
2 pages
3 pages
10+ pages
depending on content.

Keep the existing Zustand document structure and dynamic forms working.

Do NOT paginate using character counts or arbitrary estimates.

Pagination should be based on actual rendered DOM height wherever practical.

A4 must remain exactly:

width: 210mm;
height: 297mm;


Respect the existing page margins/padding.

Content must NEVER be silently clipped.

A module/table row should preferably stay together. Do not split a single module row across pages.

Tables need proper pagination:

Table header should repeat when a table continues on another page.
Rows should move to the next page when they don't fit.
Do not split individual rows.

Sections should preferably stay together when they fit, but large sections must be allowed to continue across pages.

Headers and footers must be handled correctly.

Page numbers must be dynamic:

Page 1 of 4
Page 2 of 4
Page 3 of 4
Page 4 of 4


Never hard-code 1 of 2 or 2 of 2.

The screen preview should visually show the generated A4 pages.

zoomLevel in PreviewPanel must continue working.

Print / Save PDF must produce the same logical pagination as the preview as closely as possible.

Do not break the existing styling/design.

Preserve the professional A4 document appearance.

Architecture I want

Prefer an architecture similar to:

SOWDocument
     ↓
Document blocks/sections
     ↓
Measure actual rendered content
     ↓
Pagination engine
     ↓
Dynamic A4 pages


Conceptually:

const pages = paginateSOW(document);


Then:

{pages.map((page, index) => (
  <SOWPage
    key={index}
    pageNumber={index + 1}
    totalPages={pages.length}
  >
    ...
  </SOWPage>
))}

Very important

Do not just give me theoretical advice.

Inspect the existing code and implement the solution in the project.

Reuse existing components and styles where possible.

If the current DynamicSOWDocument, SOWPage1, and SOWPage2 architecture needs to be replaced, do it cleanly.

You may create supporting components/hooks/utilities such as:

SOWPage.tsx
SOWPagination.tsx
useSOWPagination.ts
pagination utilities
measurement components


Use the approach that is most reliable for a React browser-based editor.

Edge cases to handle

Test these scenarios:

Very few modules → 1 page if they fit.
Add many modules → automatically create more pages.
Very long module description → correct wrapping and pagination.
Add many financial items → financial table continues onto subsequent pages.
Remove a financial item → content reflows backward.
Add many terms → terms continue onto new pages.
Long overview → should not be clipped.
Signatures should remain together when possible.
Adding/removing content should automatically recalculate pagination.
Page count should update automatically.
Printing should not produce blank pages.
No content should disappear because of overflow: hidden.
CSS concern

The current CSS contains things like:

.sow-page-content {
  overflow: hidden;
}

.sow-page {
  overflow: hidden;
}


These are likely causing content clipping.

Review and change them where necessary.

Also review the current:

break-inside: avoid;
page-break-inside: avoid;


rules and only use them where appropriate.

Final requirement

After implementation, explain briefly:

What files you changed.
How pagination works.
How actual height is measured.
How table rows are handled.
How printing works.
How dynamic page numbers are generated.

Most importantly, actually implement the working solution rather than stopping at an explanation.