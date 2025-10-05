import { getCardType } from '@/src/utils/lists';
import {
        explicitCardsAtomFamily,
        optionsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import { CARD_TYPE_UNKNOWN } from '@/src/constants/errors';
import { Getter } from 'jotai';
import { getOptionsAsText } from '@/src/utils/cardsAsText/helpers';

export function getAnyCardsAsTextAtomHelper({
        cardIdsOrder,
        explicitCardIds,
        shortCardIds,
        get
}: {
        cardIdsOrder: string[];
        explicitCardIds: string[];
        shortCardIds: string[];
        get: Getter;
}) {
        return cardIdsOrder
                .map((cardId) => {
                        const cardType = getCardType({
                                targetId: cardId,
                                explicitCardIds,
                                shortCardIds
                        });
                        if (cardType === 'short') {
                                const { term, definition } = get(
                                        shortCardsAtomFamily(cardId)
                                );
                                return `\n @@ ${term} - ${definition}`;
                        } else if (cardType === 'explicit') {
                                const { cardTitle, childrenIds } = get(
                                        explicitCardsAtomFamily(cardId)
                                );

                                return `\n && ${cardTitle} ${getOptionsAsText(childrenIds, get).join('')}`;
                        } else {
                                throw CARD_TYPE_UNKNOWN;
                        }
                })
                .join('');
}



export function getShortCardsOnlyAsTextAtomHelper({
        shortCardIds,
        get
}: {
        shortCardIds: string[];
        get: Getter;
}) {
        return shortCardIds
                .map((cardId) => {
                        const { term, definition } = get(
                                shortCardsAtomFamily(cardId)
                        );
                        return `\n ${term} - ${definition}`;
                })
                .join('');
}
