import test from '@playwright/test';
import { addNewBook, editBook } from '@/tests/end-to-end/BooksPage/helpers';
import {
        addNewExpCard,
        getBookDescInp,
        getBookTitleInp,
        getExpCardExplanationInp,
        getExpCardSubtitleInp,
        getExpCardTitleInp
} from '@/tests/end-to-end/EditBookPage/helpers';
import { expectInpToBeResilientToReloads } from '@/tests/end-to-end/helpers';

test.describe('Set of checks for edit book page', () => {
        test.beforeEach(
                'Create empty book and go to edit page of it',
                async ({ page }) => {
                        await page.goto('/');
                        await addNewBook(page);
                        await editBook({ page, bookInd: 0 });
                }
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
                await addNewExpCard(page);
                const expCardTitleInp = getExpCardTitleInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: expCardTitleInp
                });
        });

        test('Explicit card subtitle should be resilient to reloads', async ({
                page
        }) => {
                await addNewExpCard(page);
                const expCardSubtitle = getExpCardSubtitleInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: expCardSubtitle
                });
        });

        test('Explicit card explanation should be resilient to reloads', async ({
                page
        }) => {
                await addNewExpCard(page);
                const expCardExplanation = getExpCardExplanationInp(page);
                await expectInpToBeResilientToReloads({
                        page,
                        input: expCardExplanation
                });
        });

        /* create exp card

        *   resilience title
        - update
        *   resilience subtitle
        - update
        *   resilience explanation
        - update
        *   resilience new option
        - update
        - check num of options
        *   resilience delete option
        -update
        - check num of options
        *   resilience update option
        -update
        - check option content
        *   resilience change option is correct
        - update
        - check option correctness
        *   option --> change state mobile
        -update
        - check option correctness
        * option --> delete option mobile
        -update
        - check num of options
        *  */

        /* delete exp card
         *  */
});
