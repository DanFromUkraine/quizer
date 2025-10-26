import test, { expect, Locator } from '@playwright/test';
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
        getMainOptionBody,
        getOptChangeIsCorrectCheckbox,
        getOptionContainer,
        getOptTitle,
        getShortCardContent,
        getShortCardDefinitionInp,
        getShortCardTermInp,
        goToEditPage
} from '@/tests/end-to-end/EditBookPage/helpers';
import {
        expectInpToBeResilientToReloads,
        multiPageReloadStep,
        swipeOption,
        typeInTextAndExpectSuccess
} from '@/tests/end-to-end/helpers';
import { UPDATE_OPTION_DATA } from '@/tests/end-to-end/EditBookPage/constants';

test.describe('Set of checks for edit book page', () => {
        test.beforeEach(
                'Create empty book and go to edit page of it',
                goToEditPage
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
                await multiPageReloadStep({ page, timesNum: 3 });

                await expect(
                        getOptionContainer(getExpCardContent(page))
                ).toHaveCount(NUM_OF_OPTS_TO_CREATE);
        });

        test('Inserting new options and deleting some of them should be resilient to updates', async ({
                page
        }) => {
                const NUM_OF_OPTS_TO_CREATE = 10;
                const NUM_OF_OPTS_TO_DELETE = 5;

                await addNewExpCardStep(page);

                await test.step(`Add ${NUM_OF_OPTS_TO_CREATE} options to explicit card and reload page`, async () => {
                        for (let i = 0; i < NUM_OF_OPTS_TO_CREATE; i++) {
                                await addNewOptionStep(getExpCardContent(page));
                        }
                        await multiPageReloadStep({ page, timesNum: 3 });
                });

                await test.step(`Remove ${NUM_OF_OPTS_TO_DELETE} options from explicit card`, async () => {
                        for (let i = 0; i < NUM_OF_OPTS_TO_DELETE; i++) {
                                await getExpCardContent(page).waitFor({
                                        state: 'visible'
                                });
                                const expCardContent = getExpCardContent(page);
                                const optsCount =
                                        await getOptionContainer(
                                                expCardContent
                                        ).count();
                                expect(optsCount).toBeGreaterThan(0);

                                await deleteOptionStep(expCardContent, 0);
                        }
                });

                await test.step(`After reload changes should have been saved, and after such manipulations only ${NUM_OF_OPTS_TO_CREATE - NUM_OF_OPTS_TO_DELETE} should have left`, async () => {
                        await multiPageReloadStep({ page, timesNum: 3 });

                        await expect(
                                getOptionContainer(getExpCardContent(page))
                        ).toHaveCount(
                                NUM_OF_OPTS_TO_CREATE - NUM_OF_OPTS_TO_DELETE
                        );
                });
        });

        test('Checkmark option with swipe', async ({ page }) => {
                await page.setViewportSize({ width: 390, height: 844 });

                const TIMES_TO_CHECK = 3;

                await addNewExpCardStep(page);
                await addNewOptionStep(getExpCardContent(page));
                const option = getOptionContainer(getExpCardContent(page));

                const swipeLeft = async () =>
                        await swipeOption({
                                page,
                                optionEl: option,
                                direction: 'left'
                        });

                let prevIsChecked = false;

                for (let i = 0; i < TIMES_TO_CHECK; i++) {
                        await test.step('Swipe option left', async () => {
                                await swipeLeft();
                                prevIsChecked = !prevIsChecked;
                        });

                        await test.step('Expect changes to be applied', async () => {
                                await expect(
                                        getMainOptionBody(page)
                                ).toHaveAttribute(
                                        'data-status',
                                        prevIsChecked ? 'correct' : 'incorrect'
                                );
                        });

                        await test.step('Expect changes to be resilient to page reloads', async () => {
                                await multiPageReloadStep({
                                        page,
                                        timesNum: 2
                                });

                                await expect(
                                        getMainOptionBody(page)
                                ).toHaveAttribute(
                                        'data-status',
                                        prevIsChecked ? 'correct' : 'incorrect'
                                );
                        });
                }
        });

        test('Delete option with swipe', async ({ page }) => {
                await page.setViewportSize({ width: 390, height: 844 });
                const NUM_OF_OPTIONS_TO_ADD = 10;
                const NUM_OF_OPTIONS_TO_DELETE = 5;

                const swipeOptRight = async (optionEl: Locator) =>
                        swipeOption({ optionEl, page, direction: 'right' });

                await test.step('Add new explicit card', async () => {
                        await addNewExpCardStep(page);
                });
                await test.step(`Add ${NUM_OF_OPTIONS_TO_ADD} new options to explicit card and reload page`, async () => {
                        for (let i = 0; i < NUM_OF_OPTIONS_TO_ADD; i++) {
                                await addNewOptionStep(getExpCardContent(page));
                        }
                        await multiPageReloadStep({ page, timesNum: 3 });
                });

                await test.step(`Remove ${NUM_OF_OPTIONS_TO_DELETE} options from explicit card`, async () => {
                        for (let i = 0; i < NUM_OF_OPTIONS_TO_DELETE; i++) {
                                await getMainOptionBody(page).last().waitFor();
                                expect(
                                        await getMainOptionBody(page).count()
                                ).toBeGreaterThan(0);

                                const firstOption =
                                        getMainOptionBody(page).first();
                                await swipeOptRight(firstOption);
                        }
                });

                await test.step('Expect changes to be saved after page reload', async () => {
                        await multiPageReloadStep({ page, timesNum: 3 });
                        await getExpCardContent(page).waitFor({
                                state: 'visible'
                        });
                        const expCardContentEl = getExpCardContent(page);
                        expect(
                                await getMainOptionBody(
                                        expCardContentEl
                                ).count()
                        ).toBe(
                                NUM_OF_OPTIONS_TO_ADD - NUM_OF_OPTIONS_TO_DELETE
                        );
                });
        });

        test('Option update should be resilient to page reload', async ({
                page
        }) => {
                await addNewExpCardStep(page);

                for (const { isCorrect, title } of UPDATE_OPTION_DATA) {
                        await addNewOptionStep(getExpCardContent(page));

                        const { optTitleInpEl, optIsCorrectCheckboxEl } =
                                await test.step('extract fields from option', () => {
                                        const currOption = getOptionContainer(
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
                await multiPageReloadStep({ page, timesNum: 3 });

                await expect(
                        getOptionContainer(getExpCardContent(page))
                ).toHaveCount(UPDATE_OPTION_DATA.length);

                for (let i = 0; i < UPDATE_OPTION_DATA.length; i++) {
                        console.log(getExpCardContent(page));
                        const expectedData = UPDATE_OPTION_DATA[i];
                        const currOptionEl = getOptionContainer(
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

                await multiPageReloadStep({ page, timesNum: 3 });

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

                await multiPageReloadStep({ page, timesNum: 3 });

                await expect(getExpCardContent(page)).toHaveCount(
                        EXPLICIT_CARDS_TO_ADD - EXPLICIT_CARDS_TO_DELETE
                );
        });


});
