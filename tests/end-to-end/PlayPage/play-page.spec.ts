import test from '@playwright/test';
import { goToBooksPage } from '../BooksPage/steps';
import { goToPlayPageWithDefaultData } from './steps';

test.describe('Set of checks for play page', () => {
        test.beforeEach(goToBooksPage);

        test.only('Expect collection to be created', async ({ page }) => {
                await goToPlayPageWithDefaultData(page);
                
        });
});
