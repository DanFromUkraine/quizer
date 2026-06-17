## 1. Goal
Make the play-page FSD migration buildable and remove stale-hook risks without changing the Tailwind class update in `src/views/play/ui/CardsList/IsCorrectCard.tsx`.

## 2. Approach
First make the staged commit atomic by staging the new `src/views/play/**` files and `src/views/play/ui/PlayPage.tsx` import rewrite together with the old `src/components/play_page/**` deletions. Then fix only the hook dependency arrays in `src/views/play/model/CardsList/hooks.ts`, because those are the Medium-risk behavior issues introduced by extracting logic into shared FSD model hooks.

## 3. File Changes
- **Modify** `src/views/play/model/CardsList/hooks.ts:25-186` — add missing `cardId`, setter, and `isCompleted` dependencies to memoized atom creation and callbacks.
- **Stage existing modification** `src/views/play/ui/PlayPage.tsx:3-10` — include the already-made import rewrite from deleted `@/src/components/play_page/**` modules to local FSD modules.
- **Stage existing new files** `src/views/play/model/CardsList/helper.ts`, `src/views/play/model/CardsList/hooks.ts`, `src/views/play/ui/CardsList/ExplicitCard.tsx`, `src/views/play/ui/CardsList/IsCorrectCard.tsx`, `src/views/play/ui/CardsList/TypeInCard.tsx`, `src/views/play/ui/CardsList/index.tsx`, `src/views/play/ui/FinishButton.tsx`, `src/views/play/ui/NotAllAnswersWarningDialog.tsx`, `src/views/play/ui/Results.tsx`, `src/views/play/ui/Title.tsx` — include replacements for the staged deletions.
- **Keep staged deletions** `src/components/play_page/**` — keep old custom-architecture files deleted as part of the FSD migration.
- **Do not modify** `src/views/play/ui/CardsList/IsCorrectCard.tsx:38` — leave `font-normal!` unchanged as requested.
- **Do not stage** `.idea/workspace.xml` — unrelated IDE state.

## 4. Implementation Steps
### Task 1: Fix hook dependencies
1. In `src/views/play/model/CardsList/hooks.ts:25-27`, change `useMemo(() => getIfExpStoryCardCorrectAtom(cardId), [])` to depend on `[cardId]`.
2. In `src/views/play/model/CardsList/hooks.ts:46-52`, change both explicit-card atom `useMemo` calls to depend on `[cardId]`.
3. In `src/views/play/model/CardsList/hooks.ts:97-99`, change `getIsCorrectCardStoryCurrValFamilyAdapterAtom(cardId)` memoization to depend on `[cardId]`.
4. In `src/views/play/model/CardsList/hooks.ts:103-110`, add `isCompleted` and `setCurrVal_localOnly` to the `useCallback` dependency array.
5. In `src/views/play/model/CardsList/hooks.ts:127-138`, add `[cardId]` to the reveal atom `useMemo` and `[setAnswerRevealed]` to `onRevealButtonClick`.
6. In `src/views/play/model/CardsList/hooks.ts:168-182`, add `[cardId]` to the type-in current-value atom `useMemo` and `setCurrVal_localOnly` to the setter callback deps.

### Task 2: Fix staged commit composition
1. Stage `src/views/play/ui/PlayPage.tsx` so the index version imports from `./CardsList`, `./FinishButton`, `./Results`, and `./Title`.
2. Stage all new `src/views/play/model/CardsList/**` and `src/views/play/ui/**` replacement files.
3. Leave old staged deletions under `src/components/play_page/**` in place.
4. Confirm `.idea/workspace.xml` stays unstaged.

## 5. Acceptance Criteria
- `git show :src/views/play/ui/PlayPage.tsx` no longer imports from `@/src/components/play_page/**`.
- `git diff --staged --name-status` includes the old `D src/components/play_page/**` entries and matching `A/M src/views/play/**` entries in the same staged set.
- `git diff --staged --name-only` does not include `.idea/workspace.xml`.
- `grep -R "components/play_page" -n src` returns no source references after staging.
- `src/views/play/model/CardsList/hooks.ts` has no atom-creating `useMemo` that references `cardId` while using `[]` dependencies.
- `src/views/play/ui/CardsList/IsCorrectCard.tsx` still contains `font-normal!`.

## 6. Verification Steps
- Run `git diff --staged --name-status` to verify the staged set is atomic.
- Run `git show :src/views/play/ui/PlayPage.tsx` to verify staged imports point at FSD files.
- Run `grep -R "components/play_page" -n src` and expect no matches.
- Run `pnpm es-lint` to verify hook dependency and import checks.
- Run `pnpm build` to verify deleted old component paths are no longer required by the app.

## 7. Risks & Mitigations
- **Risk:** staging only some FSD files still leaves `PlayPage` or card imports broken. **Mitigation:** verify staged name-status and staged `PlayPage.tsx` before committing.
- **Risk:** hook dependency fixes can create new atom instances when `cardId` changes. **Mitigation:** this is the desired behavior; it keeps atom subscriptions aligned with the current card.
- **Risk:** unrelated IDE state gets included. **Mitigation:** explicitly keep `.idea/workspace.xml` unstaged.