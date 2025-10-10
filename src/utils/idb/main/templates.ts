import {
        Book,
        ExplicitCard,
        ExplicitCardStory,
        IsCorrectCardStory,
        Option,
        StoreMap,
        Story,
        TermDefinitionCard,
        TypeInCardStory
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

function getEmptyStoryTemplate(storyId: string): Story {
        return {
                id: storyId,
                bookId: '',
                timeSpentSec: 0,
                showAnswersImmediately: false,
                isCompleted: false,
                playStartDate: Date.now(),
                cardIdsOrder: [],
                explicitCardStoryIds: [],
                typeInCardStoryIds: [],
                isCorrectCardStoryIds: [],
                bookData: {
                        title: '',
                        description: ''
                }
        };
}

function getEmptyExplicitCardStory(id: string): ExplicitCardStory {
        return {
                id,
                title: '',
                explanation: '',
                subtitle: '',
                options: []
        };
}

function getEmptyTypeInCardStory(id: string): TypeInCardStory {
        return {
                id,
                definition: '',
                expectedInput: ''
        };
}

function getEmptyIsCorrectCardStory(id: string): IsCorrectCardStory {
        return {
                id,
                term: '',
                definition: '',
                isCorrect: false
        };
}

export type Templates = {
        books: (id: string) => Book;
        explicitCards: (id: string) => ExplicitCard;
        shortCards: (id: string) => TermDefinitionCard;
        options: (id: string) => Option;
        stories: (storyId: string) => Story;
        explicitCardStories: (id: string) => ExplicitCardStory;
        typeInCardStories: (id: string) => TypeInCardStory;
        isCorrectCardStories: (id: string) => IsCorrectCardStory;
};

const templates: Templates = {
        books: getEmptyBookTemplate,
        explicitCards: getEmptyCardTemplate,
        shortCards: getEmptyTermDefinitionCard,
        options: getEmptyOptionTemplate,
        stories: getEmptyStoryTemplate,
        explicitCardStories: getEmptyExplicitCardStory,
        typeInCardStories: getEmptyTypeInCardStory,
        isCorrectCardStories: getEmptyIsCorrectCardStory
};

export function getTemplate<Key extends keyof StoreMap>(
        tp: Key,
        id: string
): StoreMap[Key] {
        return templates[tp](id) as StoreMap[Key];
}
