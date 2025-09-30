// 'todo' - need to add support for other formats.
// 'todo' - rewrite in AssemblyScript, to optimize it
// 'todo' - add change flag, to show renderer, if a component actually needs render.

import {
        FullCardFromText,
        FullOptionFromText,
        FullTermDefinitionCardFromText
} from '@/src/types/cardsTextParser';

const RULES = {
        FULL_CARD_MARKER: '&&',
        SUBTITLE_MARKER: '*s',
        DEFAULT_OPTION_MARKER: '%%',
        EXPLANATION_MARKER: '*e',
        SHORT_CARD_MARKER: '@@',
        OPTION_CORRECT_MARKER: '%correct%'
};

function getCardSeparator() {
        return /(&&)|(@@)/g;
}

function getAllRulesAsRegExp(): RegExp {
        return /(&&)|(%%)|(\*e)|(@@)/g;
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
        const ALL_SPECIAL_SYMBOLS = /(\n)|(\t)/g;
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

function getProcessedCards(cardText: string): FullCardFromText {
        const cardTitle = extractTarget(cardText);
        const subtitle = extractTarget(cardText, RULES.SUBTITLE_MARKER);
        const explanation = extractTarget(cardText, RULES.EXPLANATION_MARKER);
        const optionsUnfiltered = cardText.split(RULES.DEFAULT_OPTION_MARKER);
        optionsUnfiltered.shift();

        return {
                cardTitle,
                subtitle,
                explanation,
                options: optionsUnfiltered.map((optionText) =>
                        getProcessedOptions(optionText)
                )
        };
}

function deleteCardsWithEmptyTitle(cardTitle: string) {
        return cardTitle.length > 0;
}

export default function parseTextIntoCardsArray(
        targetText: string
): (FullCardFromText | FullTermDefinitionCardFromText)[] {
        const cardsUnprocessed = targetText.split(getCardSeparator());

        return cardsUnprocessed
                .map((cardText) => getProcessedCards(cardText))
                .filter(({ cardTitle }) =>
                        deleteCardsWithEmptyTitle(cardTitle)
                );
}
