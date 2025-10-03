export interface FullOptionFromText {
        optionTitle: string;
        isCorrect: boolean;
}

export interface FullCardFromText {
        type: 'explicit';
        cardTitle: string;
        subtitle: string;
        options: FullOptionFromText[];
        explanation: string;
}

export interface FullTermDefinitionCardFromText {
        type: 'short';
        term: string;
        definition: string;
}

export interface InsertCardsReducerOutput {
        explicitCardIdsToInsert: string[];
        shortCardIdsToInsert: string[];
        cardIdsOrderToInsert: string[];
}

export interface DeleteCardsReducerOutput {
        explicitCardIdsToDelete: string[];
        shortCardIdsToDelete: string[];
        cardIdsOrderToDelete: string[];
}

export interface UpdateCardsReducerOutput {
        explicitCardIdsToInsertAfterTypeChange: string[];
        explicitCardIdsToDeleteAfterTypeChange: string[];
        shortCardIdsToInsertAfterTypeChange: string[];
        shortCardIdsToDeleteAfterTypeChange: string[];
}

export type ReducerInsertCallback = (
        _acc: Promise<InsertCardsReducerOutput>,
        card: FullCardFromText | FullTermDefinitionCardFromText
) => Promise<InsertCardsReducerOutput>;

export type ReducerDeleteCallback = (
        _acc: Promise<DeleteCardsReducerOutput>,
        cardId: string
) => Promise<DeleteCardsReducerOutput>;

export type CardUpdateReducer = (
        _acc: Promise<UpdateCardsReducerOutput>,
        card: FullCardFromText | FullTermDefinitionCardFromText,
        index: number
) => Promise<UpdateCardsReducerOutput>;

export type WithId = {
        id: string;
};

export type InsertOptionReducer = (
        acc: Promise<string[]>,
        option: FullOptionFromText
) => Promise<string[]>;
export type DeleteOptionReducer = (
        acc: Promise<string[]>,
        deleteOptionId: string
) => Promise<string[]>;
export type UpdateOptionCallback = (
        option: FullOptionFromText,
        index: number
) => Promise<void>;


export type MarkupModes = "mixed" | "short-only"
export type MarkupModesUiList = {
        modeId: MarkupModes,
        title: string
}[]