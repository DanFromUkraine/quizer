import test, { expect } from '@playwright/test';
import { addNewBook, editBook } from '@/tests/end-to-end/BooksPage/helpers';
import {
        addNewExpCardStep,
        addNewOptionStep,
        deleteOptionStep,
        getBookDescInp,
        getBookTitleInp,
        getExpCardContent,
        getExpCardExplanationInp,
        getExpCardSubtitleInp,
        getExpCardTitleInp,
        getOptChangeIsCorrectCheckbox,
        getOption,
        getOptTitle
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
                const expCardContent = getExpCardContent(page);
                for (let i = 0; i < NUM_OF_OPTS_TO_CREATE; i++) {
                        await addNewOptionStep(expCardContent);
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
                const expCardContent = getExpCardContent(page);
                for (let i = 0; i < NUM_OF_OPTS_TO_CREATE; i++) {
                        await addNewOptionStep(expCardContent);
                }
                await multiPageReloadStep(page);

                for (let i = 0; i < NUM_OF_OPTS_TO_DELETE; i++) {
                        await deleteOptionStep(expCardContent, i);
                }
                await multiPageReloadStep(page);

                await expect(getOption(getExpCardContent(page))).toHaveCount(
                        NUM_OF_OPTS_TO_CREATE - NUM_OF_OPTS_TO_DELETE
                );
        });

        test('Option update should be resilient to page reload', async ({
                page
        }) => {
                const expCardEl =
                        await test.step('Create exp card', async () => {
                                await addNewExpCardStep(page);
                                return getExpCardContent(page);
                        });

                for (const { isCorrect, title } of UPDATE_OPTION_DATA) {
                        await addNewOptionStep(expCardEl);

                        const { optTitleInpEl, optIsCorrectCheckboxEl } =
                                await test.step('extract fields from option', () => {
                                        const currOption =
                                                getOption(expCardEl).last();
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

                const allOptions = await getOption(expCardEl).all();
                expect(allOptions.length).toBe(UPDATE_OPTION_DATA.length);

                for (let i = 0; i <= UPDATE_OPTION_DATA.length; i++) {
                        const expectedData = UPDATE_OPTION_DATA[i];
                        const currOptionEl = allOptions[i];
                        const optTitleInpEl = getOptTitle(currOptionEl);
                        const isCorrectCheckboxEl =
                                getOptChangeIsCorrectCheckbox(currOptionEl);

                        await expect(optTitleInpEl).toHaveValue(
                                expectedData.title
                        );
                        expect(isCorrectCheckboxEl.isChecked()).toBe(
                                expectedData.isCorrect
                        );
                }
        });

        /* create exp card

        *   resilience update option
        -update
        - check option content
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
