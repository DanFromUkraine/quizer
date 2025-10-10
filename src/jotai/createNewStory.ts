import { atom, Getter } from 'jotai';
import {
        booksAtomFamily,
        explicitCardsAtomFamily,
        optionsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import {
        hideDialogAtom,
        openDialogAtom
} from '@/src/jotai/dialogVisibilityFamily';
import {
        AnyCard,
        PlayExplicitCard,
        PlayIsCorrectCard,
        PlayNormalCard,
        PlayOption,
        PlayTypeInCard
} from '@/src/types/playMode';
import { Story, TermDefinitionCard } from '@/src/types/mainDbGlobal';
import shuffleList from '@/src/utils/fisherYatesShafle';
import getUniqueID from '@/src/utils/getUniqueID';
import { updateStoryIdb } from '@/src/utils/idb/main/actions';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/mainDbUtils';

interface StorySettings {
        isSmartMode: boolean;
        maxNumOfExplicitCards: number;
        maxNumOfNormalCards: number;
        maxNumOfTypeInCards: number;
        maxNumOfIsCorrectCards: number;
        numOfExplicitCards: number;
        numOfNormalCards: number;
        numOfTypeInCards: number;
        numOfIsCorrectCards: number;
        bookId: string;
}

const EMPTY_STORY_SETTINGS_ATOM: StorySettings = {
        isSmartMode: false,
        maxNumOfExplicitCards: 0,
        maxNumOfNormalCards: 0,
        maxNumOfTypeInCards: 0,
        maxNumOfIsCorrectCards: 0,
        numOfExplicitCards: 0,
        numOfNormalCards: 0,
        numOfTypeInCards: 0,
        numOfIsCorrectCards: 0,
        bookId: ""
};

export const newStorySettingsAtom = atom<StorySettings>(
        EMPTY_STORY_SETTINGS_ATOM
);

function getNumOfAllExplicitCardOptionsInBook({
        get,
        explicitCardIds
}: {
        get: Getter;
        explicitCardIds: string[];
}) {
        let numOfOptions = 0;

        for (const cardId of explicitCardIds) {
                const { childrenIds } = get(explicitCardsAtomFamily(cardId));
                numOfOptions += childrenIds.length;
        }

        return numOfOptions;
}

export const openNewStorySettingsDialogAtom = atom(
        null,
        (get, set, bookId: string) => {
                set(setNewStorySettingsAtomToDefaultAtom, bookId);
                set(openDialogAtom, 'newStoryParams');
        }
);

export const closeNewStorySettingsDialogAtom = atom(null, (get, set) => {
        set(newStorySettingsAtom, EMPTY_STORY_SETTINGS_ATOM);
        set(hideDialogAtom, 'newStoryParams');
});

const setNewStorySettingsAtomToDefaultAtom = atom(
        null,
        (get, set, bookId: string) => {
                const { shortCardIds, explicitCardIds } = get(
                        booksAtomFamily(bookId)
                );

                const numOfExplicitCardOptions =
                        getNumOfAllExplicitCardOptionsInBook({
                                get,
                                explicitCardIds
                        });

                const maxNumOfNormalCards = Math.floor(
                        (numOfExplicitCardOptions + shortCardIds.length) / 4
                );

                const numOfTypeInCards = Math.floor(
                        (shortCardIds.length - maxNumOfNormalCards) / 2
                );
                const numOfIsCorrectCards = Math.floor(
                        (shortCardIds.length - maxNumOfNormalCards) / 2
                );
                const numOfAllCards =
                        explicitCardIds.length + shortCardIds.length;

                set(newStorySettingsAtom, {
                        isSmartMode: true,
                        maxNumOfExplicitCards: explicitCardIds.length,
                        maxNumOfNormalCards,
                        maxNumOfTypeInCards: numOfAllCards,
                        maxNumOfIsCorrectCards: numOfAllCards,
                        numOfExplicitCards: explicitCardIds.length,
                        numOfNormalCards: maxNumOfNormalCards,
                        numOfTypeInCards,
                        numOfIsCorrectCards,
                        bookId
                });
        }
);

export function getOption({
        get,
        optionId
}: {
        get: Getter;
        optionId: string;
}): PlayOption {
        const { optionTitle, isCorrect, id } = get(optionsAtomFamily(optionId));
        return { title: optionTitle, isCorrect, id };
}

export function getExplicitCard({
        get,
        cardId
}: {
        get: Getter;
        cardId: string;
}): PlayExplicitCard {
        const { cardTitle, explanation, childrenIds, subtitle } = get(
                explicitCardsAtomFamily(cardId)
        );

        return {
                type: 'play-explicit',
                title: cardTitle,
                subtitle,
                explanation,
                options: childrenIds.map((optionId) =>
                        getOption({ get, optionId })
                )
        };
}

export function getAllExplicitCards({
        get,
        explicitCardIds
}: {
        get: Getter;
        explicitCardIds: string[];
}) {
        return explicitCardIds.map((cardId) =>
                getExplicitCard({ get, cardId })
        );
}

export function getAllShortCards({
        get,
        shortCardIds
}: {
        get: Getter;
        shortCardIds: string[];
}): TermDefinitionCard[] {
        return shortCardIds.map((cardId) => get(shortCardsAtomFamily(cardId)));
}

function getOptionsHeap({
        playExplicitCards,
        shortCards
}: {
        playExplicitCards: PlayExplicitCard[];
        shortCards: TermDefinitionCard[];
}) {
        const optionsFromExpCards = playExplicitCards.flatMap(({ options }) => {
                return options.map((opt) => opt.title);
        });
        const optionsFromShortCards = shortCards.map(
                ({ definition }) => definition
        );

        return [...optionsFromExpCards, ...optionsFromShortCards];
}

function fiftyFifty() {
        return Math.random() < 0.5;
}

function getRandomItem<T>(array: T[]) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
}

function getCorrectOptionFromExplicitCard(explicitCard: PlayExplicitCard) {
        const correctOption = explicitCard.options.find(
                (option) => option.isCorrect
        );
        if (!correctOption)
                throw new Error('No correct option in an explicit card');
        return correctOption;
}

function getCorrectCard({ t, d }: { t: string; d: string }): PlayIsCorrectCard {
        return {
                type: 'play-isCorrect',
                isCorrect: true,
                term: t,
                definition: d
        };
}

function getRandomItemsFromList<T>(list: T[], n: number) {
        const shuffledList = shuffleList(list);
        return shuffledList.slice(0, n);
}

function getIncorrectCard({
        t,
        d
}: {
        t: string;
        d: string;
}): PlayIsCorrectCard {
        return {
                type: 'play-isCorrect',
                isCorrect: false,
                term: t,
                definition: d
        };
}

function getCardsForAlgorithm({
        requiredNum,
        shortCards,
        playExplicitCards
}: {
        requiredNum: number;
        shortCards: TermDefinitionCard[];
        playExplicitCards: PlayExplicitCard[];
}): [TermDefinitionCard[], PlayExplicitCard[]] {
        const shortCardsNeeded = Math.min(requiredNum, shortCards.length);
        const shortCardsForAlgo = getRandomItemsFromList(
                shortCards,
                shortCardsNeeded
        );

        const explicitNeeded = Math.max(0, requiredNum - shortCards.length);
        const explicitCardsForAlgo =
                explicitNeeded > 0
                        ? getRandomItemsFromList(
                                  playExplicitCards,
                                  Math.min(
                                          explicitNeeded,
                                          playExplicitCards.length
                                  )
                          )
                        : [];

        return [shortCardsForAlgo, explicitCardsForAlgo];
}

function getRandomOptAvoidingCurr({
        allOptions,
        targetOpt
}: {
        allOptions: string[];
        targetOpt: string;
}) {
        const anArrayWithoutCurrentDefinition = allOptions.filter(
                (currOpt) => currOpt !== targetOpt
        );
        return getRandomItem(anArrayWithoutCurrentDefinition);
}

export function getIsCorrectCards({
        requiredNum,
        playExplicitCards,
        shortCards,
        allOptions
}: {
        requiredNum: number;
        playExplicitCards: PlayExplicitCard[];
        shortCards: TermDefinitionCard[];
        allOptions: string[];
}) {
        const isCorrectCards: PlayIsCorrectCard[] = [];
        const [shortCardsForAlgo, explicitCardsForAlgo] = getCardsForAlgorithm({
                requiredNum,
                playExplicitCards,
                shortCards
        });

        shortCardsForAlgo.forEach(({ term, definition }) => {
                const isCorrect = fiftyFifty();
                if (isCorrect) {
                        isCorrectCards.push(
                                getCorrectCard({ t: term, d: definition })
                        );
                } else {
                        isCorrectCards.push({
                                type: 'play-isCorrect',
                                isCorrect: false,
                                term,
                                definition: getRandomOptAvoidingCurr({
                                        allOptions,
                                        targetOpt: definition
                                })
                        });
                }
        });

        explicitCardsForAlgo.forEach((explicitCard) => {
                const isCorrect = fiftyFifty();
                const correctOption =
                        getCorrectOptionFromExplicitCard(explicitCard);
                if (isCorrect) {
                        isCorrectCards.push(
                                getCorrectCard({
                                        t: explicitCard.title,
                                        d: correctOption.title
                                })
                        );
                } else {
                        isCorrectCards.push(
                                getIncorrectCard({
                                        t: explicitCard.title,
                                        d: getRandomOptAvoidingCurr({
                                                allOptions,
                                                targetOpt: correctOption.title
                                        })
                                })
                        );
                }
        });

        return isCorrectCards;
}

export function getTypeInCards({
        requiredNum,
        playExplicitCards,
        shortCards
}: {
        requiredNum: number;
        playExplicitCards: PlayExplicitCard[];
        shortCards: TermDefinitionCard[];
}) {
        const [shortCardsForAlgo, explicitCardsForAlgo] = getCardsForAlgorithm({
                playExplicitCards,
                requiredNum,
                shortCards
        });
        const typeInCardsResult: PlayTypeInCard[] = [];

        shortCardsForAlgo.forEach(({ term, definition }) => {
                typeInCardsResult.push({
                        type: 'play-typeIn',
                        definition,
                        expectedInput: term
                });
        });

        explicitCardsForAlgo.forEach((explicitCard) => {
                typeInCardsResult.push({
                        type: 'play-typeIn',
                        definition: explicitCard.title,
                        expectedInput:
                                getCorrectOptionFromExplicitCard(explicitCard)
                                        .title
                });
        });

        return typeInCardsResult;
}

export function getNormalCards({
        requiredNum,
        shortCards,
        allOptions
}: {
        requiredNum: number;
        shortCards: TermDefinitionCard[];
        allOptions: string[];
}): PlayNormalCard[] {
        const shortCardsForAlgo = getRandomItemsFromList(
                shortCards,
                requiredNum
        );

        return shortCardsForAlgo.map(({ term, definition, id }) => {
                const options: PlayOption[] = Array(4);
                const corrOptInd = Math.floor(Math.random() * 4);
                options[corrOptInd] = {
                        id,
                        isCorrect: true,
                        title: definition
                };
                for (let i = 0; i < options.length; i++) {
                        if (i === corrOptInd) continue;
                        const randomOption = getRandomOptAvoidingCurr({
                                allOptions,
                                targetOpt: definition
                        });
                        options[i] = {
                                isCorrect: false,
                                title: randomOption,
                                id: getUniqueID()
                        };
                }
                return {
                        type: 'play-normal',
                        title: term,
                        options
                };
        });
}

export function getCardsOfAllTypes({
        nOfTypeInCards,
        nOfIsCorrectCards,
        nOfNormalCards,
        nOfExplicitCards,
        allShortCards,
        allPlayExplicitCards,
        optionsHeap
}: {
        nOfTypeInCards: number;
        nOfIsCorrectCards: number;
        nOfExplicitCards: number;
        nOfNormalCards: number;
        allShortCards: TermDefinitionCard[];
        allPlayExplicitCards: PlayExplicitCard[];
        optionsHeap: string[];
}) {
        const normalCards = getNormalCards({
                requiredNum: nOfNormalCards,
                shortCards: allShortCards,
                allOptions: optionsHeap
        });

        const typeInCards = getTypeInCards({
                requiredNum: nOfTypeInCards,
                shortCards: allShortCards,
                playExplicitCards: allPlayExplicitCards
        });

        const isCorrectCards = getIsCorrectCards({
                requiredNum: nOfIsCorrectCards,
                playExplicitCards: allPlayExplicitCards,
                allOptions: optionsHeap,
                shortCards: allShortCards
        });

        const explicitCards = allPlayExplicitCards.slice(0, nOfExplicitCards);

        return [
                ...normalCards,
                ...typeInCards,
                ...isCorrectCards,
                ...explicitCards
        ];
}

export function getCardsForStory({
        isSmartMode,
        numOfExplicitCards,
        numOfNormalCards,
        numOfTypeInCards,
        numOfIsCorrectCards,
        get,
        bookId
}: {
        isSmartMode: boolean;
        numOfExplicitCards: number;
        numOfNormalCards: number;
        numOfTypeInCards: number;
        numOfIsCorrectCards: number;
        bookId: string;
        get: Getter;
}) {
        const { explicitCardIds, shortCardIds } = get(booksAtomFamily(bookId));
        const resultArray: AnyCard[] = [];

        const allPlayExplicitCards = getAllExplicitCards({
                get,
                explicitCardIds
        });

        const allShortCards = getAllShortCards({
                get,
                shortCardIds
        });

        const optionsHeap = getOptionsHeap({
                playExplicitCards: allPlayExplicitCards,
                shortCards: allShortCards
        });

        if (isSmartMode) {
                let calculatedNumOfNormalCards = Math.floor(
                        optionsHeap.length / 4
                );
                let calculatedNumOfTypeInCards =
                        Math.floor(explicitCardIds.length / 2) +
                        Math.floor(shortCardIds.length / 2);
                let calculatedNumOfIsCorrectCards =
                        Math.floor(explicitCardIds.length / 2) +
                        Math.floor(shortCardIds.length / 2);

                resultArray.push(
                        ...getCardsOfAllTypes({
                                nOfExplicitCards: explicitCardIds.length,
                                nOfNormalCards: calculatedNumOfNormalCards,
                                nOfIsCorrectCards:
                                        calculatedNumOfIsCorrectCards,
                                nOfTypeInCards: calculatedNumOfTypeInCards,
                                optionsHeap,
                                allShortCards,
                                allPlayExplicitCards
                        })
                );
        } else {
                resultArray.push(
                        ...getCardsOfAllTypes({
                                nOfExplicitCards: numOfExplicitCards,
                                nOfNormalCards: numOfNormalCards,
                                nOfTypeInCards: numOfTypeInCards,
                                nOfIsCorrectCards: numOfIsCorrectCards,
                                optionsHeap,
                                allShortCards,
                                allPlayExplicitCards
                        })
                );
        }

        return shuffleList(resultArray);
}

export const addNewStory = getDerivedAtomWithIdb(
        async (
                get,
                set,
                mainDb,
                {
                        settings,
                        bookId,
                        successCallback
                }: {
                        settings: StorySettings;
                        bookId: string;
                        successCallback: (storyId: string) => void;
                }
        ) => {
                const { bookTitle, description } = get(booksAtomFamily(bookId));
                const allCards = getCardsForStory({ ...settings, bookId, get });
                const newStoryId = getUniqueID();
                const newStory: Story = {
                        id: newStoryId,
                        isCompleted: false,
                        timeSpentSec: 0,
                        playStartDate: 0,
                        choicePointers: new Array(allCards.length),
                        bookId,
                        bookData: {
                                title: bookTitle,
                                description,
                                creationDate: Date.now(),
                                cards: allCards
                        }
                };
                await updateStoryIdb(mainDb, newStory);
                successCallback(newStoryId);
        }
);
