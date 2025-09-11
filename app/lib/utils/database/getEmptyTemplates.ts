import { Book, Card, Option } from '@/app/lib/types/mainDb';

export function getEmptyBookTemplate(id: string): Book {
        return {
                id,
                bookTitle: '',
                lastChangeDate: Date.now(),
                cardIds: []
        };
}

export function getEmptyCardTemplate(id: string): Card {
        return {
                id,
                cardTitle: '',
                optionIds: []
        };
}

export function getEmptyOptionTemplate(id: string): Option {
        return {
                id,
                content: '',
                isCorrect: false
        };
}
