import { Getter, Setter } from 'jotai';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import { getNormalCards } from '@/src/utils/createNewStory/getNormalCards';
import { getTypeInCards } from '@/src/utils/createNewStory/getTypeInCards';
import { getIsCorrectCards } from '@/src/utils/createNewStory/getIsCorrectCards';
import {
        getAllExplicitCards,
        getAllShortCards,
        getOptionsHeap
} from '@/src/utils/createNewStory/helpers';
import shuffleList from '@/src/utils/fisherYatesShafle';
import { updateExplicitCardStoryAtom } from '@/src/jotai/explicitCardStoryAtoms';
import { AnyCardStory, ExplicitCardStory } from '@/src/types/stories';
import { updateTypeInCardStoryAtom } from '@/src/jotai/typeInCardStoryAtoms';
import { updateIsCorrectCardStoryAtom } from '@/src/jotai/isCorrectCardStoryAtoms';

interface ResultNumOfCards {
        nOfTypeInCards: number;
        nOfIsCorrectCards: number;
        nOfExplicitCards: number;
        nOfNormalCards: number;
}

export function getCardsOfAllTypes({
        nOfTypeInCards,
        nOfIsCorrectCards,
        nOfNormalCards,
        nOfExplicitCards,
        allShortCards,
        allExplicitCardStories,
        optionsHeap
}: {
        allShortCards: TermDefinitionCard[];
        allExplicitCardStories: ExplicitCardStory[];
        optionsHeap: string[];
} & ResultNumOfCards) {
        const normalCards = getNormalCards({
                requiredNum: nOfNormalCards,
                shortCards: allShortCards,
                allOptions: optionsHeap
        });

        const typeInCards = getTypeInCards({
                requiredNum: nOfTypeInCards,
                shortCards: allShortCards,
                playExplicitCards: allExplicitCardStories
        });

        const isCorrectCards = getIsCorrectCards({
                requiredNum: nOfIsCorrectCards,
                playExplicitCards: allExplicitCardStories,
                allOptions: optionsHeap,
                shortCards: allShortCards
        });

        const explicitCards = allExplicitCardStories.slice(0, nOfExplicitCards);

        return [
                ...normalCards,
                ...typeInCards,
                ...isCorrectCards,
                ...explicitCards
        ];
}

interface UserChosenNumOfCards {
        numOfExplicitCards: number;
        numOfNormalCards: number;
        numOfTypeInCards: number;
        numOfIsCorrectCards: number;
}

interface InitPlayCardProps extends UserChosenNumOfCards {
        isSmartMode: boolean;
        bookId: string;
        get: Getter;
        set: Setter;
}

export function prepareCardsForInit({
        get,
        explicitCardIds,
        shortCardIds
}: {
        get: Getter;
        explicitCardIds: string[];
        shortCardIds: string[];
}) {
        const allExplicitCardStories = getAllExplicitCards({
                get,
                explicitCardIds
        });

        const allShortCards = getAllShortCards({
                get,
                shortCardIds
        });

        const optionsHeap = getOptionsHeap({
                playExplicitCards: allExplicitCardStories,
                shortCards: allShortCards
        });

        return {
                allExplicitCardStories,
                allShortCards,
                optionsHeap
        };
}

export function getNumOfCards({
        isSmartMode,
        optionsHeap,
        explicitCardIds,
        shortCardIds,
        numOfExplicitCards,
        numOfNormalCards,
        numOfTypeInCards,
        numOfIsCorrectCards
}: {
        isSmartMode: boolean;
        optionsHeap: string[];
        explicitCardIds: string[];
        shortCardIds: string[];
} & UserChosenNumOfCards): ResultNumOfCards {
        const smartNumOfNormCards = Math.floor(optionsHeap.length / 4);
        const smartNumOfTypeInCards =
                Math.floor(explicitCardIds.length / 2) +
                Math.floor(shortCardIds.length / 2);
        const smartNumOfIsCorrectCards =
                Math.floor(explicitCardIds.length / 2) +
                Math.floor(shortCardIds.length / 2);
        const smartNumOfExpCards = explicitCardIds.length;

        return isSmartMode
                ? {
                          nOfExplicitCards: smartNumOfExpCards,
                          nOfNormalCards: smartNumOfNormCards,
                          nOfTypeInCards: smartNumOfTypeInCards,
                          nOfIsCorrectCards: smartNumOfIsCorrectCards
                  }
                : {
                          nOfExplicitCards: numOfExplicitCards,
                          nOfNormalCards: numOfNormalCards,
                          nOfTypeInCards: numOfTypeInCards,
                          nOfIsCorrectCards: numOfIsCorrectCards
                  };
}

export function getCardIds(resultArray: AnyCardStory[]) {
        const allCardIds: string[] = [];
        const playExplicitCardIds: string[] = [];
        const typeInCardIds: string[] = [];
        const isCorrectCardIds: string[] = [];

        for (const { id, type } of resultArray) {
                allCardIds.push(id);

                if (type === 'story-explicitCard') {
                        playExplicitCardIds.push(id);
                } else if (type === 'story-isCorrectCard') {
                        isCorrectCardIds.push(id);
                } else if (type === 'story-typeInCard') {
                        typeInCardIds.push(id);
                }
        }

        return {
                cardIdsOrder: shuffleList(allCardIds),
                playExplicitCardIds,
                typeInCardIds,
                isCorrectCardIds
        };
}

export function initiateCardsInIdb({
        set,
        resultArray
}: {
        set: Setter;
        resultArray: AnyCardStory[];
}) {
        resultArray.forEach((card) => {
                if (card.type === 'story-explicitCard') {
                        set(updateExplicitCardStoryAtom, card);
                } else if (card.type === 'story-typeInCard') {
                        set(updateTypeInCardStoryAtom, card);
                } else if (card.type === 'story-isCorrectCard') {
                        set(updateIsCorrectCardStoryAtom, card);
                }
        });
}

export function initPlayCardsAndGetTheirIds({
        isSmartMode,
        numOfExplicitCards,
        numOfNormalCards,
        numOfTypeInCards,
        numOfIsCorrectCards,
        get,
        bookId,
        set
}: InitPlayCardProps) {
        const { explicitCardIds, shortCardIds } = get(booksAtomFamily(bookId));

        const { allExplicitCardStories, allShortCards, optionsHeap } =
                prepareCardsForInit({ get, explicitCardIds, shortCardIds });

        const resultArray: AnyCardStory[] = getCardsOfAllTypes({
                ...getNumOfCards({
                        optionsHeap,
                        shortCardIds,
                        explicitCardIds,
                        isSmartMode,
                        numOfExplicitCards,
                        numOfNormalCards,
                        numOfTypeInCards,
                        numOfIsCorrectCards
                }),
                optionsHeap,
                allExplicitCardStories,
                allShortCards
        });

        initiateCardsInIdb({ set, resultArray }); // potentially dangerous - unhandled async code. But it has to be tried

        return getCardIds(resultArray);
}
