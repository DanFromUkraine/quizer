import test from '@playwright/test';
import { goToBooksPage } from '../BooksPage/steps';
import {
    EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
    SERIOUS_BOOK_DESCRIPTION
} from '../EditBookPage/constants';
import {
    checkExplicitCardResilient,
    checkIsCorrectCardResilient,
    checkPlayPageToHaveRequiredData,
    checkTypeInCardResilient,
    goToPlayPage
} from './steps';

test.describe('Set of checks for play page', () => {
        test.beforeEach(goToBooksPage);

        test('Expect collection to be creatable and data appropriate', async ({
                page
        }) => {
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

        test('All elements should be resilient to updates', async ({
                page
        }) => {
                const bookTitle = 'The kingdom of cats';
                const bookCards = EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE;

                await goToPlayPage({
                        page,
                        bookTitle,
                        bookDescription: SERIOUS_BOOK_DESCRIPTION,
                        exampleCards: bookCards
                });

                await test.step('IsCorrect card: resilient to reloads', async () => {
                        await checkIsCorrectCardResilient(page, {
                                cardIndex: 0,
                                reloads: 2
                        });
                });

                await test.step('TypeIn card: resilient to reloads', async () => {
                        await checkTypeInCardResilient(page, { cardIndex: 0 });
                });

                await test.step('Explicit card: resilient to reloads', async () => {
                        await checkExplicitCardResilient(page, {
                                cardIndex: 0,
                                optionIndex: 0,
                                reloads: 2
                        });
                });
        });
});
