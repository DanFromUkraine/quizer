import test, { expect, Page } from '@playwright/test';
import {
        getNewStoryDialogAreAnswersShownImmediatelyParamInp,
        getNewStoryDialogContainer,
        getNewStoryDialogIsSmartModeParamInp,
        getNewStoryDialogSubmitBtn
} from '../BooksPage/selectors';
import {
        addNewBookStep,
        studyBook,
        updateBookWithDataStep
} from '../BooksPage/steps';
import {
        EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE,
        SERIOUS_BOOK_DESCRIPTION
} from '../EditBookPage/constants';
import { typeInTextAndExpectSuccess } from '../helpers';
import { INPUTS_TO_CREATE_NEW_STORY } from './constants';
import { NewStoryDialogNumParamName } from './types';

export async function expectToBeOnPlayPageStep(page: Page) {
        await test.step('Expect to be on the play page', async () => {
                await expect(page).toHaveURL(
                        /* This regex checks if user on play page, and wether storyId argument is not an empty string at least */
                        /^http:\/\/localhost:4005\/play\?storyId=.+$/
                );
        });
}

export async function createStoryForBookWithSuchData({
        page,
        isSmartMode,
        showAnswersImmediately,
        numParams
}: {
        page: Page;
        isSmartMode: boolean;
        showAnswersImmediately: boolean;
        numParams?: {
                propName: NewStoryDialogNumParamName;
                value: number;
        }[];
}) {
        await test.step('Expect new story modal to be visible', async () => {
                const dialog = getNewStoryDialogContainer(page);
                await expect(dialog).toBeVisible();
        });

        if (!isSmartMode) {
                // toggle mode to smart
                const smartModeToggleEl =
                        getNewStoryDialogIsSmartModeParamInp(page);
                await smartModeToggleEl.click();

                if (showAnswersImmediately) {
                        // toggle mode to - Show answers immediately
                        const showAnswersImmediatelyToggleEl =
                                getNewStoryDialogAreAnswersShownImmediatelyParamInp(
                                        page
                                );
                        await showAnswersImmediatelyToggleEl.click();
                }

                if (typeof numParams !== 'undefined') {
                        for (const numP of numParams) {
                                const currProp =
                                        INPUTS_TO_CREATE_NEW_STORY.find(
                                                (p) =>
                                                        p.propName ===
                                                        numP.propName
                                        );

                                if (typeof currProp === 'undefined')
                                        throw new Error(
                                                `Tried to get num param with name ${numP.propName}, but didn't find anything like that `
                                        );

                                await typeInTextAndExpectSuccess(
                                        currProp.getLocator(page),
                                        numP.value.toString()
                                );
                        }
                }
        }

        const submitBtnEl = getNewStoryDialogSubmitBtn(page);
        await submitBtnEl.click();
}

export async function goToPlayPageWithDefaultData(page: Page) {
        await addNewBookStep(page);
        await updateBookWithDataStep({
                page,
                bookTitle: 'Королівство котиків',
                bookDescription: SERIOUS_BOOK_DESCRIPTION,
                bookInd: 0,
                exampleCards: EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE
        });
        await studyBook({ page, bookInd: 0 });
        await createStoryForBookWithSuchData({
                page,
                isSmartMode: true,
                showAnswersImmediately: false
        });
        await expectToBeOnPlayPageStep(page);
}
