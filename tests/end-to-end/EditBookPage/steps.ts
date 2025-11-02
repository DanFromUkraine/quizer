import {
        expectInpToBeResilientToReloads,
        forEachLocator,
        getAddElementInListWithSuccessExpectations,
        getRemoveElFromTheListWithSuccessExpectations,
        multiPageReloadStep,
        swipeOption,
        typeInTextAndExpectSuccess
} from '@/tests/end-to-end/helpers';
import {
        getAddNewExpCardBtn,
        getAddNewShortCardBtn,
        getBtnCloseDialog,
        getBtnOpenDialogCardsAsText,
        getCard,
        getDeleteCardBtn,
        getDialogCardsAsText,
        getExpCardContent,
        getExpCardExplanationInp,
        getExpCardNewOptBtn,
        getExpCardSubtitleInp,
        getExpCardTitleInp,
        getMainInpCardsAsTextDialog,
        getMainOptionBody,
        getOptChangeIsCorrectCheckbox,
        getOptDeleteBtn,
        getOptionContainer,
        getOptTitle,
        getSaveAndExitBtnDialogCardsAsText,
        getShortCardContent,
        getShortCardDefinitionInp,
        getShortCardsOnlyModeCardsAsText,
        getShortCardTermInp
} from '@/tests/end-to-end/EditBookPage/selectors';
import test, { expect, Locator, Page } from '@playwright/test';
import {
        CardsAsTextModes,
        MixedCard,
        TestExplicitCardViaText,
        TestOptionViaText,
        TestShortCardViaText
} from '@/tests/end-to-end/EditBookPage/types';
import {
        checkIfTheresEnoughOfOpts,
        expectTrimmedValue,
        getCardsAsText_TEST_ONLY__MIX_MODE,
        getCardsAsText_TEST_ONLY__SHORT_MODE,
        normalizeForCompare,
        pickCardsOfShortType
} from '@/tests/end-to-end/EditBookPage/utils';
import { addNewBookStep, editBook, goToBooksPage } from '../BooksPage/steps';

export async function openEditCardsAsTextDialogStep(page: Page) {
        await test.step('open edit cards as text dialog', async () => {
                const openDialogBtn = getBtnOpenDialogCardsAsText(page);
                await openDialogBtn.click();
                const dialogContainer = getDialogCardsAsText(page);
                await expect(dialogContainer).toBeVisible();
        });
}

export async function closeEditCardsAsTextDialog(page: Page) {
        await test.step('close edit cards as text dialog', async () => {
                const closeDialogBtn = getBtnCloseDialog(page);
                await closeDialogBtn.click();
                const dialogContainer = getDialogCardsAsText(page);
                await expect(dialogContainer).not.toBeVisible();
        });
}

export const addNewExpCardStep = getAddElementInListWithSuccessExpectations({
        testStepTitle: 'Add new empty explicit card',
        getAddButton: getAddNewExpCardBtn,
        getItemLocator: getCard
});
export const addNewShortCardStep = getAddElementInListWithSuccessExpectations({
        testStepTitle: 'Add new empty short card',
        getAddButton: getAddNewShortCardBtn,
        getItemLocator: getCard
});
export const deleteCardStep = getRemoveElFromTheListWithSuccessExpectations({
        testStepTitle: 'Delete card (explicit | short)',
        getDeleteBtnEl: getDeleteCardBtn,
        getItemLocator: getCard
});
export const deleteOptionStep = getRemoveElFromTheListWithSuccessExpectations({
        testStepTitle: "Delete explicit card's option",
        getDeleteBtnEl: getOptDeleteBtn,
        getItemLocator: getOptionContainer
});
export const addNewOptionStep = getAddElementInListWithSuccessExpectations({
        testStepTitle: 'Add new option in explicit card',
        getAddButton: getExpCardNewOptBtn,
        getItemLocator: getOptionContainer
});

export async function goToEditPage({ page }: { page: Page }) {
        await goToBooksPage({ page });
        await addNewBookStep(page);
        await editBook({ page, bookInd: 0 });
}

export function getStepToOpenCardsAsTextDialogAndEdit({
        mode,
        inputText,
        page
}: {
        mode: CardsAsTextModes;
        inputText: string;
        page: Page;
}) {
        return async () => {
                await openEditCardsAsTextDialogStep(page);
                const mainTitleInpEl = getMainInpCardsAsTextDialog(page);
                const saveAndCloseBtn =
                        getSaveAndExitBtnDialogCardsAsText(page);

                if (mode === 'short-cards-only') {
                        const switchModeBtn =
                                getShortCardsOnlyModeCardsAsText(page);
                        await switchModeBtn.click();
                }

                await typeInTextAndExpectSuccess(mainTitleInpEl, inputText);
                await saveAndCloseBtn.click();
        };
}

export async function checkStepShortCardToHaveSuchVals({
        cardEl,
        expectedData
}: {
        cardEl: Locator;
        expectedData: TestShortCardViaText;
}) {
        await test.step('Check term-definition (short) card to have such expected values', async () => {
                await expectTrimmedValue(
                        getShortCardTermInp(cardEl),
                        expectedData.term
                );

                await expectTrimmedValue(
                        getShortCardDefinitionInp(cardEl),
                        expectedData.definition
                );
        });
}

export async function checkStepOptionCardToHaveSuchVals({
        optionEl,
        expectedOptionData
}: {
        optionEl: Locator;
        expectedOptionData: TestOptionViaText;
}) {
        await test.step('Check option to have such expected values', async () => {
                await expectTrimmedValue(
                        getOptTitle(optionEl),
                        expectedOptionData.optionTitle
                );

                await expect(optionEl).toHaveAttribute(
                        'data-status',
                        expectedOptionData.isCorrect ? 'correct' : 'incorrect'
                );
        });
}

export async function checkStepExpCardToHaveSuchVals({
        cardEl,
        expectedData
}: {
        cardEl: Locator;
        expectedData: TestExplicitCardViaText;
}) {
        await test.step('Check explicit card to have such expected values', async () => {
                await expectTrimmedValue(
                        getExpCardTitleInp(cardEl),
                        expectedData.title
                );

                await expectTrimmedValue(
                        getExpCardSubtitleInp(cardEl),
                        expectedData.subtitle
                );

                await expectTrimmedValue(
                        getExpCardExplanationInp(cardEl),
                        expectedData.explanation
                );

                await forEachLocator(
                        getMainOptionBody(cardEl),
                        async (optionEl, i) => {
                                await checkStepOptionCardToHaveSuchVals({
                                        optionEl,
                                        expectedOptionData:
                                                expectedData.options[i]
                                });
                        },
                        {
                                expectNum: expectedData.options.length
                        }
                );
        });
}

export async function checkMatchOfCardTypesStep({
        cardEl,
        expectedData
}: {
        cardEl: Locator;
        expectedData: TestExplicitCardViaText | TestShortCardViaText;
}) {
        await test.step('Check if current card element type is like what expected', async () => {
                if (expectedData.type === 'explicit') {
                        await expect(getExpCardContent(cardEl)).toBeVisible();
                } else {
                        await expect(getShortCardContent(cardEl)).toBeVisible();
                }
        });
}

export async function checkIfCardFromTextMatchesWhatWeExpect({
        cardEl,
        expectedData
}: {
        cardEl: Locator;
        expectedData: TestExplicitCardViaText | TestShortCardViaText;
}) {
        await test.step('Check if card created from text matches the data we actually typed in', async () => {
                await checkMatchOfCardTypesStep({
                        cardEl,
                        expectedData
                });

                if (expectedData.type === 'explicit') {
                        await checkStepExpCardToHaveSuchVals({
                                cardEl,
                                expectedData
                        });
                } else {
                        await checkStepShortCardToHaveSuchVals({
                                cardEl,
                                expectedData
                        });
                }
        });
}

export async function checkStepIfAllCardsMatchExpectations({
        page,
        expectedData
}: {
        page: Page;
        expectedData: (TestExplicitCardViaText | TestShortCardViaText)[];
}) {
        await test.step('Check if all cards created from text match expectations', async () => {
                await expect(getCard(page)).toHaveCount(expectedData.length, {
                        timeout: 10_000
                });

                await forEachLocator(getCard(page), async (cardEl, i) => {
                        await checkIfCardFromTextMatchesWhatWeExpect({
                                cardEl,
                                expectedData: expectedData[i]
                        });
                });
        });
}

export async function markOptionAsCorrectIfSo({
        optionEl,
        isCorrect
}: {
        optionEl: Locator;
        isCorrect: boolean;
}) {
        if (isCorrect) {
                await test.step('Mark option as correct', async () => {
                        const optionCorrectnessCheckbox =
                                getOptChangeIsCorrectCheckbox(optionEl);
                        await optionCorrectnessCheckbox.click();
                });
        }
}

export async function fillDataInOptionStep({
        optionBodyEl,
        optionTitle,
        isCorrect
}: {
        optionBodyEl: Locator;
        optionTitle: string;
        isCorrect: boolean;
}) {
        await typeInTextAndExpectSuccess(
                getOptTitle(optionBodyEl),
                optionTitle
        );

        await markOptionAsCorrectIfSo({
                isCorrect: isCorrect,
                optionEl: optionBodyEl
        });
}

export async function createEmptyOptionsStep({
        numOfOptsToCreate,
        cardEl
}: {
        numOfOptsToCreate: number;
        cardEl: Locator;
}) {
        await test.step(`create ${numOfOptsToCreate} empty options`, async () => {
                for (let i = 0; i < numOfOptsToCreate; i++) {
                        const addOptButton = getExpCardNewOptBtn(cardEl);
                        await addOptButton.click();
                }
        });
}

export async function createAndFillDataInManyOptionsStep({
        cardEl,
        options
}: {
        cardEl: Locator;
        options: TestOptionViaText[];
}) {
        await test.step('Fill data in options from example', async () => {
                const exampleOptions = options;

                await createEmptyOptionsStep({
                        cardEl,
                        numOfOptsToCreate: exampleOptions.length
                });

                await checkIfTheresEnoughOfOpts({
                        cardEl,
                        expectedCount: exampleOptions.length
                });

                await test.step('Fill data in option inputs', async () => {
                        for (let i = 0; i < exampleOptions.length; i++) {
                                await fillDataInOptionStep({
                                        optionBodyEl:
                                                getMainOptionBody(cardEl).nth(
                                                        i
                                                ),
                                        ...exampleOptions[i]
                                });
                        }
                });
        });
}

export async function fillDataInExpCardStep({
        cardEl,
        expCardExpectedData
}: {
        cardEl: Locator;
        expCardExpectedData: TestExplicitCardViaText;
}) {
        await test.step('Fill data in explicit card', async () => {
                await typeInTextAndExpectSuccess(
                        getExpCardTitleInp(cardEl),
                        expCardExpectedData.title
                );
                await typeInTextAndExpectSuccess(
                        getExpCardSubtitleInp(cardEl),
                        expCardExpectedData.subtitle
                );
                await typeInTextAndExpectSuccess(
                        getExpCardExplanationInp(cardEl),
                        expCardExpectedData.explanation
                );

                await createAndFillDataInManyOptionsStep({
                        cardEl: cardEl,
                        options: expCardExpectedData.options
                });
        });
}

export async function fillDataInShortCardStep({
        cardEl,
        shortCardExpectedData
}: {
        cardEl: Locator;
        shortCardExpectedData: TestShortCardViaText;
}) {
        await test.step('Fill data in short card', async () => {
                await typeInTextAndExpectSuccess(
                        getShortCardTermInp(cardEl),
                        shortCardExpectedData.term
                );
                await typeInTextAndExpectSuccess(
                        getShortCardDefinitionInp(cardEl),
                        shortCardExpectedData.definition
                );
        });
}

export async function fillDataInCardsStep({
        page,
        exampleData
}: {
        exampleData: (TestExplicitCardViaText | TestShortCardViaText)[];
        page: Page;
}) {
        await test.step('Fill data in cards', async () => {
                for (let i = 0; i < exampleData.length; i++) {
                        const currCardEl = getCard(page).nth(i);
                        const currExData = exampleData[i];

                        await checkMatchOfCardTypesStep({
                                cardEl: currCardEl,
                                expectedData: currExData
                        });

                        if (currExData.type === 'explicit') {
                                await fillDataInExpCardStep({
                                        cardEl: currCardEl,
                                        expCardExpectedData: currExData
                                });
                        } else {
                                await fillDataInShortCardStep({
                                        cardEl: currCardEl,
                                        shortCardExpectedData: currExData
                                });
                        }
                }
        });
}

export async function createEmptyCards({
        page,
        exampleData
}: {
        exampleData: (TestExplicitCardViaText | TestShortCardViaText)[];
        page: Page;
}) {
        await test.step('Create empty cards', async () => {
                for (const exData of exampleData) {
                        if (exData.type === 'explicit') {
                                await addNewExpCardStep(page);
                        } else {
                                await addNewShortCardStep(page);
                        }
                }
        });
}

export async function checkIfNumOfCardsIsEnough({
        page,
        expectedCount
}: {
        page: Page;
        expectedCount: number;
}) {
        await test.step('Num of empty cards should correspond to the length of example array', async () => {
                await expect(getCard(page)).toHaveCount(expectedCount);
        });
}

export async function createCards({
        page,
        exampleData
}: {
        page: Page;
        exampleData: (TestExplicitCardViaText | TestShortCardViaText)[];
}) {
        await createEmptyCards({ page, exampleData });
        await checkIfNumOfCardsIsEnough({
                page,
                expectedCount: exampleData.length
        });
        await fillDataInCardsStep({ page, exampleData });
}

export async function testOnDeleteCardViaText({
        page,
        startExampleData,
        mode
}: {
        page: Page;
        startExampleData: (TestExplicitCardViaText | TestShortCardViaText)[];
        mode: CardsAsTextModes;
}) {
        await createCards({
                page,
                exampleData: startExampleData
        });

        await test.step(
                'Open Edit cards text modal and type in example text',
                getStepToOpenCardsAsTextDialogAndEdit({
                        page,
                        inputText: '',
                        mode
                })
        );

        await checkStepIfAllCardsMatchExpectations({
                page,
                expectedData: []
        });
}

export async function testActionsIfTextInModalUpdatesAfterUpdatesInRegularUI({
        page,
        mode,
        exampleData
}: {
        page: Page;
        mode: CardsAsTextModes;
        exampleData: (TestExplicitCardViaText | TestShortCardViaText)[];
}) {
        /* Imagine we create some cards with some buttons, inputs on the page, and then we expect an equivalent text to appear in Cards as text modal. */

        await createCards({
                page,
                exampleData
        });
        await openEditCardsAsTextDialogStep(page);

        await test.step('Expect text in Edit cards as text modal to be an equivalent to what user created with regular UI', async () => {
                if (mode === 'short-cards-only') {
                        const switchModeBtn =
                                getShortCardsOnlyModeCardsAsText(page);
                        await switchModeBtn.click();
                }

                const mainCardsAsTextInpEl = getMainInpCardsAsTextDialog(page);

                const actualValue = await mainCardsAsTextInpEl.inputValue();
                const clearInpVal = normalizeForCompare(actualValue);

                const expectedValForShortCardsOnlyMode =
                        getCardsAsText_TEST_ONLY__SHORT_MODE(
                                pickCardsOfShortType(exampleData)
                        );
                const expectedValForMixedMode =
                        getCardsAsText_TEST_ONLY__MIX_MODE(exampleData);

                const clearExpectedValue = normalizeForCompare(
                        mode === 'mixed'
                                ? expectedValForMixedMode
                                : expectedValForShortCardsOnlyMode
                );

                expect(clearInpVal).toBe(clearExpectedValue);
        });
}

export async function testActionsEditCardsAsText({
        page,
        exampleData,
        expectedData,
        mode,
        inputText
}: {
        page: Page;
        exampleData: MixedCard[];
        mode: CardsAsTextModes;
        expectedData: MixedCard[];
        inputText: string;
}) {
        await createCards({
                page,
                exampleData
        });

        await test.step(
                'Open Edit cards text modal and type in example text',
                getStepToOpenCardsAsTextDialogAndEdit({
                        page,
                        inputText,
                        mode
                })
        );

        await checkStepIfAllCardsMatchExpectations({
                page,
                expectedData
        });
}

export async function testActionsIfEditCardsAsTextModalIsResilientToMisspells({
        page,
        mode,
        inputText,
        expectedData
}: {
        page: Page;
        mode: CardsAsTextModes;
        inputText: string;
        expectedData: MixedCard[];
}) {
        await test.step(
                'Open Edit cards text modal and type in example text',
                getStepToOpenCardsAsTextDialogAndEdit({
                        page,
                        inputText,
                        mode
                })
        );

        await checkStepIfAllCardsMatchExpectations({
                page,
                expectedData
        });
}

export async function testActionsIfUserCanCreateCardsViaText({
        page,
        mode,
        inputText,
        expectedData
}: {
        page: Page;
        inputText: string;
        mode: CardsAsTextModes;
        expectedData: MixedCard[];
}) {
        await test.step(
                'Create some cards in short cards only mode',
                getStepToOpenCardsAsTextDialogAndEdit({
                        page,
                        inputText,
                        mode
                })
        );

        await checkStepIfAllCardsMatchExpectations({
                page,
                expectedData
        });

        await multiPageReloadStep({ page, timesNum: 2 });

        await checkStepIfAllCardsMatchExpectations({
                page,
                expectedData
        });
}

export async function testActionIfUserCanDeleteCards({
        page,
        addCardAction,
        getCard
}: {
        page: Page;
        addCardAction: (scope: Page | Locator) => Promise<void>;
        getCard: (locator: Page | Locator) => Locator;
}) {
        const CARDS_TO_ADD = 10;
        const CARDS_TO_DELETE = 5;

        await test.step(`Add ${CARDS_TO_ADD} cards`, async () => {
                for (let i = 0; i < CARDS_TO_ADD; i++) {
                        await addCardAction(page);
                }
        });

        await expect(getCard(page)).toHaveCount(CARDS_TO_ADD);

        await test.step(`Delete ${CARDS_TO_DELETE} cards`, async () => {
                for (let i = 0; i < CARDS_TO_DELETE; i++) {
                        await deleteCardStep(page, i);
                }
        });

        await multiPageReloadStep({ page, timesNum: 3 });

        await expect(getCard(page)).toHaveCount(CARDS_TO_ADD - CARDS_TO_DELETE);
}

export async function swipeOptionLeftActions({ page }: { page: Page }) {
        await page.setViewportSize({ width: 390, height: 844 });
        const TIMES_TO_CHECK = 3;
        const option = getOptionContainer(getExpCardContent(page));

        if (TIMES_TO_CHECK % 2 === 0)
                throw new Error(
                        `Use should not check cards ${TIMES_TO_CHECK} times, as the number is even --> we should check opposite on the exit of this function`
                );

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
                        await expect(getMainOptionBody(page)).toHaveAttribute(
                                'data-status',
                                prevIsChecked ? 'correct' : 'incorrect'
                        );
                });
        }
}

export async function deleteOptionWithSwipe({
        page,
        numOfOptsToAdd,
        numOfOptsToDelete
}: {
        page: Page;
        numOfOptsToAdd: number;
        numOfOptsToDelete: number;
}) {
        const swipeOptRight = async (optionEl: Locator) =>
                swipeOption({ optionEl, page, direction: 'right' });

        await test.step(`Add ${numOfOptsToAdd} new options to explicit card`, async () => {
                for (let i = 0; i < numOfOptsToAdd; i++) {
                        await addNewOptionStep(getExpCardContent(page));
                }
        });

        await test.step(`Remove ${numOfOptsToDelete} options from explicit card`, async () => {
                for (let i = 0; i < numOfOptsToDelete; i++) {
                        expect(
                                await getMainOptionBody(page).count()
                        ).toBeGreaterThan(0);

                        const firstOption = getMainOptionBody(page).first();
                        await swipeOptRight(firstOption);
                }
        });
}

export async function testCardFieldForReloadResilience({
        page,
        addCard,
        getField
}: {
        page: Page;
        addCard: (arg1: Page | Locator) => Promise<void>;
        getField: (arg1: Page | Locator) => Locator;
}) {
        await addCard(page);
        const inputEl = getField(page);
        await expectInpToBeResilientToReloads({
                page,
                input: inputEl
        });
}
