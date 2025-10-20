import {
        FullCardFromText,
        FullOptionFromText,
        FullTermDefinitionCardFromText
} from '@/src/types/updateCardsFromText';
import { CARD_TYPE_UNKNOWN } from '@/src/constants/errors';
import { optionsAtomFamily } from '@/src/jotai/mainAtoms';
import { Getter } from 'jotai';

export function getProcessedShortCardOnly(
        cardText: string
): FullTermDefinitionCardFromText | undefined {
        if (typeof cardText === 'undefined') return;
        const cleanValue = getValCleanFromSpecSigns(cardText);
        if (cleanValue.length === 0) return;
        let term = '';
        let definition = '';
        try {
                const [t, d] = cardText.split(/ - | – |: /);
                term = t;
                definition = d;
        } catch (e) {}
        return {
                type: 'short',
                term,
                definition
        };
}

const RULES = {
        FULL_CARD_MARKER: '&&',
        SUBTITLE_MARKER: '&s',
        DEFAULT_OPTION_MARKER: '%%',
        EXPLANATION_MARKER: '&e',
        SHORT_CARD_MARKER: '@@',
        OPTION_CORRECT_MARKER: '%correct%'
};

export function getCardSeparator() {
        return /(&&|@@)/g;
}

function getAllRulesAsRegExp(): RegExp {
        return /&&|%%|&s|&e|@@/g;
}

function splitByIndex(str: string, index: number) {
        return [str.slice(0, index), str.slice(index)];
}

function extractTarget(stringWithTarget: string, regex: string | void) {
        const [_partialWithoutTarget, partialWithTarget_UNSAFE] =
                typeof regex !== 'undefined'
                        ? stringWithTarget.split(regex)
                        : splitByIndex(stringWithTarget, 0);

        const partialWithTarget = partialWithTarget_UNSAFE || '';
        const [targetString] = partialWithTarget.split(getAllRulesAsRegExp());

        return removeSpecialSymbols(targetString).trim();
}

function removeSpecialSymbols(string: string) {
        const ALL_SPECIAL_SYMBOLS = /\\n|\\t/g;
        return string.replaceAll(ALL_SPECIAL_SYMBOLS, '');
}

export function getProcessedOptions(optionText: string): FullOptionFromText {
        const isCorrect = optionText.includes(RULES.OPTION_CORRECT_MARKER);
        const optionTitleDirty = isCorrect
                ? optionText.replace(RULES.OPTION_CORRECT_MARKER, '')
                : optionText;

        const optionTitleClear = removeSpecialSymbols(optionTitleDirty).trim();

        return {
                isCorrect,
                optionTitle: optionTitleClear
        };
}

export function getProcessedShortCard(
        shortCardText: string
): FullTermDefinitionCardFromText {
        const [term, definition] = shortCardText.split(/ - | – |: /);
        return {
                type: 'short',
                term: term || '',
                definition: definition || '' // definition can be undefined, so we need such solution, so in further checks program doesn't lay down
        };
}

function getClearOptionTextList(explicitCardText: string) {
        const optionsUnfiltered = explicitCardText.split(/(%%)/);
        const resultOptions: string[] = [];
        let prevItemWasOptSymbol = false;


        for (let i = 1; i < optionsUnfiltered.length; i++) {
                const prevItem = optionsUnfiltered[i - 1];
                if (prevItem === '%%') {
                        const optWithRubbish = optionsUnfiltered[i];


                        const [option] = optWithRubbish.split(/&e|&s/);


                        resultOptions.push(option);
                        prevItemWasOptSymbol = false;
                }
        }


        return resultOptions;
}

export function getProcessedExplicitCard(
        explicitCardText: string
): FullCardFromText {
        const cardTitle = extractTarget(explicitCardText);
        const subtitle = extractTarget(explicitCardText, RULES.SUBTITLE_MARKER);
        const explanation = extractTarget(
                explicitCardText,
                RULES.EXPLANATION_MARKER
        );
        const textOptionList = getClearOptionTextList(explicitCardText);

        return {
                type: 'explicit',
                cardTitle,
                subtitle,
                explanation,
                options: textOptionList.map((optionText) =>
                        getProcessedOptions(optionText)
                )
        };
}

function getValCleanFromSpecSigns(val: string) {
        return val.replaceAll(/(@@)|(&&)|(\n)|(\t)/g, '').trim();
}

export function getCardTypeFromText({
        fullArray,
        index
}: {
        fullArray: string[];
        index: number;
}): 'explicit' | 'short' {
        const prevEl = fullArray[index - 1];

        if (prevEl.includes('@@')) {
                return 'short';
        } else if (prevEl.includes('&&')) {
                return 'explicit';
        } else {
                throw CARD_TYPE_UNKNOWN;
        }
}

export function getProcessedCards({
        currentValue,
        index,
        fullArray
}: {
        currentValue: string;
        index: number;
        fullArray: string[];
}): FullCardFromText | FullTermDefinitionCardFromText | undefined {
        if (typeof currentValue === 'undefined') return;
        const cleanValue = getValCleanFromSpecSigns(currentValue);
        if (cleanValue.length === 0) return;
        const cardType = getCardTypeFromText({ fullArray, index });

        if (cardType === 'short') {
                return getProcessedShortCard(cleanValue);
        } else {
                return getProcessedExplicitCard(cleanValue);
        }
}

type DeleteCardsWithEmptyTitleCallback = (
        anyCard: FullCardFromText | FullTermDefinitionCardFromText
) => boolean;

export function getFilterRuleToDeleteCardsWithEmptyTitle(): DeleteCardsWithEmptyTitleCallback {
        return (anyCard) => {
                if (anyCard.type === 'explicit') {
                        return anyCard.cardTitle.length > 0;
                } else if (anyCard.type === 'short') {
                        return (
                                anyCard.term.length > 0 &&
                                anyCard.definition.length > 0
                        );
                } else {
                        throw 'Cards from text array includes card without type (type should be "explicit", or "short"))';
                }
        };
}

export function getOptionsAsText(optionsIds: string[], get: Getter) {
        return optionsIds.map((optionId) => {
                const { optionTitle, isCorrect } = get(
                        optionsAtomFamily(optionId)
                );
                return `\n \t %% ${isCorrect ? '%correct%' : ''} ${optionTitle}`;
        });
}
