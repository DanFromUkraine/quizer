import {
        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__SHORT_CARDS_ONLY,
        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT_WITH_INVALID__MIX_MODE,
        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT_WITH_INVALID__SHORT_ONLY_MODE,
        EXAMPLE_DATA_FOR_UPDATE_CARDS_FROM_TEXT__MIXED_MODE,
        EXP_CARDS_TEXT_TITLE_ONLY,
        UPDATE_OPTION_DATA
} from '@/tests/end-to-end/EditBookPage/constants';
import {
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
        getShortCardTermInp
} from '@/tests/end-to-end/EditBookPage/selectors';
import {
        addNewExpCardStep,
        addNewOptionStep,
        addNewShortCardStep,
        createEmptyOptionsStep,
        deleteOptionStep,
        deleteOptionWithSwipe,
        goToEditPage,
        swipeOptionLeftActions,
        testActionIfUserCanDeleteCards,
        testActionsEditCardsAsText,
        testActionsIfEditCardsAsTextModalIsResilientToMisspells,
        testActionsIfTextInModalUpdatesAfterUpdatesInRegularUI,
        testActionsIfUserCanCreateCardsViaText,
        testCardFieldForReloadResilience,
        testOnDeleteCardViaText
} from '@/tests/end-to-end/EditBookPage/steps';
import {
        getCardsAsText_TEST_ONLY__MIX_MODE,
        getCardsAsText_TEST_ONLY__SHORT_MODE,
        mixEqualListsToSeeOnlyShortCardChanges,
        pickCardsOfShortType
} from '@/tests/end-to-end/EditBookPage/utils';
import {
        expectInpToBeResilientToReloads,
        multiPageReloadStep,
        typeInTextAndExpectSuccess
} from '@/tests/end-to-end/helpers';
import test, { expect } from '@playwright/test';

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
                await testCardFieldForReloadResilience({
                        page,
                        addCard: addNewExpCardStep,
                        getField: getExpCardTitleInp
                });
        });

        test('Explicit card subtitle should be resilient to reloads', async ({
                page
        }) => {
                await testCardFieldForReloadResilience({
                        page,
                        addCard: addNewExpCardStep,
                        getField: getExpCardSubtitleInp
                });
        });

        test('Explicit card explanation should be resilient to reloads', async ({
                page
        }) => {
                await testCardFieldForReloadResilience({
                        page,
                        addCard: addNewExpCardStep,
                        getField: getExpCardExplanationInp
                });
        });

        test('Short card term input should be resilient to page reload', async ({
                page
        }) => {
                await testCardFieldForReloadResilience({
                        page,
                        addCard: addNewShortCardStep,
                        getField: getShortCardTermInp
                });
        });

        test('Short card definition input should be resilient to page reload', async ({
                page
        }) => {
                await testCardFieldForReloadResilience({
                        page,
                        addCard: addNewShortCardStep,
                        getField: getShortCardDefinitionInp
                });
        });

        test('Inserting new options should be resilient to updates', async ({
                page
        }) => {
                const NUM_OF_OPTS_TO_CREATE = 10;
                await addNewExpCardStep(page);

                await createEmptyOptionsStep({
                        numOfOptsToCreate: NUM_OF_OPTS_TO_CREATE,
                        cardEl: getExpCardContent(page)
                });

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

                await createEmptyOptionsStep({
                        numOfOptsToCreate: NUM_OF_OPTS_TO_CREATE,
                        cardEl: getExpCardContent(page)
                });

                await test.step(`Remove ${NUM_OF_OPTS_TO_DELETE} options from explicit card`, async () => {
                        for (let i = 0; i < NUM_OF_OPTS_TO_DELETE; i++) {
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

                await addNewExpCardStep(page);
                await addNewOptionStep(getExpCardContent(page));
                await swipeOptionLeftActions({ page });

                await test.step('Expect changes to be resilient to page reloads', async () => {
                        await multiPageReloadStep({
                                page,
                                timesNum: 2
                        });

                        await expect(getMainOptionBody(page)).toHaveAttribute(
                                'data-status',
                                'correct'
                        );
                });
        });

        test('Delete option with swipe', async ({ page }) => {
                const NUM_OF_OPTIONS_TO_ADD = 10;
                const NUM_OF_OPTIONS_TO_DELETE = 5;

                await page.setViewportSize({ width: 390, height: 844 });
                await addNewExpCardStep(page);
                await deleteOptionWithSwipe({
                        page,
                        numOfOptsToAdd: NUM_OF_OPTIONS_TO_ADD,
                        numOfOptsToDelete: NUM_OF_OPTIONS_TO_DELETE
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
                const numOfOptsToCreate = UPDATE_OPTION_DATA.length;
                await addNewExpCardStep(page);

                await test.step(`Create ${numOfOptsToCreate} options`, async () => {
                        for (let i = 0; i < numOfOptsToCreate; i++) {
                                await addNewOptionStep(getExpCardContent(page));
                        }
                });

                for (let i = 0; i < numOfOptsToCreate; i++) {
                        const { title, isCorrect } = UPDATE_OPTION_DATA[i];
                        const optionBody = getOptionContainer(
                                getExpCardContent(page)
                        ).nth(i);

                        await test.step(`Update option to have title with value ${title} and correctness checkbox ${isCorrect ? 'ticked' : 'unticked'}`, async () => {
                                await typeInTextAndExpectSuccess(
                                        getOptTitle(optionBody),
                                        title
                                );
                                if (isCorrect)
                                        await getOptChangeIsCorrectCheckbox(
                                                optionBody
                                        ).click();
                        });
                }
                await multiPageReloadStep({ page, timesNum: 3 });

                await expect(
                        getOptionContainer(getExpCardContent(page))
                ).toHaveCount(UPDATE_OPTION_DATA.length);

                for (let i = 0; i < UPDATE_OPTION_DATA.length; i++) {
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

        test('It should be possible to delete short card. Changes should be resilient to page reloads', async ({
                page
        }) => {
                await testActionIfUserCanDeleteCards({
                        page,
                        addCardAction: addNewShortCardStep,
                        getCard: getShortCardContent
                });
        });

        test('It should be possible to delete explicit card. Changes should be resilient to page reloads', async ({
                page
        }) => {
                await testActionIfUserCanDeleteCards({
                        page,
                        addCardAction: addNewExpCardStep,
                        getCard: getExpCardContent
                });
        });

        test('User should be able to create explicit and short cards via text with all data (In mixed mode)', async ({
                page
        }) => {
                await testActionsIfUserCanCreateCardsViaText({
                        page,
                        mode: 'mixed',
                        inputText: getCardsAsText_TEST_ONLY__MIX_MODE(
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE
                        ),
                        expectedData:
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE
                });
        });

        test('User should be able to create short cards via text (In short cards only mode)', async ({
                page
        }) => {
                const exampleCards = [
                        ...pickCardsOfShortType(
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE
                        ),
                        ...EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__SHORT_CARDS_ONLY
                ];

                await testActionsIfUserCanCreateCardsViaText({
                        page,
                        mode: 'short-cards-only',
                        inputText: getCardsAsText_TEST_ONLY__SHORT_MODE(
                                exampleCards
                        ),
                        expectedData: exampleCards
                });
        });

        test('User should be able to create explicit card via text with title only', async ({
                page
        }) => {
                const { inputText, expectedData } = EXP_CARDS_TEXT_TITLE_ONLY;

                await testActionsIfEditCardsAsTextModalIsResilientToMisspells({
                        page,
                        mode: 'mixed',
                        inputText,
                        expectedData
                });
        });

        test('User should not see an error message, if short card created via text is invalid (In mixed mode)', async ({
                page
        }) => {
                const { inputText, expectedData } =
                        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT_WITH_INVALID__MIX_MODE;
                await testActionsIfEditCardsAsTextModalIsResilientToMisspells({
                        page,
                        mode: 'mixed',
                        inputText,
                        expectedData
                });
        });

        test('User should not see an error message, if short card created via text is invalid (In short cards only mode)', async ({
                page
        }) => {
                const { inputText, expectedData } =
                        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT_WITH_INVALID__SHORT_ONLY_MODE;
                await testActionsIfEditCardsAsTextModalIsResilientToMisspells({
                        page,
                        mode: 'short-cards-only',
                        inputText,
                        expectedData
                });
        });

        test('User should be able to edit explicit and short cards via text (Mixed mode)', async ({
                page
        }) => {
                await testActionsEditCardsAsText({
                        page,
                        exampleData:
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
                        mode: 'mixed',
                        inputText: getCardsAsText_TEST_ONLY__MIX_MODE(
                                EXAMPLE_DATA_FOR_UPDATE_CARDS_FROM_TEXT__MIXED_MODE
                        ),
                        expectedData:
                                EXAMPLE_DATA_FOR_UPDATE_CARDS_FROM_TEXT__MIXED_MODE
                });
        });

        test('User should be able to edit short cards via text (Short cards only mode)', async ({
                page
        }) => {
                await testActionsEditCardsAsText({
                        page,
                        mode: 'short-cards-only',
                        exampleData:
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
                        inputText: getCardsAsText_TEST_ONLY__SHORT_MODE(
                                pickCardsOfShortType(
                                        EXAMPLE_DATA_FOR_UPDATE_CARDS_FROM_TEXT__MIXED_MODE
                                )
                        ),
                        expectedData: mixEqualListsToSeeOnlyShortCardChanges(
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
                                EXAMPLE_DATA_FOR_UPDATE_CARDS_FROM_TEXT__MIXED_MODE
                        )
                });
        });

        test('If user creates new cards with regular UI, text in Cards as text modal should be updated (Mix mode)', async ({
                page
        }) => {
                await testActionsIfTextInModalUpdatesAfterUpdatesInRegularUI({
                        page,
                        mode: 'mixed',
                        exampleData:
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE
                });
        });

        test('If user creates new cards with regular UI, text in Cards as text modal should be updated (short cards only mode)', async ({
                page
        }) => {
                await testActionsIfTextInModalUpdatesAfterUpdatesInRegularUI({
                        page,
                        mode: 'short-cards-only',
                        exampleData:
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__SHORT_CARDS_ONLY
                });
        });

        test('User should be able to delete both explicit and short cards via text (Mixed mode)', async ({
                page
        }) => {
                await testOnDeleteCardViaText({
                        page,
                        mode: 'mixed',
                        startExampleData:
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE
                });
        });

        test('User should be able to delete both short cards via text (Short cards only)', async ({
                page
        }) => {
                await testOnDeleteCardViaText({
                        page,
                        mode: 'short-cards-only',
                        startExampleData:
                                EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__SHORT_CARDS_ONLY
                });
        });
});
