import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        getRandomItemsFromList,
        getRandomOptAvoidingCurr
} from '@/src/utils/createNewStory/helpers';
import { ExplicitCardStory, OptionStory } from '@/src/types/stories';

export function getNormalCards({
        requiredNum,
        shortCards,
        allOptions
}: {
        requiredNum: number;
        shortCards: TermDefinitionCard[];
        allOptions: string[];
}): ExplicitCardStory[] {
        const shortCardsForAlgo = getRandomItemsFromList(
                shortCards,
                requiredNum
        );

        return shortCardsForAlgo.map(({ term, definition, id }) => {
                const options: OptionStory[] = Array(4);
                const corrOptInd = Math.floor(Math.random() * 4);
                options[corrOptInd] = {
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
                                title: randomOption
                        };
                }

                return {
                        id: getUniqueID(),
                        type: 'story-explicitCard',
                        currentValue: null,
                        title: term,
                        options,
                        explanation: '',
                        subtitle: ''
                };
        });
}
