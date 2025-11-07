import test from '@playwright/test';
import { goToBooksPage } from '../BooksPage/steps';
import {
    EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
    SERIOUS_BOOK_DESCRIPTION
} from '../EditBookPage/constants';
import {
    checkPlayPageToHaveRequiredData,
    goToPlayPage
} from './steps';

test.describe('Set of checks for play page', () => {
        test.beforeEach(goToBooksPage);

        test.only('Expect collection to be created', async ({ page }) => {
                const bookTitle = 'Королівство котиків';
                const bookCards = EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE;
                await goToPlayPage({
                        page,
                        bookTitle,
                        bookDescription: SERIOUS_BOOK_DESCRIPTION,
                        exampleCards: bookCards
                });
                await checkPlayPageToHaveRequiredData({
                        page,
                        requiredBookTitleText: bookTitle,
                        startBookCards: bookCards
                });
        });
});
