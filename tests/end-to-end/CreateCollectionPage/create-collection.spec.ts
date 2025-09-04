import { expect, test } from '@playwright/test';
import {
        addCard,
        addOption,
        getAllQuestionCards,
        getCollectionTitle,
        getOptionTextField,
        getOptionTickBtn,
        getQuestionCard,
        getQuestionCardDeleteBtn,
        getQuestionCardOption,
        getQuestionCardTitle
} from '@/tests/end-to-end/CreateCollectionPage/utils';

const EXAMPLE_TEXT_VAL = 'Some example value for collection page';

test.describe('This tests bundle will describe collection creation process', () => {
        test.beforeEach(async ({ page }) => {
                await page.goto('/main/add-collection');
        });

        test("When user sets collection title, it won't be erased after reload ", async ({
                page
        }) => {
                const titleInput = getCollectionTitle(page);
                await test.step('fill example text into input', async () => {
                        await titleInput.focus();
                        await titleInput.fill(EXAMPLE_TEXT_VAL);
                });
                await test.step('expect changes to be visible', async () => {
                        await expect(titleInput).toHaveValue(EXAMPLE_TEXT_VAL);
                });
                await test.step('check if changes are persistent after reload', async () => {
                        await page.reload();
                        await titleInput.focus();
                        await expect(titleInput).toHaveValue(EXAMPLE_TEXT_VAL);
                });
        });

        test('When user clicks add button, question card should appear', async ({
                page
        }) => {
                const NUM_OF_CARDS = 2;

                await test.step('add card', async () => {
                        await addCard(page, NUM_OF_CARDS);
                });
                await test.step('expect card to be visible', async () => {
                        const questionCards = await getAllQuestionCards(page);
                        expect(questionCards.length).toBe(NUM_OF_CARDS);
                });
                await test.step('expect changes to be persistent to reload', async () => {
                        const questionCards = await getAllQuestionCards(page);
                        expect(questionCards.length).toBe(NUM_OF_CARDS);
                });
        });

        test('When user deletes card, it should disappear', async ({
                page
        }) => {
                await test.step('add card', async () => {
                        await addCard(page);
                });
                const questionCard =
                        await test.step('expect card to be visible', async () => {
                                const questionCard = getQuestionCard(page);
                                await expect(questionCard).toBeVisible();
                                return questionCard;
                        });
                await test.step('delete card', async () => {
                        const deleteBtn =
                                getQuestionCardDeleteBtn(questionCard);
                        await deleteBtn.click();
                });
                await test.step('expect card to be invisible', async () => {
                        await expect(questionCard).not.toBeVisible();
                });
                await test.step('check if changes are persistent after reload', async () => {
                        await page.reload();
                        await expect(questionCard).not.toBeVisible();
                });
        });

        test("When user fills question title, it won't be erased after reload", async ({
                page
        }) => {
                await test.step('add card', async () => {
                        await addCard(page);
                });
                const questionCardTitle =
                        await test.step('expect question card title to be on page', async () => {
                                const questionCard = getQuestionCard(page);
                                const questionCardTitle =
                                        getQuestionCardTitle(questionCard);
                                await expect(questionCardTitle).toBeVisible();
                                return questionCardTitle;
                        });
                await test.step('fill some data in question card title', async () => {
                        await questionCardTitle.focus();
                        await questionCardTitle.fill(EXAMPLE_TEXT_VAL);
                });
                await test.step('expect changes to be visible', async () => {
                        await expect(questionCardTitle).toHaveValue(
                                EXAMPLE_TEXT_VAL
                        );
                });
                await test.step('expect changes to be persistent to reload', async () => {
                        await page.reload();
                        await expect(questionCardTitle).toHaveValue(
                                EXAMPLE_TEXT_VAL
                        );
                });
        });

        test("When user fills option text, it won't be erased after reload", async ({
                page
        }) => {
                await test.step('add card', async () => {
                        await addCard(page);
                });
                const optionTextField =
                        await test.step('fill some data in question card option text field', async () => {
                                const questionCard = getQuestionCard(page);
                                await addOption(questionCard);
                                const option =
                                        getQuestionCardOption(questionCard);
                                const optionTextField =
                                        getOptionTextField(option);
                                await optionTextField.fill(EXAMPLE_TEXT_VAL);
                                return optionTextField;
                        });
                await test.step('expect changes to be visible', async () => {
                        await expect(optionTextField).toHaveValue(
                                EXAMPLE_TEXT_VAL
                        );
                });
                await test.step('expect changes to be persistent to reload', async () => {
                        await page.reload();
                        await expect(optionTextField).toHaveValue(
                                EXAMPLE_TEXT_VAL
                        );
                });
        });

        test("When users ticks option, to make it correct, it shouldn't change its status after reload", async ({
                page
        }) => {
                await test.step('add card', async () => {
                        await addCard(page);
                });
                const checkbox = await test.step('tick option', async () => {
                        const questionCard = getQuestionCard(page);
                        await addOption(questionCard);
                        const option = getQuestionCardOption(questionCard);
                        const checkbox = getOptionTickBtn(option);
                        await checkbox.click();
                        return checkbox;
                });
                await test.step('expect option to be ticked', async () => {
                        await expect(checkbox).toBeChecked();
                });

                await test.step('expect changes to be persistent to reload', async () => {
                        await page.reload();
                        await expect(checkbox).toBeChecked();
                });
        });
});
