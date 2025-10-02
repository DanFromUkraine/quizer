
export interface FullOptionFromText {
        optionTitle: string;
        isCorrect: boolean;
}

export interface FullCardFromText {
        type: 'explicit';
        cardTitle: string;
        subtitle: string | undefined;
        options: FullOptionFromText[];
        explanation: string | undefined;
}

export interface FullTermDefinitionCardFromText {
        type: 'short';
        term: string;
        definition: string;
}
