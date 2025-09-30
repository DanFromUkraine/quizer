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

export type AvailableTemplateTypes =
        | 'books'
        | 'explicitCards'
        | 'shortCards'
        | 'options';

export function getTemplate(
        templateType: keyof Omit<StoreMap, 'history'>,
        id: string
) {
        const templates = {
                explicitCards: getEmptyCardTemplate,
                shortCards: getEmptyTermDefinitionCard,
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
