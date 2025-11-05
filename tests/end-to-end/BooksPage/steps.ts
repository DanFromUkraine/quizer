import test, { expect, Page } from '@playwright/test';
import {
        getBookCard,
        getBookDeleteBtn,
        getBookEditBtn,
        getBookStudyBtn,
        getNewBookBtn,
        getNewStoryDialogContainer,
        getNewStoryDialogSubmitBtn
} from './selectors';
import {
        getAddElementInListWithSuccessExpectations,
        getRemoveElFromTheListWithSuccessExpectations,
        typeInTextAndExpectSuccess
} from '../helpers';
import { MixedCard } from '../EditBookPage/types';
import { createCards } from '../EditBookPage/steps';
import { getBooksPageLinkBtn } from '../commonSelectors';
import { getBookDescInp, getBookTitleInp } from '../EditBookPage/selectors';

export async function goToBooksPage({ page }: { page: Page }) {
        await page.goto('/');
        await Promise.all([
                page.waitForFunction(() => 'indexedDB' in window),
                page.waitForLoadState('domcontentloaded')
        ]);
}

export const addNewBookStep = getAddElementInListWithSuccessExpectations({
        testStepTitle: 'Add new book card',
        getAddButton: getNewBookBtn,
        getItemLocator: getBookCard
});

export async function editBookStep({
        page,
        bookInd
}: {
        page: Page;
        bookInd: number;
}) {
        await test.step('Go to edit book page', async () => {
                await expect(getBookCard(page)).toBeVisible();
                const allBooks = await getBookCard(page).all();
                const book = allBooks[bookInd];
                const editBookBtn = getBookEditBtn(book);
                await editBookBtn.click();
        });
}

export const deleteBook = getRemoveElFromTheListWithSuccessExpectations({
        testStepTitle: 'Delete book card',
        getDeleteBtnEl: getBookDeleteBtn,
        getItemLocator: getBookCard
});

export async function studyBook({
        page,
        bookInd
}: {
        page: Page;
        bookInd: number;
}) {
        const book = getBookCard(page).nth(bookInd);
        const studyBookBtn = getBookStudyBtn(book);
        await studyBookBtn.click();
}

export async function updateBookWithDataStep({
        page,
        bookInd,
        exampleCards: exampleData,
        bookTitle,
        bookDescription
}: {
        page: Page;
        bookInd: number;
        bookTitle: string;
        bookDescription: string;
        exampleCards: MixedCard[];
}) {
        await test.step('Update book with an example data', async () => {
                await editBookStep({ page, bookInd });
                await typeInTextAndExpectSuccess(
                        getBookTitleInp(page),
                        bookTitle
                );
                await typeInTextAndExpectSuccess(
                        getBookDescInp(page),
                        bookDescription
                );
                await createCards({ page, exampleData });
                await goToBooksPageViaLayout(page);
        });
}

export async function goToBooksPageViaLayout(page: Page) {
        const linkBtn = getBooksPageLinkBtn(page);
        await linkBtn.click();
}

export async function submitNewStoryStep(page: Page) {
        await test.step('Expect new story dialog to appear', async () => {
                const storyDialog = getNewStoryDialogContainer(page);
                await expect(storyDialog).toBeVisible();
        });
        await test.step('Submit new story creation', async () => {
                const submitBtn = getNewStoryDialogSubmitBtn(page);
                await submitBtn.click();
        });
}
