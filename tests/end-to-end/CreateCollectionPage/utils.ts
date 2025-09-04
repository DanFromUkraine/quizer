import { Page, Locator } from '@playwright/test';

export async function addCard(page: Page, howManyToAdd: number = 1) {
        const addCardButton = page.getByTestId('add-card');
        for (let i = 0; i < howManyToAdd; i++) {
                await addCardButton.click();
        }
}

export async function addOption(
        questionCard: Locator,
        howManyToAdd: number = 1
) {
        const addOptionButton = questionCard.getByTestId('add-option-btn');
        for (let i = 0; i < howManyToAdd; i++) {
                await addOptionButton.click();
        }
}
