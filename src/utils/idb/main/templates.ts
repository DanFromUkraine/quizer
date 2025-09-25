import {
        Book,
        Card,
        ObjectStoreKeysNoHistory,
        Option,
        Story
} from '@/src/types/mainDbGlobal';

function getEmptyBookTemplate(id: string): Book {
        return {
                id,
                bookTitle: '',
                lastChangeDate: Date.now(),
                description: '',
                childrenIds: []
        };
}

function getEmptyCardTemplate(id: string): Card {
        return {
                id,
                cardTitle: '',
                childrenIds: []
        };
}

function getEmptyOptionTemplate(id: string): Option {
        return {
                id,
                optionTitle: '',
                isCorrect: false
        };
}

export function getTemplate(templateType: 'books', id: string): Book;
export function getTemplate(templateType: 'cards', id: string): Card;
export function getTemplate(templateType: 'options', id: string): Option;
export function getTemplate(
        templateType: ObjectStoreKeysNoHistory,
        id: string
): Book | Card | Option;
export function getTemplate(templateType: ObjectStoreKeysNoHistory, id: string) {
        const templates = {
                cards: getEmptyCardTemplate,
                books: getEmptyBookTemplate,
                options: getEmptyOptionTemplate
        };
        return templates[templateType](id);
}

export function getEmptyStoryTemplate(storyId: string): Story {
        return {
                id: storyId,
                bookId: '',
                timeSpentSec: 0,
                isCompleted: false,
                bookData: {
                        title: '',
                        description: '',
                        creationDate: 0,
                        cards: []
                }
        };
}
