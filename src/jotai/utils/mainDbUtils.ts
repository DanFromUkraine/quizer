import {
        getEmptyBookTemplate,
        getEmptyCardTemplate,
        getEmptyOptionTemplate
} from '@/src/idb/main/templates';
import { atom, Getter, Setter, WritableAtom } from 'jotai';
import { Book, Card, Option } from '@/src/types/mainDb';
import {
        booksFamilyAtom,
        booksIdsAtom,
        cardsFamilyAtom,
        optionsFamilyAtom
} from '@/src/jotai/mainDbAtom';
import { getFilteredIds } from '@/src/utils/database/idUtils';

export function getBookAtom(id: string): WritableAtom<Book, [Book], unknown> {
        return atom(getEmptyBookTemplate(id));
}

export function getCardAtom(id: string): WritableAtom<Card, [Card], unknown> {
        return atom(getEmptyCardTemplate(id));
}

export function getOptionAtom(
        id: string
): WritableAtom<Option, [Option], unknown> {
        return atom(getEmptyOptionTemplate(id));
}

export function addEmptyBookAtomHelper(set: Setter, id: string) {
        const newBookAtom = booksFamilyAtom(id);
        const bookTemplate = getEmptyBookTemplate(id);
        set(booksIdsAtom, (prev) => [...prev, id]);
        set(newBookAtom, bookTemplate);
}

export function deleteBookAtomHelper(set: Setter, id: string) {
        set(booksIdsAtom, (prev) => prev.filter((lastId) => lastId !== id));
        booksFamilyAtom.remove(id);
}

export function updateBookAtomHelper(set: Setter, newBook: Book) {
        const bookAtom = booksFamilyAtom(newBook.id);
        set(bookAtom, newBook);
}

export function getBookWithUpdatedTitle(
        get: Getter,
        id: string,
        newTitle: string
): Book {
        const prevBook = get(booksFamilyAtom(id));
        return {
                ...prevBook,
                bookTitle: newTitle
        };
}

export function getNewBookWithFilteredIds(
        get: Getter,
        bookId: string,
        idToDelete: string
) {
        const prevBook = get(booksFamilyAtom(bookId));
        const filteredIds = getFilteredIds(prevBook.cardIds, idToDelete);
        return {
                ...prevBook,
                filteredIds
        };
}

export function getBookWithNewId(get: Getter, bookId: string, cardId: string) {
        const prevBook = get(booksFamilyAtom(bookId));
        const updatedIds = [...prevBook.cardIds, cardId];
        return {
                ...prevBook,
                cardIds: updatedIds
        };
}

export function updateCardAtomHelper(set: Setter, newCard: Card) {
        const cardAtom = cardsFamilyAtom(newCard.id);
        set(cardAtom, newCard);
}

export function addEmptyCardAtomHelper(set: Setter, id: string) {
        const newCardAtom = cardsFamilyAtom(id);
        const cardTemplate = getEmptyCardTemplate(id);
        set(newCardAtom, cardTemplate);
}

export function getCardWithUpdatedTitleHelper(
        get: Getter,
        id: string,
        newTitle: string
) {
        const prevCard = get(cardsFamilyAtom(id));
        return {
                ...prevCard,
                cardTitle: newTitle
        };
}

export function updateOptionAtomHelper(set: Setter, newOption: Option) {
        const optionAtom = optionsFamilyAtom(newOption.id);
        set(optionAtom, newOption);
}

export function getNewOptionWithChangedCorrectness(
        get: Getter,
        optionId: string,
        isCorrect: boolean
) {
        const optionAtom = optionsFamilyAtom(optionId);
        const prevOption = get(optionAtom);
        return {
                ...prevOption,
                isCorrect
        };
}

