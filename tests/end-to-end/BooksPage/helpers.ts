import { getSelector } from '@/tests/end-to-end/helpers';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import { expect, Page } from '@playwright/test';

export const getNewBookBtn = getSelector(BP_TEST_IDS.addNewBookBtn);
export const getBookCard = getSelector(BP_TEST_IDS.bookCard.me);
export const getAllBookCards = (page: Page) =>
        getSelector(BP_TEST_IDS.bookCard.me)(page).all();
export const getBookEditBtn = getSelector(BP_TEST_IDS.bookCard.editBookBtn);
export const getBookDeleteBtn = getSelector(BP_TEST_IDS.bookCard.deleteBookBtn);
export const getBookStudyBtn = getSelector(BP_TEST_IDS.bookCard.playBookBtn);
export const getBookStoriesDialogContainer = getSelector(
        BP_TEST_IDS.bookStoriesDialog.me
);
export const getAllBookStoriesDialogStories = (page: Page) =>
        getSelector(BP_TEST_IDS.bookStoriesDialog.storyCard)(page).all();
export const getBookStoriesDialogStory = getSelector(
        BP_TEST_IDS.bookStoriesDialog.storyCard
);
export const getNewStoryDialogContainer = getSelector(
        BP_TEST_IDS.newStoryDialog.me
);
export const getNewStoryDialogIsSmartModeParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.isSmartModeInp
);
export const getNewStoryDialogAreAnswersShownImmediatelyParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.areAnswersShownImmediatelyInp
);
export const getNewStoryDialogNumOfExpCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfExpCardsInp
);
export const getNewStoryDialogNumOfRegCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfNormCardsInp
);
export const getNewStoryDialogNumOfTypeInCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfTypeInCards
);
export const getNewStoryDialogNumOfIsCorrectCardsParamInp = getSelector(
        BP_TEST_IDS.newStoryDialog.numOfIsCorrectCards
);
export const getNewStoryDialogSubmitBtn = getSelector(
        BP_TEST_IDS.newStoryDialog.submitBtn
);

export async function addNewBook(page: Page) {
        await expect(getNewBookBtn(page)).toBeVisible({ timeout: 10_000 });
        const newBookBtn = getNewBookBtn(page);
        console.log({ newBookBtn });
        await expect(newBookBtn).toBeVisible();
        await newBookBtn.click();
        console.log('clicked -- should have added new book');
}

export async function editBook({
        page,
        bookInd
}: {
        page: Page;
        bookInd: number;
}) {
        await expect(getBookCard(page)).toBeVisible();
        const allBooks = await getBookCard(page).all();
        const book = allBooks[bookInd];
        const editBookBtn = getBookEditBtn(book);
        await editBookBtn.click();
}

export async function deleteBook({
        page,
        bookInd
}: {
        page: Page;
        bookInd: number;
}) {
        const allBooks = await getAllBookCards(page);
        const book = allBooks[bookInd];
        const deleteBookBtn = getBookDeleteBtn(book);
        await deleteBookBtn.click();
}

export async function studyBook({
        page,
        bookInd
}: {
        page: Page;
        bookInd: number;
}) {
        const allBooks = await getAllBookCards(page);
        const book = allBooks[bookInd];
        const studyBookBtn = getBookStudyBtn(book);
        await studyBookBtn.click();
}
