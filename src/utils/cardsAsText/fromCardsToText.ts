import { getCardType } from '@/src/utils/lists';
import {
        explicitCardsAtomFamily,
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
                                const {
                                        cardTitle,
                                        childrenIds,
                                        subtitle,
                                        explanation
                                } = get(explicitCardsAtomFamily(cardId));

                                return `\n&& ${cardTitle} \n${subtitle.length > 0 ? `&s ${subtitle}` : ''}\t${getOptionsAsText(childrenIds, get).join('')}\n${explanation.length > 0 ? `\n&e ${explanation}` : ''}\n`;
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
