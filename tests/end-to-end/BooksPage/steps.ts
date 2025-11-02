import { expect, Page } from '@playwright/test';
import {
        getBookCard,
        getBookDeleteBtn,
        getBookEditBtn,
        getBookStudyBtn,
        getNewBookBtn
} from './selectors';
import {
        getAddElementInListWithSuccessExpectations,
        getRemoveElFromTheListWithSuccessExpectations
} from '../helpers';

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
