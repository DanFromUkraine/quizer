import { BASE_DIALOG_TEST_IDS, EP_TEST_IDS } from '@/src/constants/testIds';
import test, { expect, Locator, Page } from '@playwright/test';
import {
        getAddElementInListWithSuccessExpectations,
        getRemoveElFromTheListWithSuccessExpectations,
        getSelector,
        typeInTextAndExpectSuccess
} from '@/tests/end-to-end/helpers';
import { addNewBook, editBook } from '@/tests/end-to-end/BooksPage/helpers';
import {
        TestExplicitCardViaText,
        TestOptionViaText,
        TestShortCardViaText
} from '@/tests/end-to-end/EditBookPage/constants';
import {
        getShortCardAsText__MIX_MODE,
        getShortCardAsText__SHORT_MODE
} from '@/src/utils/cardsAsText/helpers';

type CardsAsTextModes = 'mixed' | 'short-cards-only';
type MixedCard = TestExplicitCardViaText | TestShortCardViaText;

export const getBookTitleInp = getSelector(EP_TEST_IDS.bookTitleInp);
export const getBookDescInp = getSelector(EP_TEST_IDS.bookDescInp);
export const getBtnOpenDialogCardsAsText = getSelector(
        EP_TEST_IDS.openDialogBtnCardsAsText
);
export const getBtnCloseDialog = getSelector(BASE_DIALOG_TEST_IDS.defCloseBtn);
export const getDialogCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.me
);
export const getSaveAndExitBtnDialogCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.saveAndExitBtn
);
export const getMixedModeButtonCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.mixedModeBtn
);
export const getShortCardsOnlyModeCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.shortCardsOnlyModeBtn
);
export const getMainInpCardsAsTextDialog = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.mainInp
);
export const getAllCards = (page: Page) =>
        getSelector(EP_TEST_IDS.card.me)(page).all();
export const getCard = getSelector(EP_TEST_IDS.card.me);
export const getExpCardContent = getSelector(
        EP_TEST_IDS.card.explicitCardContent.me
);
export const getShortCardContent = getSelector(
        EP_TEST_IDS.card.shortCardContent.me
);
export const getAllExpCardContentEls = (page: Page) =>
        getSelector(EP_TEST_IDS.card.explicitCardContent.me)(page).all();
export const getAllShortCardContentEls = (page: Page) =>
        getSelector(EP_TEST_IDS.card.shortCardContent.me)(page).all();
export const getExpCardTitleInp = getSelector(
        EP_TEST_IDS.card.explicitCardContent.titleInp
);
export const getExpCardSubtitleInp = getSelector(
        EP_TEST_IDS.card.explicitCardContent.subtitleInp
);
export const getExpCardExplanationInp = getSelector(
        EP_TEST_IDS.card.explicitCardContent.explanationInp
);
export const getAllOptions = (page: Locator) =>
        getSelector(EP_TEST_IDS.card.explicitCardContent.option.me)(page).all();
export const getExpCardNewOptBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.newOptionBtn
);
export const getOptionContainer = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.me
);
export const getMainOptionBody = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody.me
);
export const getOptChangeIsCorrectCheckbox = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody
                .changeIsCorrectCheckbox
);
export const getOptCheckIsCorrectCheckbox_MobileOnly = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option
                .changeIsCorrectCheckbox_MobileOnly
);
export const getOptTitle = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody.titleInp
);
export const getOptDeleteBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody.deleteBtn
);
export const getShortCardTermInp = getSelector(
        EP_TEST_IDS.card.shortCardContent.termInp
);
export const getShortCardDefinitionInp = getSelector(
        EP_TEST_IDS.card.shortCardContent.definitionInp
);
export const getDeleteCardBtn = getSelector(EP_TEST_IDS.card.deleteBtn);
export const getAddNewExpCardBtn = getSelector(EP_TEST_IDS.newExpCardBtn);
export const getAddNewShortCardBtn = getSelector(EP_TEST_IDS.newShortCardBtn);

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
        await page.goto('/');
        await Promise.all([
                page.waitForFunction(() => 'indexedDB' in window),
                page.waitForLoadState('domcontentloaded')
        ]);
        await addNewBook(page);
        await editBook({ page, bookInd: 0 });
}

function getOneExpCardAsText_forTest({
        title,
        subtitle,
        explanation,
        options
}: Omit<TestExplicitCardViaText, 'type'>) {
        return `
        \n&& ${title}
        \n &s ${subtitle}
         ${options
                 .map(
                         ({ optionTitle, isCorrect }) =>
                                 `\n \t %% ${isCorrect ? '%correct%' : ''} ${optionTitle}`
                 )
                 .join('')}
        \n &e ${explanation}
        `;
}

export function getCardsAsText_TEST_ONLY__MIX_MODE(
        cardsList: (TestExplicitCardViaText | TestShortCardViaText)[]
) {
        return cardsList
                .map((card) =>
                        card.type === 'explicit'
                                ? getOneExpCardAsText_forTest(card)
                                : getShortCardAsText__MIX_MODE({
                                          term: card.term,
                                          definition: card.definition
                                  })
                )
                .join('');
}

export function getCardsAsText_TEST_ONLY__SHORT_MODE(
        cardsList: TestShortCardViaText[]
) {
        return cardsList
                .map(({ type: _type, ...card }) =>
                        getShortCardAsText__SHORT_MODE({ ...card })
                )
                .join('');
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

                const optionEls = await getMainOptionBody(cardEl).all();

                await expect(getMainOptionBody(cardEl)).toHaveCount(
                        expectedData.options.length,
                        { timeout: 10_000 }
                );

                for (let i = 0; i < optionEls.length; i++) {
                        await checkStepOptionCardToHaveSuchVals({
                                optionEl: optionEls[i],
                                expectedOptionData: expectedData.options[i]
                        });
                }
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

                const allCardEls = await getCard(page).all();
                for (let i = 0; i < allCardEls.length; i++) {
                        await checkIfCardFromTextMatchesWhatWeExpect({
                                cardEl: allCardEls[i],
                                expectedData: expectedData[i]
                        });
                }
        });
}

export function pickCardsOfShortType(
        list: (TestExplicitCardViaText | TestShortCardViaText)[]
) {
        return list.filter((card) => card.type === 'short');
}

export async function expectTrimmedValue(locator: Locator, expected: string) {
        await expect(locator).toBeVisible();
        const v = await locator.inputValue();
        expect(v.trim()).toBe(expected);
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

async function createEmptyOptionsStep({
        numOfOptsToCreate,
        cardEl
}: {
        numOfOptsToCreate: number;
        cardEl: Locator;
}) {
        await test.step('create empty options', async () => {
                for (let i = 0; i < numOfOptsToCreate; i++) {
                        const addOptButton = getExpCardNewOptBtn(cardEl);
                        await addOptButton.click();
                }
        });
}

async function checkIfTheresEnoughOfOps({
        cardEl,
        expectedCount
}: {
        cardEl: Locator;
        expectedCount: number;
}) {
        await test.step('Expect num of options to correspond to example options list length', async () => {
                await expect(getOptionContainer(cardEl)).toHaveCount(
                        expectedCount
                );
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

                await checkIfTheresEnoughOfOps({
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

export function normalizeForCompare(s: string) {
        return (
                s
                        // Delete all non-breaking spaces and other Unicode spaces
                        .replace(
                                /[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g,
                                ''
                        )
                        // Delete zero-width symbols
                        .replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
                        // Delete any special symbols (New rows, tabs, spaces, etc.)
                        .replace(/\s+/g, '')
                        .trim()
        );
}

//mixEqualListsToSeeOnlyShortCardChanges

export function mixEqualListsToSeeOnlyShortCardChanges(
        initialList: MixedCard[],
        resultList: MixedCard[]
): MixedCard[] {
        if (initialList.length !== resultList.length) {
                throw new Error('lists must have equal length');
        }

        const shortCardsFromResultList = resultList.filter(
                (c): c is TestShortCardViaText => c.type === 'short'
        );

        let shortIndex = 0;
        const fixture: MixedCard[] = [];

        for (const item of initialList) {
                if (item.type === 'explicit') {
                        fixture.push(item);
                } else {
                        if (shortIndex >= shortCardsFromResultList.length) {
                                throw new Error(
                                        'not enough short cards in resultList to replace initialList shorts'
                                );
                        }
                        fixture.push(shortCardsFromResultList[shortIndex++]);
                }
        }

        if (shortIndex !== shortCardsFromResultList.length) {
                throw new Error(
                        'extra short cards in resultList that were not consumed'
                );
        }

        return fixture;
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
        /*
 mixEqualListsToSeeOnlyShortCardChanges(
                        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
                        EXAMPLE_DATA_FOR_UPDATE_CARDS_FROM_TEXT__MIXED_MODE
                )
 *

 getCardsAsText_TEST_ONLY__SHORT_MODE(
                                pickCardsOfShortType(exampleData)
                        )
 *  */

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
