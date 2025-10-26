import { BASE_DIALOG_TEST_IDS, EP_TEST_IDS } from '@/src/constants/testIds';
import test, { expect, Locator, Page } from '@playwright/test';
import {
        getAddElementInListWithSuccessExpectations,
        getRemoveElFromTheListWithSuccessExpectations,
        getSelector
} from '@/tests/end-to-end/helpers';

export const getBookTitleInp = getSelector(EP_TEST_IDS.bookTitleInp);
export const getBookDescInp = getSelector(EP_TEST_IDS.bookDescInp);
export const getBtnOpenDialogCardsAsText = getSelector(
        EP_TEST_IDS.openDialogBtnCardsAsText
);
export const getBtnCloseDialog = getSelector(BASE_DIALOG_TEST_IDS.defCloseBtn);
export const getDialogCardsAsText = getSelector(
        EP_TEST_IDS.cardsAsTextDialog.me
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
export const getOption = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.me
);
export const getOptChangeIsCorrectCheckbox = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.changeIsCorrectCheckbox
);
export const getOptTitle = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.title
);
export const getOptDeleteBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.deleteBtn
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
        getItemLocator: getOption
});

export const addNewOptionStep = getAddElementInListWithSuccessExpectations({
        testStepTitle: 'Add new option in explicit card',
        getAddButton: getExpCardNewOptBtn,
        getItemLocator: getOption
});
