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
import {
        clearFromOddSymbols,
        expectInpToBeResilientToReloads,
        multiPageReloadStep,
        nullCheck,
        typeInTextAndExpectSuccess,
        undefinedCheck
} from '../helpers';
import { INPUTS_TO_CREATE_NEW_STORY } from './constants';
import {
        getAllCards,
        getBookTitleHeading,
        getExpCardCont,
        getExpCardExplanationPar,
        getExpCardOptionContPP,
        getExpCardOptionTitlePP,
        getExpCardSubtitleHeading,
        getExpCardTitleHeading,
        getIsCorrectCardCont,
        getIsCorrectCardDefinition,
        getIsCorrectCardFalseBtn,
        getIsCorrectCardTerm,
        getIsCorrectCardTrueBtn,
        getTypeInCardCont,
        getTypeInCardDefHeading,
        getTypeInCardTermInp
} from './selectors';
import {
        AnyPlayTestCard,
        NewStoryDialogNumParamName,
        PlayTestExpCard,
        PlayTestIsCorrectCard,
        PlayTestTypeInCard
} from './types';
import { getCorrectOptionFromOptions } from '@/src/utils/createNewStory/helpers';

export async function expectToBeOnPlayPageStep(page: Page) {
        await test.step('Expect to be on the play page', async () => {
                await expect(page).toHaveURL(
                        /* This regex checks if user on play page, and wether storyId argument is not an empty string at least */
                        /^http:\/\/localhost:4005\/play\?storyId=.+$/
                );
        });
}

export async function getCardType(card: Locator) {
        const cardType = await card.getAttribute('data-testid');

        if (cardType === PP_TEST_IDS.expCard.me) {
                return 'explicit';
        } else if (cardType === PP_TEST_IDS.typeInCard.me) {
                return 'typeIn';
        } else if (cardType === PP_TEST_IDS.isCorrectCard.me) {
                return 'isCorrect';
        } else {
                throw new Error(
                        'Current card is of unknown type. You should check it'
                );
        }
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

export async function getDataFromExpCardUI(
        expCardEl: Locator
): Promise<PlayTestExpCard> {
        const titleEl = getExpCardTitleHeading(expCardEl);
        const titleText = await titleEl.textContent();
        nullCheck(titleText, 'exp card title text');

        const subtitleEl = getExpCardSubtitleHeading(expCardEl);
        const isSubtitleVisible = await subtitleEl.isVisible();
        const subtitleText = isSubtitleVisible
                ? await subtitleEl.textContent()
                : null;

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
                title: clearFromOddSymbols(titleText),
                subtitle: subtitleText,
                options: resultOptions,
                explanation: explanationText
        };
}

export async function getDataFromTypeInCardUI(
        typeInCardEl: Locator
): Promise<PlayTestTypeInCard> {
        const definitionHeadingEl = getTypeInCardDefHeading(typeInCardEl);
        const definitionText = await definitionHeadingEl.textContent();
        nullCheck(definitionText, 'typein card definition text');

        return {
                type: 'typein',
                definition: clearFromOddSymbols(definitionText)
        };
}

export async function getDataFromIsCorrectCardUI(
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
                term: clearFromOddSymbols(termText),
                definition: clearFromOddSymbols(definitionText)
        };
}

export async function getCardsFromUI(page: Page): Promise<AnyPlayTestCard[]> {
        const cardEls = getAllCards(page);
        const cardsCount = await cardEls.count();
        const result: AnyPlayTestCard[] = [];
        for (let i = 0; i < cardsCount; i++) {
                const unknownCard = cardEls.nth(i);
                const cardType = await getCardType(unknownCard);

                if (cardType === 'explicit') {
                        result.push(await getDataFromExpCardUI(unknownCard));
                        continue;
                } else if (cardType === 'typeIn') {
                        result.push(await getDataFromTypeInCardUI(unknownCard));
                        continue;
                } else if (cardType === 'isCorrect') {
                        result.push(
                                await getDataFromIsCorrectCardUI(unknownCard)
                        );
                        continue;
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
        console.debug({ startList, newExpCard });

        const cardWhereSuchName = startList.find((c) => {
                if (c.type === 'explicit') {
                        return newExpCard.title === c.title;
                } else {
                        return newExpCard.title === c.term;
                }
        });

        undefinedCheck(cardWhereSuchName, 'Exp card');

        const checkRegex = new RegExp(
                cardWhereSuchName.type === 'explicit'
                        ? cardWhereSuchName.title
                        : cardWhereSuchName.term
        );
        expect(newExpCard.title).toMatch(checkRegex);
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

        console.debug({ cardsWhereSuchName, newTypeInCard, startList });

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
                // As I remember from the code that generates these isCorrect cards it all goes around a term field. And definition in this case is just taken from all options heap
                if (card.type === 'explicit') {
                        return card.title === newIsCorrectCard.term;
                } else {
                        return card.term === newIsCorrectCard.term;
                }
        });

        // There should be no duplication as I know the data in the constants. In real life it can be, but in tests - no
        console.debug({ cardsWhereSuchName, startList, newIsCorrectCard });
        expect(cardsWhereSuchName).not.toHaveLength(0);
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

export async function checkIsCorrectCardResilient(
        page: Page,
        opts: { cardIndex?: number; reloads?: number } = {}
) {
        const { cardIndex = 0, reloads = 2 } = opts;
        const isCorrectCardContEl: Locator =
                getIsCorrectCardCont(page).nth(cardIndex);
        const trueBtnEl: Locator = getIsCorrectCardTrueBtn(isCorrectCardContEl);

        await test.step('Select IsCorrect -> true', async () => {
                await trueBtnEl.click();
        });

        await multiPageReloadStep({ page, timesNum: reloads });

        await test.step('Assert IsCorrect selection persisted', async () => {
                await expect(trueBtnEl).toHaveAttribute(
                        'data-selected',
                        'true'
                );
        });
}

export async function checkTypeInCardResilient(
        page: Page,
        opts: { cardIndex?: number; reloads?: number } = {}
) {
        const { cardIndex = 0 } = opts;
        const typeInCardContEl: Locator =
                getTypeInCardCont(page).nth(cardIndex);
        const inputEl: Locator = getTypeInCardTermInp(typeInCardContEl);

        // reuse existing logic if present in project
        await expectInpToBeResilientToReloads({ page, input: inputEl });
}

export async function checkExplicitCardResilient(
        page: Page,
        opts: {
                cardIndex?: number;
                optionIndex?: number;
                reloads?: number;
        } = {}
) {
        const { cardIndex = 0, optionIndex = 0, reloads = 2 } = opts;
        const expCardContEl: Locator = getExpCardCont(page).nth(cardIndex);
        const optionEl: Locator =
                getExpCardOptionContPP(expCardContEl).nth(optionIndex);

        await test.step('Select explicit option', async () => {
                await optionEl.click();
        });

        await multiPageReloadStep({ page, timesNum: reloads });

        await test.step('Assert explicit option persisted', async () => {
                await expect(optionEl).toHaveAttribute('data-selected', 'true');
        });
}

export async function answerExplicitCard({
        currCardData,
        currCardEl,
        bookCards,
        makeCorrect
}: {
        currCardData: PlayTestExpCard;
        currCardEl: Locator;
        bookCards: MixedCard[];
        makeCorrect: boolean;
}) {
        const cardFromBook = bookCards.find((c) => {
                if (c.type === 'explicit') {
                        return (
                                c.title ===
                                currCardData.title.replaceAll(/'/g, '')
                        );
                } else if (c.type === 'short') {
                        return (
                                c.term ===
                                currCardData.title.replaceAll(/'/g, '')
                        );
                }
        });

        undefinedCheck(cardFromBook, 'explicit card from ex');

        const optionsToSelect: string[] = [];

        if (cardFromBook.type === 'explicit') {
                optionsToSelect.push(
                        ...cardFromBook.options
                                .filter((o) =>
                                        makeCorrect ? o.isCorrect : !o.isCorrect
                                )
                                .map((o) => o.optionTitle)
                );
        } else if (cardFromBook.type === 'short') {
                if (makeCorrect) {
                        optionsToSelect.push(cardFromBook.definition);
                } else {
                        optionsToSelect.push(
                                ...currCardData.options.filter(
                                        (o) => o !== cardFromBook.definition
                                )
                        );
                }
        }

        for (const optionTitle of optionsToSelect) {
                const option =
                        getExpCardOptionTitlePP(currCardEl).getByText(
                                optionTitle
                        );
                await option.click();
        }
}

export async function answerTypeInCard({
        currCardData,
        currCardEl,
        bookCards,
        makeCorrect
}: {
        currCardData: PlayTestTypeInCard;
        currCardEl: Locator;
        bookCards: MixedCard[];
        makeCorrect: boolean;
}) {
        const targetCard = bookCards.find((c) => {
                if (c.type === 'explicit') {
                        return (
                                typeof c.options.find(
                                        (o) =>
                                                o.optionTitle ===
                                                currCardData.definition.replaceAll(
                                                        /'/g,
                                                        ''
                                                )
                                ) !== 'undefined'
                        );
                } else if (c.type === 'short') {
                        return (
                                c.definition ===
                                currCardData.definition.replaceAll(/'/g, '')
                        );
                }
        });

        undefinedCheck(targetCard, 'TypeIn card from ex');

        const correctTerm =
                targetCard.type === 'explicit'
                        ? targetCard.title
                        : targetCard.term;
        const termToType = makeCorrect
                ? correctTerm
                : `${correctTerm}__wrong__${Math.random().toString(36).slice(2, 6)}`;

        const termInpEl = getTypeInCardTermInp(currCardEl);
        if (makeCorrect && typeof typeInTextAndExpectSuccess === 'function') {
                await typeInTextAndExpectSuccess(termInpEl, termToType);
        } else {
                await termInpEl.fill(termToType);
                await termInpEl.press?.('Enter');
        }
}

export async function answerIsCorrectCard({
        currCardData,
        currCardEl,
        bookCards,
        makeCorrect
}: {
        currCardData: PlayTestIsCorrectCard;
        currCardEl: Locator;
        bookCards: MixedCard[];
        makeCorrect: boolean;
}) {
        const targetCard = bookCards.find((c) => {
                if (c.type === 'explicit') {
                        return (
                                c.title.replaceAll(' ', '') ===
                                currCardData.term
                                        .replaceAll(/'/g, '')
                                        .replaceAll(/-/g, '')
                                        .replaceAll(' ', '')
                        );
                } else if (c.type === 'short') {
                        return (
                                c.term.replaceAll(' ', '') ===
                                currCardData.term
                                        .replaceAll(/'/g, '')
                                        .replaceAll(/-/g, '')
                                        .replaceAll(' ', '')
                        );
                }
        });

        undefinedCheck(targetCard, 'IsCorrect card from ex');

        const correctDefinition =
                targetCard.type === 'explicit'
                        ? getCorrectOptionFromOptions(targetCard.options)
                                  .optionTitle
                        : targetCard.definition;

        const actualIsCorrect = currCardData.definition === correctDefinition;

        const shouldPressTrue = makeCorrect
                ? actualIsCorrect
                : !actualIsCorrect;

        if (shouldPressTrue) {
                const trueBtn = getIsCorrectCardTrueBtn(currCardEl);
                await trueBtn.click();
        } else {
                const falseBtn = getIsCorrectCardFalseBtn(currCardEl);
                await falseBtn.click();
        }
}

export async function answerAllCards(
        page: Page,
        bookCards: MixedCard[],
        makeCorrect: boolean
) {
        await expect(getAllCards(page)).not.toHaveCount(0);
        const allCards = await getCardsFromUI(page);
        const uiCardsCount = allCards.length;

        console.debug({ allCards, uiCardsCount });

        expect(uiCardsCount).toBeGreaterThan(0);

        for (let i = 0; i < uiCardsCount; i++) {
                const currCardData = allCards[i];
                const currCardEl = getAllCards(page).nth(i);

                if (currCardData.type === 'explicit') {
                        await answerExplicitCard({
                                currCardEl,
                                bookCards,
                                makeCorrect,
                                currCardData
                        });
                } else if (currCardData.type === 'typein') {
                        await answerTypeInCard({
                                currCardEl,
                                bookCards,
                                makeCorrect,
                                currCardData
                        });
                } else if (currCardData.type === 'iscorrect') {
                        await answerIsCorrectCard({
                                currCardEl,
                                bookCards,
                                makeCorrect,
                                currCardData
                        });
                } else {
                        throw new Error(`Unknown card type`);
                }
        }
}
