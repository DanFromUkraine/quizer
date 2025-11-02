import test, { expect } from '@playwright/test';
import { addNewBookStep, deleteBook, goToBooksPage } from './steps';
import { multiPageReloadStep } from '../helpers';
import { getBookCard } from './selectors';

test.describe('Set of checks for books page', () => {
        test.beforeEach(goToBooksPage);

        test('User should be able to add and delete book cards. Changes should be resilient to page reloads', async ({
                page
        }) => {
                const NUM_OF_BOOKS_TO_ADD = 10;
                const NUM_OF_BOOKS_TO_DELETE = 5;

                await test.step(`Add ${NUM_OF_BOOKS_TO_ADD} book cards`, async () => {
                        for (let i = 0; i < NUM_OF_BOOKS_TO_ADD; i++) {
                                await addNewBookStep(page);
                        }
                });

                await multiPageReloadStep({ page, timesNum: 3 });

                await test.step('Expect num of book cards to be the same', async () => {
                        await expect(getBookCard(page)).toHaveCount(
                                NUM_OF_BOOKS_TO_ADD
                        );
                });

                await test.step(`Delete ${NUM_OF_BOOKS_TO_DELETE} book cards`, async () => {
                        for (let i = 0; i < NUM_OF_BOOKS_TO_DELETE; i++) {
                                await deleteBook(page, 0);
                        }
                });
        });
});
