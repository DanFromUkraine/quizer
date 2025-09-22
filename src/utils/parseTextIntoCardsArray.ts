// 'todo' - need to add support for other formats.
// 'todo' - rewrite in AssemblyScript, to optimize it
// 'todo' - add change flag, to show renderer, if a component actually needs render.

const RULES = {
        DEFAULT_QUESTION_MARKER: /&&/,
        // CUSTOM_QUESTION_MARKER: /&/,
        SUBTITLE_MARKER: /\*d/,
        DEFAULT_OPTION_MARKER: /%%/,
        // CUSTOM_OPTION_MARKER: /%/,
        EXPLANATION_MARKER: /\*e/
};

const OPTION_CORRECT_MARKER = '%correct%';

const DUMB_SEGREGATOR =
        /* used in split method. First element is empty string. Second - applied string with no changes*/ /^/;

export interface ExplicitOptionDataStore {
        optionTitle: string;
        isCorrect: boolean;
}

export interface ExplicitCardDataStore {
        cardTitle: string;
        subtitle: string | undefined;
        options: ExplicitOptionDataStore[];
        explanation: string | undefined;
}

function getAllRulesAsRegExp(): RegExp {
        return /(&&)|(%%)|(\*e)/g;
}

function splitByIndex(str: string, index: number) {
        return [str.slice(0, index), str.slice(index)];
}

function extractTarget(stringWithTarget: string, regex: RegExp | void) {
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

function getProcessedOptions(optionText: string): ExplicitOptionDataStore {
        const isCorrect = optionText.includes(OPTION_CORRECT_MARKER);
        const optionTitleDirty = isCorrect
                ? optionText.replace(OPTION_CORRECT_MARKER, '')
                : optionText;

        const optionTitleClear = removeSpecialSymbols(optionTitleDirty).trim();

        return {
                isCorrect,
                optionTitle: optionTitleClear
        };
}

function getProcessedCards(cardText: string): ExplicitCardDataStore {
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

function filterCardsWithEmptyTitle(cardTitle: string) {
        return cardTitle.length > 0;
}

export default function parseTextIntoCardsArray(targetText: string) {
        const cardsUnprocessed = targetText.split(
                RULES.DEFAULT_QUESTION_MARKER
        );

        return cardsUnprocessed
                .map((cardText) => getProcessedCards(cardText))
                .filter(({ cardTitle }) =>
                        filterCardsWithEmptyTitle(cardTitle)
                );
}
