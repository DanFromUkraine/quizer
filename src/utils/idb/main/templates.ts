import {
        Book,
        ExplicitCard,
        Option,
        StoreMap,
        Story,
        TermDefinitionCard
} from '@/src/types/mainDbGlobal';

function getEmptyBookTemplate(id: string): Book {
        return {
                id,
                bookTitle: '',
                lastChangeDate: Date.now(),
                description: '',
                cardIdsOrder: [],
                explicitCardIds: [],
                shortCardIds: []
        };
}

function getEmptyCardTemplate(id: string): ExplicitCard {
        return {
                id,
                type: 'explicit',
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

function getEmptyTermDefinitionCard(id: string): TermDefinitionCard {
        return {
                id,
                type: 'short',
                term: '',
                definition: ''
        };
}

const templates = {
        books: getEmptyBookTemplate,
        explicitCards: getEmptyCardTemplate,
        shortCards: getEmptyTermDefinitionCard,
        options: getEmptyOptionTemplate
};

type Templates = typeof templates & {
        [key in keyof typeof templates]: (id: string) => Templates[key];
};

export function getTemplate<Key extends keyof Omit<StoreMap, 'history'>>(
        tp: Key,
        id: string
): StoreMap[Key] {
        return templates[tp](id) as StoreMap[Key];
}

export function getEmptyStoryTemplate(storyId: string): Story {
        return {
                id: storyId,
                bookId: '',
                timeSpentSec: 0,
                isCompleted: false,
                choicePointers: [],
                playStartDate: Date.now(),
                bookData: {
                        title: '',
                        description: '',
                        creationDate: 0,
                        cards: []
                }
        };
}
