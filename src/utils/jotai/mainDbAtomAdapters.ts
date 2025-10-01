// 'todo' - in future should rewrite all atomFamilies here into derived atoms. Because under the hood all of them use maps. And at some point they will consume a lot of memory.
// 'todo' - It seems like all of the atom adapters have similar structure. So I can rewrite them into 1 multi adapter

import {
        booksAtomFamily,
        explicitCardsAtomFamily,
        optionsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { updateBookAtom } from '@/src/jotai/bookAtoms';
import {
        updateExplicitCardAtom,
        updateShortCardAtom
} from '@/src/jotai/cardAtoms';
import { updateOptionAtom } from '@/src/jotai/optionAtoms';

export const bookTitleAtomAdapter = atomFamily((bookId: string) =>
        atom(
                (get) => get(booksAtomFamily(bookId)).bookTitle,
                (get, set, newTitle: string) => {
                        const prevBook = get(booksAtomFamily(bookId));
                        const newBook = { ...prevBook, bookTitle: newTitle };
                        set(updateBookAtom, newBook);
                }
        )
);

export const bookDescriptionAtomAdapter = atomFamily((bookId: string) =>
        atom(
                (get) => get(booksAtomFamily(bookId)).description,
                (get, set, newDescription: string) => {
                        const prevBook = get(booksAtomFamily(bookId));
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
                        return get(explicitCardsAtomFamily(cardId)).cardTitle;
                },
                (get, set, newTitle: string) => {
                        const prevCard = get(explicitCardsAtomFamily(cardId));
                        const newCard = {
                                ...prevCard,
                                cardTitle: newTitle
                        };
                        set(updateExplicitCardAtom, newCard);
                }
        )
);
export const cardOptionTitleAtomAdapter = atomFamily((optionId: string) =>
        atom(
                (get) => get(optionsAtomFamily(optionId)).optionTitle,
                (get, set, newTitle: string) => {
                        const prevOption = get(optionsAtomFamily(optionId));
                        const newOption = {
                                ...prevOption,
                                optionTitle: newTitle
                        };

                        set(updateOptionAtom, newOption);
                }
        )
);

export const cardOptionCorrectnessMarkerAtomAdapter = atomFamily(
        (optionId: string) =>
                atom(
                        (get) => get(optionsAtomFamily(optionId)).isCorrect,
                        (get, set, isCorrect: boolean) => {
                                const prevOption = get(
                                        optionsAtomFamily(optionId)
                                );
                                const newOption = {
                                        ...prevOption,
                                        isCorrect
                                };
                                set(updateOptionAtom, newOption);
                        }
                )
);

export function getShortCardTermAdapterAtom(cardId: string) {
        return atom(
                (get) => get(shortCardsAtomFamily(cardId)).term,
                (get, set, newVal: string) => {
                        const prevShortCard = get(shortCardsAtomFamily(cardId));

                        set(updateShortCardAtom, {
                                ...prevShortCard,
                                term: newVal
                        });
                }
        );
}

export function getShortCardDefinitionAdapterAtom(cardId: string) {
        return atom(
                (get) => get(shortCardsAtomFamily(cardId)).definition,
                (get, set, newVal: string) => {
                        const prevShortCard = get(shortCardsAtomFamily(cardId));

                        set(updateShortCardAtom, {
                                ...prevShortCard,
                                definition: newVal
                        });
                }
        );
}
