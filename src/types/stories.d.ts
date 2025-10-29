export interface OptionStory {
        title: string;
        isCorrect: boolean;
}

export interface Story {
        id: string;
        bookId: string;
        isCompleted: boolean;
        showAnswersImmediately: boolean;
        timeSpentSec: number;
        playStartDate: number;
        cardIdsOrder: string[];
        explicitCardStoryIds: string[];
        typeInCardStoryIds: string[];
        isCorrectCardStoryIds: string[];
        bookData: {
                title: string;
                description: string;
        };
}

export interface ExplicitCardStory {
        id: string;
        type: 'story-explicitCard';
        title: string;
        subtitle: string;
        explanation: string;
        options: OptionStory[];
        currentValue: number[];
}

export interface TypeInCardStory {
        id: string;
        type: 'story-typeInCard';
        definition: string;
        expectedInput: string;
        currentValue: string;
        answerRevealed: boolean;
}

export interface IsCorrectCardStory {
        id: string;
        type: 'story-isCorrectCard';
        term: string;
        definition: string;
        isCorrect: boolean;
        currentValue: null | boolean;
}

export type AnyCardStory =
        | ExplicitCardStory
        | TypeInCardStory
        | IsCorrectCardStory;
