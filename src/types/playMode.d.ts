
export interface PlayOption {
        title: string;
        isCorrect: boolean;
}

export interface PlayExplicitCard {
        type: "play-explicit"
        title: string;
        subtitle: string;
        explanation: string;
        options: PlayOption[]
}

export interface PlayNormalCard {
        type: "play-normal"
        title: string;
        options: PlayOption[]
}

export interface PlayIsCorrectCard {
        type: "play-isCorrect"
        term: string;
        definition: string;
        isCorrect: boolean;
}

export interface PlayTypeInCard {
        type: "play-typeIn"
        term: string;
        expectedInput: string;
}