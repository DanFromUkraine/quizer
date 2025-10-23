import { expect, Locator, Page, test } from '@playwright/test';
import { EXAMPLE_STR } from '@/tests/end-to-end/EditBookPage/constants';

export function getSelector(testId: string) {
        return (locator: Page | Locator) => {
                return locator.getByTestId(testId);
        };
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
        await page.reload(); // Because of peculiarity of inner update mechanisms checks should be harsher
        await page.reload();
        await page.reload();
        await expect(input).toHaveValue(EXAMPLE_STR);
}
