// 'todo' - in future should rewrite all atomFamilies here into derived atoms. Because under the hood all of them use maps. And at some point they will consume a lot of memory.

import {
        booksFamilyAtom,
        cardsFamilyAtom,
        optionsFamilyAtom
} from '@/src/jotai/mainAtoms';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { updateBookAtom } from '@/src/jotai/bookAtoms';
import { updateCardAtom } from '@/src/jotai/cardAtoms';
import { updateOptionAtom } from '@/src/jotai/optionAtoms';

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
