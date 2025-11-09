import { PP_TEST_IDS } from '@/src/constants/testIds';
import test, { expect, Locator, Page } from '@playwright/test';
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
import { MixedCard } from '../EditBookPage/types';
import { nullCheck, typeInTextAndExpectSuccess } from '../helpers';
import { INPUTS_TO_CREATE_NEW_STORY } from './constants';
import {
        getAllCards,
        getBookTitleHeading,
        getExpCardExplanationPar,
        getExpCardOptionTitlePP,
        getExpCardSubtitleHeading,
        getExpCardTitleHeading,
        getIsCorrectCardDefinition,
        getIsCorrectCardTerm,
        getTypeInCardDefHeading
} from './selectors';
import {
        AnyPlayTestCard,
        NewStoryDialogNumParamName,
        PlayTestExpCard,
        PlayTestIsCorrectCard,
        PlayTestTypeInCard
} from './types';

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

export async function goToPlayPage({
        page,
        bookTitle,
        bookDescription,
        exampleCards
}: {
        page: Page;
        bookTitle: string;
        bookDescription: string;
        exampleCards: MixedCard[];
}) {
        await addNewBookStep(page);
        await updateBookWithDataStep({
                page,
                bookTitle,
                bookDescription,
                bookInd: 0,
                exampleCards
        });
        await studyBook({ page, bookInd: 0 });
        await createStoryForBookWithSuchData({
                page,
                isSmartMode: true,
                showAnswersImmediately: false
        });
        await expectToBeOnPlayPageStep(page);
}

async function getDataFromExpCardUI(
        expCardEl: Locator
): Promise<PlayTestExpCard> {
        const titleEl = getExpCardTitleHeading(expCardEl);
        const titleText = await titleEl.textContent();
        nullCheck(titleText, 'exp card title text');

        const subtitleEl = getExpCardSubtitleHeading(expCardEl);
        const subtitleText = await subtitleEl.textContent();
        nullCheck(subtitleText, 'exp card subtitle text');

        const explanation = getExpCardExplanationPar(expCardEl);
        const isExplanationVisible = await explanation.isVisible();
        const explanationText = isExplanationVisible
                ? await explanation.textContent()
                : null;

        const optionEls = getExpCardOptionTitlePP(expCardEl);
        const optsCount = await optionEls.count();
        const resultOptions: string[] = [];

        for (let i = 0; i < optsCount; i++) {
                const optTitleEl = optionEls.nth(i);
                const optText = await optTitleEl.textContent();
                nullCheck(optText, 'exp card option text');
                resultOptions.push(optText);
        }

        return {
                type: 'explicit',
                title: titleText,
                subtitle: subtitleText,
                options: resultOptions,
                explanation: explanationText
        };
}

async function getDataFromTypeInCardUI(
        typeInCardEl: Locator
): Promise<PlayTestTypeInCard> {
        const definitionHeadingEl = getTypeInCardDefHeading(typeInCardEl);
        const definitionText = await definitionHeadingEl.textContent();
        nullCheck(definitionText, 'typein card definition text');

        return {
                type: 'typein',
                definition: definitionText
        };
}

async function getDataFromIsCorrectCardUI(
        isCorrectCardEl: Locator
): Promise<PlayTestIsCorrectCard> {
        const termEl = getIsCorrectCardTerm(isCorrectCardEl);
        const termText = await termEl.textContent();
        nullCheck(termText, 'iscorrect card term text');

        const definitionEl = getIsCorrectCardDefinition(isCorrectCardEl);
        const definitionText = await definitionEl.textContent();
        nullCheck(definitionText, 'iscorrect card definition text');

        return {
                type: 'iscorrect',
                term: termText,
                definition: definitionText
        };
}

export async function getCardsFromUI(page: Page): Promise<AnyPlayTestCard[]> {
        const cardEls = getAllCards(page);
        const cardsCount = await cardEls.count();
        const result: AnyPlayTestCard[] = [];
        for (let i = 0; i < cardsCount; i++) {
                const unknownCard = cardEls.nth(i);
                const cardType = await unknownCard.getAttribute('data-testid');

                if (cardType === PP_TEST_IDS.expCard.me) {
                        result.push(await getDataFromExpCardUI(unknownCard));
                        continue;
                } else if (cardType === PP_TEST_IDS.typeInCard.me) {
                        result.push(await getDataFromTypeInCardUI(unknownCard));
                        continue;
                } else if (cardType === PP_TEST_IDS.isCorrectCard.me) {
                        result.push(
                                await getDataFromIsCorrectCardUI(unknownCard)
                        );
                        continue;
                } else {
                        throw new Error(
                                'Current card is of unknown type. You should check it'
                        );
                }
        }

        return result;
}

function comparePlayExpCardWithOrig({
        startList,
        newExpCard
}: {
        startList: MixedCard[];
        newExpCard: PlayTestExpCard;
}) {
        const cardsWhereSuchName = startList.filter((c) => {
                if (c.type === 'explicit') {
                        return newExpCard.title === c.title;
                } else {
                        return newExpCard.title === c.term;
                }
        });

        // There should be no duplication as I know the data in the constants. In real life it can be, but in tests - no
        expect(cardsWhereSuchName).toHaveLength(1);
}

function comparePlayTypeInCardWithOrig({
        startList,
        newTypeInCard
}: {
        startList: MixedCard[];
        newTypeInCard: PlayTestTypeInCard;
}) {
        const cardsWhereSuchName = startList.filter((card) => {
                if (card.type === 'explicit') {
                        return card.options.some(
                                (opt) =>
                                        opt.optionTitle ===
                                        newTypeInCard.definition
                        );
                } else {
                        return newTypeInCard.definition === card.definition;
                }
        });

        // There should be no duplication as I know the data in the constants. In real life it can be, but in tests - no
        expect(cardsWhereSuchName).toHaveLength(1);
}

function comparePlayIsCorrectCardWithOrig({
        startList,
        newIsCorrectCard
}: {
        startList: MixedCard[];
        newIsCorrectCard: PlayTestIsCorrectCard;
}) {
        const cardsWhereSuchName = startList.filter((card) => {
                // As I remember from the code that generates these isCorrect cards it all goes around term field. And definition in this case is just taken from all options heap
                if (card.type === 'explicit') {
                        return card.title === newIsCorrectCard.term;
                } else {
                        return card.term === newIsCorrectCard.term;
                }
        });

        // There should be no duplication as I know the data in the constants. In real life it can be, but in tests - no
        expect(cardsWhereSuchName).toHaveLength(1);
}

export async function checkPlayPageToHaveRequiredData({
        page,
        requiredBookTitleText,
        startBookCards
}: {
        page: Page;
        requiredBookTitleText: string;
        startBookCards: MixedCard[];
}) {
        await test.step('Check title', async () => {
                const bookTitleEl = getBookTitleHeading(page);
                const simpleRegex = new RegExp(requiredBookTitleText);
                await expect(bookTitleEl).toHaveText(simpleRegex);
        });

        await test.step('Check cards', async () => {
                const cards = await getCardsFromUI(page);
                for (const card of cards) {
                        if (card.type === 'explicit') {
                                comparePlayExpCardWithOrig({
                                        startList: startBookCards,
                                        newExpCard: card
                                });
                        } else if (card.type === 'typein') {
                                comparePlayTypeInCardWithOrig({
                                        startList: startBookCards,
                                        newTypeInCard: card
                                });
                        } else if (card.type === 'iscorrect') {
                                comparePlayIsCorrectCardWithOrig({
                                        startList: startBookCards,
                                        newIsCorrectCard: card
                                });
                        }
                }
        });
}
