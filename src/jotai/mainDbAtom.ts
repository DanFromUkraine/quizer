'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { Book, Card, MainDb, Option } from '@/src/types/mainDb';
import {
        addEmptyBookAtomHelper,
        addEmptyCardAtomHelper,
        addEmptyOptionAtomHelper,
        deleteBookAtomHelper,
        deleteCardsOnBookDeleteAtomHelper,
        deleteOptionsOnCardDeleteAtomHelper,
        getAtomFactory,
        getBookWithNewId,
        getCardsAsText,
        getCardWithNewOptionId,
        getCardWithoutDeletedOptionId,
        getDerivedAtom,
        getNewBookWithFilteredIds,
        updateBookAtomHelper,
        updateCardAtomHelper,
        updateOptionAtomHelper
} from '@/src/jotai/utils/mainDbUtils';
import getUniqueID from '@/src/utils/getUniqueID';
import {
        addEmptyBookIdb,
        addEmptyCardIdb,
        addEmptyOptionIdb,
        deleteBookIdb,
        deleteCardIdb,
        deleteOptionIdb,
        updateBookIdb,
        updateCardIdb,
        updateOptionIdb
} from '@/src/utils/idb/main/actions';
import { ExplicitCardDataStore } from '@/src/utils/parseTextIntoCardsArray';

export const mainDbAtom = atom<MainDb>();
export const booksFamilyAtom = atomFamily(getAtomFactory('books'));
export const cardsFamilyAtom = atomFamily(getAtomFactory('cards'));
export const optionsFamilyAtom = atomFamily(getAtomFactory('options'));
export const booksIdsAtom = atom<string[]>([]);
export const currentBookIdAtom = atom<string>('');

export const addEmptyBookAtom = getDerivedAtom(async (get, set, mainDb) => {
        const id = getUniqueID();
        await addEmptyBookIdb(mainDb, id);
        addEmptyBookAtomHelper(set, id);
});

export const deleteBookAtom = getDerivedAtom(
        async (get, set, mainDb, bookId: string) => {
                await deleteBookIdb(mainDb, bookId);
                await deleteCardsOnBookDeleteAtomHelper(get, set, bookId);
                deleteBookAtomHelper(set, bookId);
        }
);

export const updateBookAtom = getDerivedAtom(
        async (get, set, mainDb, newBook: Book) => {
                await mainDb.put('books', newBook);
                updateBookAtomHelper(set, newBook);
        }
);

export const addEmptyCardAtom = getDerivedAtom(async (get, set, mainDb) => {
        const cardId = getUniqueID();
        const bookId = get(currentBookIdAtom);
        const newBook = getBookWithNewId(get, bookId, cardId);
        await updateBookIdb(mainDb, newBook);
        await addEmptyCardIdb(mainDb, cardId);
        updateBookAtomHelper(set, newBook);
        addEmptyCardAtomHelper(set, cardId);
});

export const updateCardAtom = getDerivedAtom(
        async (get, set, mainDb, newCard: Card) => {
                console.log({ newCard });

                await updateCardIdb(mainDb, newCard);
                updateCardAtomHelper(set, newCard);
        }
);

export const deleteCardAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string) => {
                const newBook = getNewBookWithFilteredIds(get, cardId);
                await updateBookIdb(mainDb, newBook);
                await deleteCardIdb(mainDb, cardId);
                updateBookAtomHelper(set, newBook);
                await deleteOptionsOnCardDeleteAtomHelper(get, set, cardId);
                cardsFamilyAtom.remove(cardId);
        }
);

export const updateOptionAtom = getDerivedAtom(
        async (get, set, mainDb, newOption: Option) => {
                await updateOptionIdb(mainDb, newOption).then(() =>
                        console.debug('success option')
                );
                updateOptionAtomHelper(set, newOption);
        }
);

export const addEmptyOptionAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string) => {
                const newId = getUniqueID();
                const newCard = getCardWithNewOptionId(get, cardId, newId);
                await updateCardIdb(mainDb, newCard);
                await addEmptyOptionIdb(mainDb, newId);
                updateCardAtomHelper(set, newCard);
                addEmptyOptionAtomHelper(set, newId);
        }
);

export const deleteOptionAtom = getDerivedAtom(
        async (get, set, mainDb, cardId: string, optionId: string) => {
                const newCard = getCardWithoutDeletedOptionId(
                        get,
                        cardId,
                        optionId
                );
                await deleteOptionIdb(mainDb, optionId);
                set(updateCardAtom, newCard);
                optionsFamilyAtom.remove(optionId);
        }
);

export const bookTitleAtomAdapter = atomFamily((bookId: string) =>
        atom(
                (get) => get(booksFamilyAtom(bookId)).bookTitle,
                (get, set, newTitle: string) => {
                        const prevBook = get(booksFamilyAtom(bookId));
                        const newBook = { ...prevBook, bookTitle: newTitle };
                        set(updateBookAtom, newBook);
                }
        )
);

export const bookDescriptionAtomAdapter = atomFamily((bookId: string) =>
        atom(
                (get) => get(booksFamilyAtom(bookId)).description,
                (get, set, newDescription: string) => {
                        const prevBook = get(booksFamilyAtom(bookId));
                        const newBook = {
                                ...prevBook,
                                description: newDescription
                        };
                        set(updateBookAtom, newBook);
                }
        )
);

export const cardTitleAtomAdapter = atomFamily((cardId: string) =>
        atom(
                (get) => {
                        return get(cardsFamilyAtom(cardId)).cardTitle;
                },
                (get, set, newTitle: string) => {
                        const prevCard = get(cardsFamilyAtom(cardId));
                        const newCard = {
                                ...prevCard,
                                cardTitle: newTitle
                        };
                        set(updateCardAtom, newCard);
                }
        )
);
export const cardOptionTitleAtomAdapter = atomFamily((optionId: string) =>
        atom(
                (get) => get(optionsFamilyAtom(optionId)).optionTitle,
                (get, set, newTitle: string) => {
                        const prevOption = get(optionsFamilyAtom(optionId));
                        const newOption = {
                                ...prevOption,
                                optionTitle: newTitle
                        };

                        console.log(
                                'slkdjflkjsdf;lkjsdfl;kjsdflkjsd;flkjsdfl;kjsdf'
                        );

                        set(updateOptionAtom, newOption);
                }
        )
);

export const cardOptionCorrectnessMarkerAtomAdapter = atomFamily(
        (optionId: string) =>
                atom(
                        (get) => get(optionsFamilyAtom(optionId)).isCorrect,
                        (get, set, isCorrect: boolean) => {
                                const prevOption = get(
                                        optionsFamilyAtom(optionId)
                                );
                                const newOption = {
                                        ...prevOption,
                                        isCorrect
                                };
                                set(updateOptionAtom, newOption);
                        }
                )
);

export const getBookCardsAsTextAtom = atom((get) => {
        const bookId = get(currentBookIdAtom);
        const { cardsIds } = get(booksFamilyAtom(bookId));

        return getCardsAsText(cardsIds, get).join('');
});

export const cardsTextAtom = atom('');

export const addNewCardWithData = atom(
        null,
        (get, set, newCard: ExplicitCardDataStore) => {
                const bookId = get(currentBookIdAtom);
                const newCardId = getUniqueID();
                const optionsIds = newCard.options.map(() => getUniqueID());
                const newCardData: Card = {
                        cardTitle: newCard.cardTitle,
                        id: newCardId,
                        optionsIds
                };
                const newCardAtom = cardsFamilyAtom(newCardId);
                set(newCardAtom, newCardData);
                const newBook = getBookWithNewId(get, bookId, newCardId);
                set(updateBookAtom, newBook);
                optionsIds.forEach((newOptionId, i) => {
                        const newOptionAtom = optionsFamilyAtom(newOptionId);
                        const newOptionData: Option = {
                                id: getUniqueID(),
                                ...newCard.options[i]
                        };
                        set(newOptionAtom, newOptionData);
                });
        }
);


