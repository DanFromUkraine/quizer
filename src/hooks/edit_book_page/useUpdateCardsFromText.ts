/* 'to-do' - this code is very unoptimized, because updates card while ignoring, whether it was actually updated, or not
 * 'to-do' - code looks like a shit. Need to split it into different functions
 * */

'use client';

import { useAtom, useAtomValue } from 'jotai';
import {
        booksFamilyAtom,
        cardsFamilyAtom,
        cardsTextAtom,
        currentBookIdAtom,
        optionsFamilyAtom,
        updateCardAtom,
        updateOptionAtom
} from '@/src/jotai/mainDbAtom';
import { useCallback, useEffect } from 'react';
import parseTextIntoCardsArray from '@/src/utils/parseTextIntoCardsArray';
import { useAtomCallback } from 'jotai/utils';
import { editCardsAsTextModalVisibilityAtom } from '@/src/jotai/statusAtoms';


export default function useUpdateCardsFromText() {
        const [cardsText, setCardsText] = useAtom(cardsTextAtom);
        const modalVisible = useAtomValue(editCardsAsTextModalVisibilityAtom);

        const updateCards = useAtomCallback(
                useCallback((get, set, cardsTextUpToDate: string) => {
                        const cardsArray =
                                parseTextIntoCardsArray(cardsTextUpToDate);

                        cardsArray.forEach((explicitCard, i) => {
                                const bookId = get(currentBookIdAtom);
                                const { cardsIds } = get(
                                        booksFamilyAtom(bookId)
                                );
                                const cardAtom = cardsFamilyAtom(cardsIds[i]);
                                const prevCard = get(cardAtom);

                                set(updateCardAtom, {
                                        ...prevCard,
                                        cardTitle: explicitCard.cardTitle
                                });

                                explicitCard.options.forEach(
                                        ({ optionTitle, isCorrect }, i) => {
                                                const optionAtom =
                                                        optionsFamilyAtom(
                                                                prevCard
                                                                        .optionsIds[
                                                                        i
                                                                ]
                                                        );
                                                const prevOption =
                                                        get(optionAtom);

                                                set(updateOptionAtom, {
                                                        ...prevOption,
                                                        optionTitle,
                                                        isCorrect
                                                });
                                        }
                                );
                        });
                }, [])
        );

        useEffect(() => {
                if (cardsText.length === 0 || modalVisible) return;
                updateCards(cardsText);
                setCardsText('');
        }, [cardsText, modalVisible]);
}
