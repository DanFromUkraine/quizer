import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import {
        fiftyFifty,
        getCardsForAlgorithm,
        getCorrectOptionFromOptions,
        getRandomOptAvoidingCurr
} from '@/src/utils/createNewStory/helpers';
import getUniqueID from '@/src/utils/getUniqueID';
import { ExplicitCardStory, IsCorrectCardStory } from '@/src/types/stories';

export function getIsCorrectCards({
        requiredNum,
        playExplicitCards,
        shortCards,
        allOptions
}: {
        requiredNum: number;
        playExplicitCards: ExplicitCardStory[];
        shortCards: TermDefinitionCard[];
        allOptions: string[];
}) {
        const isCorrectCards: IsCorrectCardStory[] = [];
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
                        isCorrectCards.push(
                                getIncorrectCard({
                                        t: term,
                                        d: getRandomOptAvoidingCurr({
                                                allOptions,
                                                targetOpt: definition
                                        })
                                })
                        );
                }
        });

        explicitCardsForAlgo.forEach(({ title, options }) => {
                const isCorrect = fiftyFifty();
                const correctOption = getCorrectOptionFromOptions(options);
                if (isCorrect) {
                        isCorrectCards.push(
                                getCorrectCard({
                                        t: title,
                                        d: correctOption.title
                                })
                        );
                } else {
                        isCorrectCards.push(
                                getIncorrectCard({
                                        t: title,
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

function getIncorrectCard({
        t,
        d
}: {
        t: string;
        d: string;
}): IsCorrectCardStory {
        return {
                id: getUniqueID(),
                type: 'story-isCorrectCard',
                currentValue: null,
                isCorrect: false,
                term: t,
                definition: d
        };
}

function getCorrectCard({
        t,
        d
}: {
        t: string;
        d: string;
}): IsCorrectCardStory {
        return {
                id: getUniqueID(),
                type: 'story-isCorrectCard',
                currentValue: null,
                isCorrect: true,
                term: t,
                definition: d
        };
}
