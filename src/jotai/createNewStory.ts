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
        PlayExplicitCard,
        PlayIsCorrectCard,
        PlayOption
} from '@/src/types/playMode';
import { TermDefinitionCard } from '@/src/types/mainDbGlobal';

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
        numOfIsCorrectCards: 0
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
                        numOfIsCorrectCards
                });
        }
);

export function getOption({
        get,
        optionId,
        cardId
}: {
        get: Getter;
        optionId: string;
        cardId: string;
}): PlayOption {
        const { optionTitle, isCorrect, id } = get(optionsAtomFamily(optionId));
        return { title: optionTitle, isCorrect, id, relatedCardId: cardId };
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
                        getOption({ get, optionId, cardId })
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

export function getOptionsHeap(playExplicitCards: PlayExplicitCard[]) {
        return playExplicitCards.flatMap(({ options }) => options);
}

export function getDefinitionsHeap(shortCards: TermDefinitionCard[]) {
        return shortCards.map(({ definition }) => definition);
}

function fiftyFifty() {
        return Math.random() < 0.5;
}

function getRandomItem<T>(array: T[]) {
        const randomIndex = Math.floor(Math.random() * (array.length - 1));
        return array[randomIndex];
}

function getCorrectOptionFromExplicitCard(explicitCard: PlayExplicitCard) {
        const correctOption = explicitCard.options.find(
                (option) => option.isCorrect
        );
        if (!correctOption) throw 'No correct option in an explicit card';
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
        const shortCardsOverlayNum = shortCards.length - requiredNum;
        const shortCardsForAlgo = shortCards.slice(0, requiredNum);
        const explicitCardsForAlgo =
                playExplicitCards.slice(shortCardsOverlayNum);
        const isCorrectCards: PlayIsCorrectCard[] = [];

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
                                getIncorrectCard({
                                        t: explicitCard.title,
                                        d: correctOption.title
                                })
                        );
                } else {
                        isCorrectCards.push({
                                type: 'play-isCorrect',
                                isCorrect: false,
                                term: explicitCard.title,
                                definition: getRandomOptAvoidingCurr({
                                        allOptions,
                                        targetOpt: correctOption.title
                                })
                        });
                }
        });

        return isCorrectCards;
}

export function getTypeInCards() {}

/* get type in cards */

/* get normal cards */

/* get cards for story
*
*
/* get array of all explicit cards */
/* get array of all short cards */
/* Heap of all options */
/* result array of normal cards */
/* result array of type-in cards */
/* result array of is-correct cards */
/* result array of explicit cards */

/* If smart mode, that: */
// count, how many cards of each type we want to receive
// get those cards
// write them to result arrays

/* If not smart mode, that: */
// read from settings, how many cards of each type we want to receive
//get those cards
// write them to result arrays

// merge all arrays into one, and mix it

export const addNewStory = atom(null, (get, set, settings: StorySettings) => {
        // get book info
        // get all cards
        // create new story id
        // write all needed data into db
        // execute callback with new story id
});
