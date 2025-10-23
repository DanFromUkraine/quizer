import test from '@playwright/test';

test.describe('Set of checks for edit book page', () => {
        test.beforeEach('Create empty book and go to edit page of it', async({page}) => {
                await page.goto('/');

        });

        
});


