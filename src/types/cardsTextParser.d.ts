
export interface FullOptionFromText {
        optionTitle: string;
        isCorrect: boolean;
}

export interface FullCardFromText {
        type: 'explicit';
        cardTitle: string;
        subtitle: string ;
        options: FullOptionFromText[];
        explanation: string;
}

export interface FullTermDefinitionCardFromText {
        type: 'short';
        term: string;
        definition: string;
}
