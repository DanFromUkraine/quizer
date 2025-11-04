import { expect, Locator, Page, test } from '@playwright/test';
import { EXAMPLE_STR } from '@/tests/end-to-end/EditBookPage/constants';

export function getSelector(testId: string) {
        return (locator: Page | Locator) => {
                if (typeof locator === 'undefined')
                        throw new Error(
                                `Locator for testid ${testId} is undefined.`
                        );
                return locator.getByTestId(testId);
        };
}

export async function multiPageReloadStep({
        page,
        timesNum
}: {
        page: Page;
        timesNum: number;
}) {
        await test.step(`Reload page ${timesNum} times`, async () => {
                for (let i = 0; i < timesNum; i++) {
                        await page.reload(); // Because of peculiarity of inner update mechanisms checks should be harsher
                }

                await page.waitForFunction(() => 'indexedDB' in window);
        });
}

export async function typeInTextAndExpectSuccess(input: Locator, text: string) {
        await expect(input).toBeVisible();
        await expect(input).toBeEditable();
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
        await multiPageReloadStep({ page, timesNum: 3 });
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
                        const initElsCount =
                                await getItemLocator(scope).count();
                        const targetEl =
                                getItemLocator(scope).nth(elIndexToDelete);
                        const deleteBtnEl = getDeleteBtnEl(targetEl);
                        await deleteBtnEl.click();
                        await expect(getItemLocator(scope)).toHaveCount(
                                initElsCount - 1
                        );
                });
        };
}

export async function swipeOption({
        optionEl,
        direction,
        page
}: {
        optionEl: Locator;
        direction: 'left' | 'right';
        page: Page;
}) {
        const optionBox = await optionEl.boundingBox();
        if (optionBox === null)
                throw new Error(
                        `Couldn't swipe option in ${direction} direction`
                );
        const halfElWidth = Math.round(optionBox.width / 2);
        const startX = optionBox.x + halfElWidth;
        const startY = optionBox.y + Math.round(optionBox.height / 2);
        const endX =
                direction === 'left'
                        ? optionBox.x + optionBox.width
                        : optionBox.x;

        await cdpSwipe({ page, startX, startY, endX, durationMS: 300 });
}

async function cdpSwipe({
        page,
        startX,
        startY,
        endX,
        durationMS
}: {
        page: Page;
        startX: number;
        startY: number;
        endX: number;
        durationMS: number;
}) {
        const client = await page.context().newCDPSession(page);
        const MIN_INTERVAL = 16; // ~60fps
        const steps = Math.max(2, Math.floor(durationMS / MIN_INTERVAL));
        const interval = durationMS / steps;

        try {
                await test.step('Start element touch', async () => {
                        await client.send('Input.dispatchTouchEvent', {
                                type: 'touchStart',
                                touchPoints: [{ x: startX, y: startY, id: 1 }]
                        });
                });

                await test.step('Move element via touch', async () => {
                        for (let i = 1; i <= steps; i++) {
                                const t = i / steps;
                                const x = startX + (endX - startX) * t;
                                await client.send('Input.dispatchTouchEvent', {
                                        type: 'touchMove',
                                        touchPoints: [{ x, y: startY, id: 1 }] // we move element only horizontally
                                });

                                if (i < steps) {
                                        await new Promise((r) =>
                                                setTimeout(
                                                        r,
                                                        Math.round(interval)
                                                )
                                        );
                                }
                        }
                });
                await test.step('Finish option touch', async () => {
                        await client.send('Input.dispatchTouchEvent', {
                                type: 'touchEnd',
                                touchPoints: []
                        });
                });

                if (typeof client.detach === 'function') await client.detach();
        } catch (err) {
                console.warn(
                        "Couldn't complete swipe for element, this is input data for cdpSwipe:",
                        { page, startX, startY, endX, durationMS },
                        err
                );
                throw err;
        }
}

export async function forEachLocator(
        loc: Locator,
        fn: (el: Locator, i: number) => Promise<void>,
        options?: { expectNum: number }
) {
        const n = await loc.count();
        if (options?.expectNum) {
                expect(n).toBe(options.expectNum);
        }
        for (let i = 0; i < n; i++) {
                await fn(loc.nth(i), i);
        }
}

export function trimmedValueRegex(expected: string): RegExp {
  const escaped = expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^\\s*${escaped}\\s*$`);
}