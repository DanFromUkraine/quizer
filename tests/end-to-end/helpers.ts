import { expect, Locator, Page, test } from '@playwright/test';
import { EXAMPLE_STR } from '@/tests/end-to-end/EditBookPage/constants';

export function getSelector(testId: string) {
        return (locator: Page | Locator) => {
                return locator.getByTestId(testId);
        };
}

export async function multiPageReloadStep(page: Page) {
        await test.step('Reload page 5 times', async () => {
                await page.reload(); // Because of peculiarity of inner update mechanisms checks should be harsher
                await page.reload();
                await page.reload();
                await page.reload();
                await page.reload();
        });
}

export async function typeInTextAndExpectSuccess(input: Locator, text: string) {
        await input.fill(text);
        await test.expect(input).toHaveValue(text);
}

export async function expectInpToBeResilientToReloads({
        page,
        input
}: {
        page: Page;
        input: Locator;
}) {
        await typeInTextAndExpectSuccess(input, EXAMPLE_STR);
        await multiPageReloadStep(page);
        await expect(input).toHaveValue(EXAMPLE_STR);
}

export function getAddElementInListWithSuccessExpectations({
        getAddButton,
        getItemLocator,
        testStepTitle
}: {
        testStepTitle: string;

        getAddButton: (arg1: Page | Locator) => Locator;
        getItemLocator: (arg1: Page | Locator) => Locator;
}) {
        return async (scope: Page | Locator) =>
                await test.step(testStepTitle, async () => {
                        const initialCount =
                                await getItemLocator(scope).count();
                        const actionButton = getAddButton(scope);
                        await actionButton.click();
                        await expect(getItemLocator(scope)).toHaveCount(
                                initialCount + 1
                        );
                });
}

export function getRemoveElFromTheListWithSuccessExpectations({
        testStepTitle,
        getDeleteBtnEl,
        getItemLocator
}: {
        testStepTitle: string;
        getDeleteBtnEl: (arg1: Locator) => Locator;
        getItemLocator: (arg1: Locator | Page) => Locator;
}) {
        return async (scope: Page | Locator, elIndexToDelete: number) => {
                await test.step(testStepTitle, async () => {
                        const initialElsInScope =
                                await getItemLocator(scope).all();
                        const targetEl = initialElsInScope[elIndexToDelete];
                        const deleteBtnEl = getDeleteBtnEl(targetEl);

                        await deleteBtnEl.click();
                        await expect(getItemLocator(scope)).toHaveCount(
                                initialElsInScope.length - 1
                        );
                });
        };
}
