import { PlayExplicitCard, PlayIsCorrectCard } from '@/src/types/playMode';
import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import {
        fiftyFifty,
        getCardsForAlgorithm,
        getCorrectOptionFromExplicitCard,
        getRandomOptAvoidingCurr
} from '@/src/utils/createNewStory/helpers';

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

function getCorrectCard({ t, d }: { t: string; d: string }): PlayIsCorrectCard {
        return {
                type: 'play-isCorrect',
                isCorrect: true,
                term: t,
                definition: d
        };
}
