import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import {
        getCardsForAlgorithm,
        getCorrectOptionFromOptions
} from '@/src/utils/createNewStory/helpers';
import getUniqueID from '@/src/utils/getUniqueID';
import { ExplicitCardStory, TypeInCardStory } from '@/src/types/stories';

function getTypeInCard({
        def,
        expInp
}: {
        def: string;
        expInp: string;
}): TypeInCardStory {
        return {
                id: getUniqueID(),
                type: 'story-typeInCard',
                currentValue: '',
                answerRevealed: false,
                definition: def,
                expectedInput: expInp
        };
}

export function getTypeInCards({
        requiredNum,
        playExplicitCards,
        shortCards
}: {
        requiredNum: number;
        playExplicitCards: ExplicitCardStory[];
        shortCards: TermDefinitionCard[];
}) {
        const [shortCardsForAlgo, explicitCardsForAlgo] = getCardsForAlgorithm({
                playExplicitCards,
                requiredNum,
                shortCards
        });
        const typeInCardsResult: TypeInCardStory[] = [];

        shortCardsForAlgo.forEach(({ term, definition }) => {
                typeInCardsResult.push(
                        getTypeInCard({ def: definition, expInp: term })
                );
        });

        explicitCardsForAlgo.forEach(({ title, options }) => {
                typeInCardsResult.push(
                        getTypeInCard({
                                def: getCorrectOptionFromOptions(options).title,
                                expInp: title
                        })
                );
        });

        return typeInCardsResult;
}
