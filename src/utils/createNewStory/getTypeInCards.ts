import { PlayExplicitCard, PlayTypeInCard } from '@/src/types/playMode';
import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import {
        getCardsForAlgorithm,
        getCorrectOptionFromExplicitCard
} from '@/src/utils/createNewStory/helpers';

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

