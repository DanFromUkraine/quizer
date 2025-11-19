import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import { ExplicitCardStory, OptionStory } from '@/src/types/stories';
import {
    getRandomAvoidingMany,
    getRandomItemsFromList
} from '@/src/utils/createNewStory/helpers';
import getUniqueID from '@/src/utils/getUniqueID';

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

        return shortCardsForAlgo.map(({ term, definition }) => {
                const NUM_OF_OPTS_TO_CREATE = 4;
                const options: OptionStory[] = [];
                const corrOptInd = Math.floor(Math.random() * 4);
                options[corrOptInd] = {
                        isCorrect: true,
                        title: definition
                };
                for (let i = 0; i < NUM_OF_OPTS_TO_CREATE; i++) {
                        if (i === corrOptInd) continue;
                        const randomOption = getRandomAvoidingMany({
                                list: allOptions,
                                toAvoid: [
                                        definition,
                                        ...options.map((o) => o.title)
                                ]
                        });
                        options[i] = {
                                isCorrect: false,
                                title: randomOption
                        };
                }

                return {
                        id: getUniqueID(),
                        type: 'story-explicitCard',
                        currentValue: [],
                        title: term,
                        options,
                        explanation: '',
                        subtitle: ''
                };
        });
}
