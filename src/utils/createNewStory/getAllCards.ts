import { Getter } from 'jotai';
import { booksAtomFamily } from '@/src/jotai/mainAtoms';
import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import { AnyCard, PlayExplicitCard } from '@/src/types/playMode';
import { getNormalCards } from '@/src/utils/createNewStory/getNormalCards';
import { getTypeInCards } from '@/src/utils/createNewStory/getTypeInCards';
import { getIsCorrectCards } from '@/src/utils/createNewStory/getIsCorrectCards';
import {
        getAllExplicitCards,
        getAllShortCards,
        getOptionsHeap
} from '@/src/utils/createNewStory/helpers';
import shuffleList from '@/src/utils/fisherYatesShafle';

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

export function getCardsForStoryModeRelated({
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
