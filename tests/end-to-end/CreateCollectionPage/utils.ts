import { Locator, Page } from '@playwright/test';

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

export function getQuestionCard(page: Page) {
        return page.locator('.questionCard');
}

export async function getAllQuestionCards(page: Page) {
        return await page.locator('.questionCard').all();
}

export function getQuestionCardTitle(questionCard: Locator) {
        return questionCard.getByTestId('questionTitle');
}

export function getQuestionCardOption(questionCard: Locator) {
        return questionCard.getByTestId('container-option');
}

export async function getAllQuestionCardOptions(questionCard: Locator) {
        return await questionCard.getByTestId('container-option').all();
}

export function getOptionTextField(option: Locator) {
        return option.getByRole('textbox');
}

export function getOptionTickBtn(option: Locator) {
        return option.getByRole('checkbox');
}

export function getOptionDeleteBtn(option: Locator) {
        return option.getByTestId('option-remove-btn');
}

export function getQuestionCardDeleteBtn(questionCard: Locator) {
        return questionCard.getByTestId('remove-card-btn');
}

export function getCollectionTitle(page: Page) {
        return page.getByTestId('collection-title-input');
}
