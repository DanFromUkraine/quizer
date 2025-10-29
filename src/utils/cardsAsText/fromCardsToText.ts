import { getCardType } from '@/src/utils/lists';
import {
        explicitCardsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import { CARD_TYPE_UNKNOWN } from '@/src/constants/errors';
import { Getter } from 'jotai';
import {
        getExpCardsAsText,
        getShortCardAsText__MIX_MODE,
        getShortCardAsText__SHORT_MODE
} from '@/src/utils/cardsAsText/helpers';

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
                                const shortCardData = get(
                                        shortCardsAtomFamily(cardId)
                                );
                                return getShortCardAsText__MIX_MODE({
                                        ...shortCardData
                                });
                        } else if (cardType === 'explicit') {
                                const expCardData = get(
                                        explicitCardsAtomFamily(cardId)
                                );

                                return getExpCardsAsText({
                                        ...expCardData,
                                        get
                                });
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
                        const shortCardData = get(shortCardsAtomFamily(cardId));
                        return getShortCardAsText__SHORT_MODE({
                                ...shortCardData
                        });
                })
                .join('');
}
