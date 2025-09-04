import { expect, test } from '@playwright/test';
import {
        addCard,
        addOption
} from '@/tests/end-to-end/CreateCollectionPage/utils';

const EXAMPLE_TEXT_VAL = 'Some example value for collection page';

test.describe('This tests bundle will describe collection creation process', () => {
        test.beforeEach(async ({ page }) => {
                await page.goto('/main/add-collection');
        });

        test("When user sets collection title, it won't be erased after reload ", async ({
                page
        }) => {
                const titleInput = page.getByTestId('collection-title-input');
                await titleInput.focus();
                await titleInput.fill(EXAMPLE_TEXT_VAL);
                await expect(titleInput).toHaveValue(EXAMPLE_TEXT_VAL);
                await page.reload();
                await titleInput.focus();
                await expect(titleInput).toHaveValue(EXAMPLE_TEXT_VAL);
        });

        test('When user clicks add button, question card should appear', async ({
                page
        }) => {
                const NUM_OF_CARDS = 2;
                await addCard(page, NUM_OF_CARDS);
                const questionCards = await page.locator('.questionCard').all();
                expect(questionCards.length).toBe(NUM_OF_CARDS);
        });

        test("When user fills question title, it won't be erased after reload", async ({
                page
        }) => {
                await addCard(page);
                const questionCardTitle = page.getByTestId('questionTitle');
                await expect(questionCardTitle).toBeVisible();
                await questionCardTitle.focus();
                await questionCardTitle.fill(EXAMPLE_TEXT_VAL);
                await page.reload();
                await expect(questionCardTitle).toHaveValue(EXAMPLE_TEXT_VAL);
        });

        test("When user fills option text, it won't be erased after reload", async ({
                page
        }) => {
                await addCard(page);
                const questionCard = page.locator('.questionCard');
                await addOption(questionCard);
                const optionTextField =
                        questionCard.getByTestId('optionTextField');
                await optionTextField.fill(EXAMPLE_TEXT_VAL);
                await page.reload();
                await expect(optionTextField).toHaveValue(EXAMPLE_TEXT_VAL);
        });
});
