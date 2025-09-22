import { Book, Card, ObjectStores, Option } from '@/src/types/mainDbGlobal';

function getEmptyBookTemplate(id: string): Book {
        return {
                id,
                bookTitle: '',
                lastChangeDate: Date.now(),
                description: "",
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
        templateType: ObjectStores,
        id: string
): Book | Card | Option;
export function getTemplate(templateType: ObjectStores, id: string) {
        const templates = {
                cards: getEmptyCardTemplate,
                books: getEmptyBookTemplate,
                options: getEmptyOptionTemplate
        };
        return templates[templateType](id);
}
