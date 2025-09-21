import {
        booksFamilyAtom,
        cardsFamilyAtom,
        optionsFamilyAtom,
        updateBookAtom,
        updateCardAtom,
        updateOptionAtom
} from '@/src/jotai/mainDbAtom';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

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
