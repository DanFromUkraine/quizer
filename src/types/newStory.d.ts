
export interface StorySettings {
        showAnswersImmediately: boolean;
        isSmartMode: boolean;
        numOfExplicitCards: number;
        numOfNormalCards: number;
        numOfTypeInCards: number;
        numOfIsCorrectCards: number;
        bookId: string;
}

export interface NewStoryTemporaryInfo {
        maxNumOfExplicitCards: number;
        maxNumOfNormalCards: number;
        maxNumOfTypeInCards: number;
        maxNumOfIsCorrectCards: number;
}
