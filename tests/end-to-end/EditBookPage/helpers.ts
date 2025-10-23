import { BASE_DIALOG_TEST_IDS, EP_TEST_IDS } from '@/src/constants/testIds';
import test, { expect, Page } from '@playwright/test';
import { getSelector } from '@/tests/end-to-end/helpers';

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
export const getExpCardNewOptBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.newOptionBtn
);
export const getOptChangeIsCorrectBtn = getSelector(
        EP_TEST_IDS.card.explicitCardContent.option.changeIsCorrectBtn
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

export async function addNewExpCard(page: Page) {
        await test.step('add new empty explicit card', async () => {
                const initialCardsNum = await getAllCards(page);
                const addNewExpCard = getAddNewExpCardBtn(page);
                await addNewExpCard.click();
                const newCardsNum = await getAllCards(page);
                expect(newCardsNum.length - 1).toBe(initialCardsNum.length);
        });
}

export async function addNewShortCard(page: Page) {
        await test.step('add new empty short card', async () => {
                const initialCardsNum = await getAllCards(page);
                const addNewShortCardBtn = getAddNewShortCardBtn(page);
                await addNewShortCardBtn.click();
                const newCardsNum = await getAllCards(page);
                expect(newCardsNum.length - 1).toBe(initialCardsNum.length);
        });
}

export async function deleteCard(page: Page) {
        await test.step('delete card (explicit | short)', async () => {
                const initialCardsNum = await getAllCards(page);
                const deleteCardBtn = getDeleteCardBtn(page);
                await deleteCardBtn.click();
                const newCardsNum = await getAllCards(page);
                expect(newCardsNum.length + 1).toBe(initialCardsNum.length);
        });
}

export async function addNewOption({
        page,
        optInd,
                                           expCardInd
}: {
        page: Page;
        optInd: number;
        expCardInd: number;
}) {
        
}

export async function deleteOption({
        page,
        optInd
}: {
        page: Page;
        optInd: number;
}) {}
