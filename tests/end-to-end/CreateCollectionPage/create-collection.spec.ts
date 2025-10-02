import { expect, test } from '@playwright/test';
import {
        addCard,
        addOption,
        getAllQuestionCardOptions,
        getAllQuestionCards,
        getCollectionTitle,
        getOptionDeleteBtn,
        getOptionTextField,
        getOptionTickBtn,
        getQuestionCard,
        getQuestionCardDeleteBtn,
        getQuestionCardOption,
        getQuestionCardTitle,
        getSaveCollectionButton
} from '@/tests/end-to-end/CreateCollectionPage/utils';
import { TEST_CARDS } from '@/tests/end-to-end/CreateCollectionPage/constants';
import { createObjStoreDefault } from '@/app/lib/db/jotaiRelated';
import { MainDbSchema } from '@/app/lib/db/Main/types';
import { DB } from '@/app/lib/db/types';

const EXAMPLE_TEXT_VAL = 'Some example value for collection page';

test.describe('This tests bundle will describe collection creation process', () => {
        test.beforeEach(async ({ page }) => {
                await page.goto('/(books)/edit');
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

        test('When user deletes option, changes should be persistent', async ({
                page
        }) => {
                await test.step('add card', async () => {
                        await addCard(page);
                });
                const option = await test.step('add option', async () => {
                        const card = getQuestionCard(page);
                        await addOption(card);
                        return getQuestionCardOption(card);
                });
                await test.step('option should be visible', async () => {
                        await expect(option).toBeVisible();
                });
                await test.step('delete option', async () => {
                        const optionDeleteBtn = getOptionDeleteBtn(option);
                        await optionDeleteBtn.click();
                });
                await test.step('option should be invisible', async () => {
                        await expect(option).not.toBeVisible();
                });
                await test.step('changes should be persistent to page reload', async () => {
                        await page.reload();
                        await expect(option).not.toBeVisible();
                });
        });

        test('If data entered and save button clicked, redirect should work, and data should appear in MainDB', async ({
                page
        }) => {
                await test.step('add 5 cards', async () => {
                        await addCard(page, 5);
                });

                await test.step('insert collection title data', async () => {
                        const collectionTitle = getCollectionTitle(page);
                        await collectionTitle.fill(EXAMPLE_TEXT_VAL);
                });

                await test.step('fulfill cards with info', async () => {
                        const cards = await getAllQuestionCards(page);
                        for (let i = 0; i < cards.length; i++) {
                                const testCard = TEST_CARDS[i];
                                const pageCard = cards[i];

                                const questionTitle =
                                        getQuestionCardTitle(pageCard);
                                await questionTitle.fill(
                                        testCard.questionTitle
                                );
                                await addOption(
                                        pageCard,
                                        testCard.options.length
                                );
                                const options =
                                        await getAllQuestionCardOptions(
                                                pageCard
                                        );

                                for (let i2 = 0; i2 < options.length; i2++) {
                                        const option = options[i2];
                                        const testOption = testCard.options[i2];
                                        const optionTextField =
                                                getOptionTextField(option);
                                        await optionTextField.fill(
                                                testOption.optionText
                                        );
                                        if (testOption.isTicked) {
                                                const optionTickButton =
                                                        getOptionTickBtn(
                                                                option
                                                        );
                                                await optionTickButton.click();
                                        }
                                }
                        }
                });

                await test.step('click save collection button', async () => {
                        const saveCollectionButton =
                                getSaveCollectionButton(page);
                        await saveCollectionButton.click();
                });

                await test.step('user should appear on (books) page', async () => {
                        await page.waitForTimeout(3_000);
                        await expect(page).toHaveURL('/(books)');
                });
                await test.step('expect data to be in IndexedDB', async () => {
                        const upgrade = (database: DB<MainDbSchema>) => {
                                createObjStoreDefault<MainDbSchema>(
                                        database,
                                        'userCollections'
                                );
                        };

                        const collectionData = await page.evaluate(async () => {
                                return new Promise((resolve, reject) => {
                                        const openReq =
                                                indexedDB.open('MainPageDB');
                                        openReq.onerror = () =>
                                                reject(openReq.error);
                                        openReq.onsuccess = () => {
                                                const db = openReq.result;
                                                const tx = db.transaction(
                                                        'userCollections',
                                                        'readonly'
                                                );
                                                const store =
                                                        tx.objectStore(
                                                                'userCollections'
                                                        );
                                                const request = store.get(
                                                        new URLSearchParams(
                                                                EXAMPLE_TEXT_VAL
                                                        ).toString()
                                                );
                                                request.onsuccess = () => {
                                                        resolve(request.result);
                                                };
                                                request.onerror = () => {
                                                        reject(request.error);
                                                };
                                        };
                                });
                        });

                        expect(collectionData).toBeTruthy();
                        console.log('ok 5');
                });
        });
});

function getUrlEncodedKey(key: string) {
        return new URLSearchParams(key).toString();
}
