import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import {
        PlayExplicitCard,
        PlayNormalCard,
        PlayOption
} from '@/src/types/playMode';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        getRandomItemsFromList,
        getRandomOptAvoidingCurr
} from '@/src/utils/createNewStory/helpers';

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


