import test, { expect } from '@playwright/test';
import { addNewBook, editBook } from '@/tests/end-to-end/BooksPage/helpers';
import {
        addNewExpCardStep,
        addNewOptionStep,
        addNewShortCardStep,
        deleteCardStep,
        deleteOptionStep,
        getBookDescInp,
        getBookTitleInp,
        getExpCardContent,
        getExpCardExplanationInp,
        getExpCardSubtitleInp,
        getExpCardTitleInp,
        getOptChangeIsCorrectCheckbox,
        getOption,
        getOptTitle,
        getShortCardContent,
        getShortCardDefinitionInp,
        getShortCardTermInp
} from '@/tests/end-to-end/EditBookPage/helpers';
import {
        expectInpToBeResilientToReloads,
        multiPageReloadStep,
        typeInTextAndExpectSuccess
} from '@/tests/end-to-end/helpers';
import { UPDATE_OPTION_DATA } from '@/tests/end-to-end/EditBookPage/constants';

test.describe('Set of checks for edit book page', () => {
        test.beforeEach(
                'Create empty book and go to edit page of it',
                async ({ page }) => {
                        await page.goto('/');
                        await page.waitForFunction(() => 'indexedDB' in window);
                        await addNewBook(page);
                        await editBook({ page, bookInd: 0 });
                }
        );

        test('Book title should be resilient to reloads', async ({ page }) => {
                const bookTitleInp = getBookTitleInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: bookTitleInp
                });
        });

        test('Book description should be resilient to reloads', async ({
                page
        }) => {
                const bookDescriptionInp = getBookDescInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: bookDescriptionInp
                });
        });

        test('Explicit card title should be resilient to reloads', async ({
                page
        }) => {
                await addNewExpCardStep(page);
                const expCardTitleInp = getExpCardTitleInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: expCardTitleInp
                });
        });

        test('Explicit card subtitle should be resilient to reloads', async ({
                page
        }) => {
                await addNewExpCardStep(page);
                const expCardSubtitle = getExpCardSubtitleInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: expCardSubtitle
                });
        });

        test('Explicit card explanation should be resilient to reloads', async ({
                page
        }) => {
                await addNewExpCardStep(page);
                const expCardExplanation = getExpCardExplanationInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: expCardExplanation
                });
        });

        test('Inserting new options should be resilient to updates', async ({
                page
        }) => {
                const NUM_OF_OPTS_TO_CREATE = 10;

                await addNewExpCardStep(page);

                for (let i = 0; i < NUM_OF_OPTS_TO_CREATE; i++) {
                        await addNewOptionStep(getExpCardContent(page));
                }
                await multiPageReloadStep(page);

                await expect(getOption(getExpCardContent(page))).toHaveCount(
                        NUM_OF_OPTS_TO_CREATE
                );
        });

        test('Inserting new options and deleting some of them should be resilient to updates', async ({
                page
        }) => {
                const NUM_OF_OPTS_TO_CREATE = 10;
                const NUM_OF_OPTS_TO_DELETE = 5;

                await addNewExpCardStep(page);
                for (let i = 0; i < NUM_OF_OPTS_TO_CREATE; i++) {
                        await addNewOptionStep(getExpCardContent(page));
                }
                await multiPageReloadStep(page);

                for (let i = 0; i < NUM_OF_OPTS_TO_DELETE; i++) {
                        await deleteOptionStep(getExpCardContent(page), i);
                }
                await multiPageReloadStep(page);

                await expect(getOption(getExpCardContent(page))).toHaveCount(
                        NUM_OF_OPTS_TO_CREATE - NUM_OF_OPTS_TO_DELETE
                );
        });

        test('Option update should be resilient to page reload', async ({
                page
        }) => {
                await addNewExpCardStep(page);

                for (const { isCorrect, title } of UPDATE_OPTION_DATA) {
                        await addNewOptionStep(getExpCardContent(page));

                        const { optTitleInpEl, optIsCorrectCheckboxEl } =
                                await test.step('extract fields from option', () => {
                                        const currOption = getOption(
                                                getExpCardContent(page)
                                        ).last();
                                        const optTitleInpEl =
                                                getOptTitle(currOption);
                                        const optIsCorrectCheckboxEl =
                                                getOptChangeIsCorrectCheckbox(
                                                        currOption
                                                );
                                        return {
                                                optTitleInpEl,
                                                optIsCorrectCheckboxEl
                                        };
                                });

                        await test.step(`Update option to have title with value ${title} and correctness checkbox ${isCorrect ? 'ticked' : 'unticked'}`, async () => {
                                await typeInTextAndExpectSuccess(
                                        optTitleInpEl,
                                        title
                                );
                                if (isCorrect)
                                        await optIsCorrectCheckboxEl.click();
                        });
                }
                await multiPageReloadStep(page);

                await expect(getOption(getExpCardContent(page))).toHaveCount(
                        UPDATE_OPTION_DATA.length
                );

                for (let i = 0; i < UPDATE_OPTION_DATA.length; i++) {
                        console.log(getExpCardContent(page));
                        const expectedData = UPDATE_OPTION_DATA[i];
                        const currOptionEl = getOption(
                                getExpCardContent(page)
                        ).nth(i);
                        const optTitleInpEl = getOptTitle(currOptionEl);
                        const isCorrectCheckboxEl =
                                getOptChangeIsCorrectCheckbox(currOptionEl);

                        await expect(optTitleInpEl).toHaveValue(
                                expectedData.title
                        );
                        expect(await isCorrectCheckboxEl.isChecked()).toBe(
                                expectedData.isCorrect
                        );
                }
        });

        test('Short card term input should be resilient to page reload', async ({
                page
        }) => {
                await addNewShortCardStep(page);
                const termInpEl = getShortCardTermInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: termInpEl
                });
        });

        test('Short card definition input should be resilient to page reload', async ({
                page
        }) => {
                await addNewShortCardStep(page);
                const definitionInpEl = getShortCardDefinitionInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: definitionInpEl
                });
        });

        test('It should be possible to delete short card. Changes should be resilient to page reloads', async ({
                page
        }) => {
                const SHORT_CARDS_TO_ADD = 10;
                const SHORT_CARDS_TO_DELETE = 5;

                await test.step(`Add ${SHORT_CARDS_TO_ADD} short cards`, async () => {
                        for (let i = 0; i < SHORT_CARDS_TO_ADD; i++) {
                                await addNewShortCardStep(page);
                        }
                });

                await expect(getShortCardContent(page)).toHaveCount(
                        SHORT_CARDS_TO_ADD
                );

                await test.step(`Delete ${SHORT_CARDS_TO_DELETE} short cards`, async () => {
                        for (let i = 0; i < SHORT_CARDS_TO_DELETE; i++) {
                                await deleteCardStep(page, i);
                        }
                });

                await multiPageReloadStep(page);

                await expect(getShortCardContent(page)).toHaveCount(
                        SHORT_CARDS_TO_ADD - SHORT_CARDS_TO_DELETE
                );
        });

        test('It should be possible to delete explicit card. Changes should be resilient to page reloads', async ({
                page
        }) => {
                const EXPLICIT_CARDS_TO_ADD = 10;
                const EXPLICIT_CARDS_TO_DELETE = 5;

                await test.step(`Add ${EXPLICIT_CARDS_TO_ADD} explicit cards`, async () => {
                        for (let i = 0; i < EXPLICIT_CARDS_TO_ADD; i++) {
                                await addNewExpCardStep(page);
                        }
                });

                await expect(getExpCardContent(page)).toHaveCount(
                        EXPLICIT_CARDS_TO_ADD
                );

                await test.step(`Delete ${EXPLICIT_CARDS_TO_DELETE} explicit cards`, async () => {
                        for (let i = 0; i < EXPLICIT_CARDS_TO_DELETE; i++) {
                                await deleteCardStep(page, i);
                        }
                });

                await multiPageReloadStep(page);

                await expect(getExpCardContent(page)).toHaveCount(
                        EXPLICIT_CARDS_TO_ADD - EXPLICIT_CARDS_TO_DELETE
                );
        });

        /* create exp card


        *   resilience change option is correct
        - update
        - check option correctness
        *   option --> change state mobile
        -update
        - check option correctness
        * option --> delete option mobile
        -update
        - check num of options
        *  */

        /* delete exp card
         *  */
});
