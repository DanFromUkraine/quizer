
export interface FullOptionFromText {
        optionTitle: string;
        isCorrect: boolean;
}

export interface FullCardFromText {
        cardTitle: string;
        subtitle: string | undefined;
        options: FullOptionFromText[];
        explanation: string | undefined;
}

export interface FullTermDefinitionCardFromText {
        term: string;
        definition: string;
}
