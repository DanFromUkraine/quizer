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
                childrenIds: [],
                explanation: '',
                subtitle: ''
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
                showAnswersImmediately: false,
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
