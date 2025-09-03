import { test, expect } from '@playwright/test';

const EXAMPLE_TEXT_VAL = 'Some example value for collection page';

test.describe('This tests bundle will describe collection creation process', () => {
        test.beforeEach(async ({ page }) => {
                await page.goto('/main/add-collection');
        });

        test('When user sets title, page reload must not earase it', async ({
                page
        }) => {
                const titleInput = page.getByTestId('collection-title-input');
                await titleInput.focus();
                await titleInput.fill(EXAMPLE_TEXT_VAL);
                expect(titleInput).toHaveValue(EXAMPLE_TEXT_VAL);
                await page.reload();
                await page.waitForTimeout(300);
                await titleInput.focus();
                expect(titleInput).toHaveValue(EXAMPLE_TEXT_VAL);
        });

        test("When user fills question title, it won't be earased after reload", async ({
                page
        }) => {
                const addCardButton = page.getByTestId('add-card');
                await addCardButton.click();
                await page.waitForTimeout(300);
                const questionCard = page.locator('.questionCard');
                expect(questionCard).toBeVisible();
                const questionCardTitle =
                        questionCard.locator('.questionTitle');
                await questionCardTitle.focus();
                await questionCardTitle.fill(EXAMPLE_TEXT_VAL);
                await page.reload();
                expect(questionCardTitle).toHaveValue(EXAMPLE_TEXT_VAL);
        });
});
