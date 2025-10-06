// 'todo' - need to add support for other formats.
// 'todo' - rewrite in AssemblyScript, to optimize it
// 'todo' - add change flag, to show renderer, if a component actually needs render.

// 'todo' - need to add support for other formats.
// 'todo' - rewrite in AssemblyScript, to optimize it
// 'todo' - add change flag, to show renderer, if a component actually needs render.
import { FullCardFromText, FullTermDefinitionCardFromText } from '@/src/types/updateCardsFromText';
import {
        getCardSeparator,
        getFilterRuleToDeleteCardsWithEmptyTitle,
        getProcessedCards,
        getProcessedShortCardOnly
} from '@/src/utils/cardsAsText/helpers';

export function parseTextIntoAnyCardsArray(
        targetText: string
): (FullCardFromText | FullTermDefinitionCardFromText)[] {
        const cardsUnprocessed = targetText.split(getCardSeparator());

        return (
                cardsUnprocessed
                        .map((cardText, i, arr) =>
                                getProcessedCards({
                                        currentValue: cardText,
                                        index: i,
                                        fullArray: arr
                                })
                        )
                        .filter((val) => typeof val !== 'undefined')
                        .filter(getFilterRuleToDeleteCardsWithEmptyTitle())
        );
}

export function parseTextIntoOnlyShortCardsArray(targetText: string) {
        const cardsUnprocessed = targetText.split(/\n/g);

        return cardsUnprocessed
                .map((shortCardText) =>
                        getProcessedShortCardOnly(shortCardText)
                )
                .filter((val) => typeof val !== 'undefined')
                .filter(getFilterRuleToDeleteCardsWithEmptyTitle());
}
