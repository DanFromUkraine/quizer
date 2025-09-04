type PlaywrightTestOption = {
        optionText: string;
        isTicked: boolean;
};

export type PlaywrightTestCard = {
        questionTitle: string;
        options: PlaywrightTestOption[];
};
