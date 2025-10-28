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

export async function openEditCardsAsTextDialog(page: Page) {
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
        mode: 'mixed' | 'short-cards-only';
        inputText: string;
        page: Page;
}) {
        return async () => {
                await openEditCardsAsTextDialog(page);
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

export async function checkMatchOfCardTypes({
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
                await checkMatchOfCardTypes({
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
