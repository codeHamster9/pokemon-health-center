# Virtualization for Active Check-ins

## User Review Required
> [!NOTE]
> This changes the rendering strategy from a simple `.map` to a calculated Virtual Window. I will assume window-based scrolling is preferred over a fixed-height container since it's the main page content.

## Proposed Changes

### Frontend
#### [MODIFY] [ActiveCheckins.tsx](file:///home/idan/workspaces/gemini/guardio/frontend/src/pages/pokemon/ActiveCheckins.tsx)
- Import `useWindowVirtualizer` from `@tanstack/react-virtual`.
- Add window resize listener to calculate `columns` (1, 2, or 3) matching Tailwind (`md: 2, lg: 3`).
- Create `virtualizer` instance:
    - `count`: `Math.ceil(checkins.length / columns)`
    - `estimateSize`: ~300px (card height)
    - `overscan`: 5
- Render:
    - Main div `relative` with height `virtualizer.getTotalSize()`.
    - Map `virtualizer.getVirtualItems()` to rows.
    - Inside each row, slice `checkins` array to get the 1-3 items for that row.
    - Render them in a `grid` or `flex` row.

## Verification Plan
- Verify page renders correctly on all screen sizes (resize window).
- Verify "Load More" still works and appends data.
- Verify scrolling implies no blank spaces (virtualization working).
