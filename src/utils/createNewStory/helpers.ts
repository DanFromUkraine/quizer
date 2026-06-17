import { TermDefinitionCard } from '@/src/types/mainDbGlobal';
import { Getter } from 'jotai';
import {
    explicitCardsAtomFamily,
    optionsAtomFamily,
    shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import shuffleList from '@/src/utils/fisherYatesShafle';
import { ExplicitCardStory, OptionStory } from '@/src/types/stories';
import getUniqueID from '@/src/utils/getUniqueID';

export function getOption({
    get,
    optionId
}: {
    get: Getter;
    optionId: string;
}): OptionStory {
    const { optionTitle, isCorrect } = get(optionsAtomFamily(optionId));
    return { title: optionTitle, isCorrect };
}

export function getExplicitCardStory({
    get,
    cardId
}: {
    get: Getter;
    cardId: string;
}): ExplicitCardStory {
    const { cardTitle, explanation, childrenIds } = get(
        explicitCardsAtomFamily(cardId)
    );

    return {
        id: getUniqueID(),
        currentValue: [],
        type: 'story-explicitCard',
        title: cardTitle,
        explanation,
        options: childrenIds.map((optionId) => getOption({ get, optionId }))
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
        getExplicitCardStory({ get, cardId })
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

export function getOptionsHeap({
    playExplicitCards,
    shortCards
}: {
    playExplicitCards: ExplicitCardStory[];
    shortCards: TermDefinitionCard[];
}) {
    const optionsFromExpCards = playExplicitCards.flatMap(({ options }) => {
        return options.map((opt) => opt.title);
    });
    const optionsFromShortCards = shortCards.map(
        ({ definition }) => definition
    );

    return [...optionsFromExpCards, ...optionsFromShortCards];
}

export function fiftyFifty() {
    return Math.random() < 0.5;
}

export function getRandomItemsFromList<T>(list: T[], n: number) {
    const shuffledList = shuffleList(list);
    return shuffledList.slice(0, n);
}

export function getCardsForAlgorithm({
    requiredNum,
    shortCards,
    playExplicitCards
}: {
    requiredNum: number;
    shortCards: TermDefinitionCard[];
    playExplicitCards: ExplicitCardStory[];
}): [TermDefinitionCard[], ExplicitCardStory[]] {
    const shortCardsNeeded = Math.min(requiredNum, shortCards.length);
    const shortCardsForAlgo = getRandomItemsFromList(
        shortCards,
        shortCardsNeeded
    );

    const explicitNeeded = Math.max(0, requiredNum - shortCards.length);
    const explicitCardsForAlgo =
        explicitNeeded > 0
            ? getRandomItemsFromList(
                  playExplicitCards,
                  Math.min(explicitNeeded, playExplicitCards.length)
              )
            : [];

    return [shortCardsForAlgo, explicitCardsForAlgo];
}

export function getRandomAvoidingMany<T>({
    list,
    toAvoid
}: {
    list: T[];
    toAvoid: T[];
}) {
    const anArrayWithoutCurrentDefinition = list.filter(
        (currOpt) => !toAvoid.includes(currOpt)
    );
    return getRandomItem(anArrayWithoutCurrentDefinition);
}

export function getRandomOptAvoidingCurr({
    allOptions,
    targetOpt
}: {
    allOptions: string[];
    targetOpt: string;
}) {
    return getRandomAvoidingMany({
        list: allOptions,
        toAvoid: [targetOpt]
    });
}

function getRandomItem<T>(array: T[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getCorrectOptionFromOptions<T extends { isCorrect: boolean }>(
    options: T[]
) {
    const correctOption = options.find((option) => option.isCorrect);
    // todo - need to improve this logic, because cards now can have two correct options and more
    if (!correctOption)
        throw new Error('No correct option in an explicit card');
    return correctOption;
}
