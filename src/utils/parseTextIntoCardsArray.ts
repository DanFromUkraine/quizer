// 'todo' - need to add support for other formats.
// 'todo' - rewrite in AssemblyScript, to optimize it
// 'todo' - add change flag, to show renderer, if a component actually needs render.

import {
        FullCardFromText,
        FullOptionFromText,
        FullTermDefinitionCardFromText
} from '@/src/types/cardsTextParser';
import { CARD_TYPE_UNKNOWN } from '@/src/constants/errors';

const RULES = {
        FULL_CARD_MARKER: '&&',
        SUBTITLE_MARKER: '*s',
        DEFAULT_OPTION_MARKER: '%%',
        EXPLANATION_MARKER: '*e',
        SHORT_CARD_MARKER: '@@',
        OPTION_CORRECT_MARKER: '%correct%'
};

function getCardSeparator() {
        return /(&&|@@)/g;
}

function getAllRulesAsRegExp(): RegExp {
        return /&&|%%|\*e|@@/g;
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

function getProcessedOptions(optionText: string): FullOptionFromText {
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

function getProcessedShortCard(
        shortCardText: string
): FullTermDefinitionCardFromText {
        const [term, definition] = shortCardText.split(' - ');
        return {
                type: 'short',
                term,
                definition
        };
}

function getProcessedExplicitCard(explicitCardText: string): FullCardFromText {
        const cardTitle = extractTarget(explicitCardText);
        const subtitle = extractTarget(explicitCardText, RULES.SUBTITLE_MARKER);
        const explanation = extractTarget(
                explicitCardText,
                RULES.EXPLANATION_MARKER
        );
        const optionsUnfiltered = explicitCardText.split(
                RULES.DEFAULT_OPTION_MARKER
        );
        optionsUnfiltered.shift();

        return {
                type: 'explicit',
                cardTitle,
                subtitle,
                explanation,
                options: optionsUnfiltered.map((optionText) =>
                        getProcessedOptions(optionText)
                )
        };
}

function getValCleanFromSpecSigns(val: string) {
        return val.replaceAll(/(@@)|(&&)|(\n)|(\t)/g, '').trim();
}

function getCardTypeFromText({
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

function getProcessedCards({
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

function deleteCardsWithEmptyTitle(cardTitle: string) {
        return cardTitle.length > 0;
}

export default function parseTextIntoCardsArray(
        targetText: string
): (FullCardFromText | FullTermDefinitionCardFromText)[] {
        const cardsUnprocessed = targetText.split(getCardSeparator());

        return cardsUnprocessed
                .map((cardText, i, arr) =>
                        getProcessedCards({
                                currentValue: cardText,
                                index: i,
                                fullArray: arr
                        })
                )
                .filter((val) => typeof val !== 'undefined')
                .filter((val) => {
                        /* 'todo' - move in other function */
                        if (val.type === 'explicit') {
                                return val.cardTitle.length > 0;
                        } else if (val.type === 'short') {
                                return (
                                        val.term.length > 0 &&
                                        val.definition.length > 0
                                );
                        } else {
                                throw 'Cards from text array includes card without type (type should be "explicit", or "short"))';
                        }
                });
}
