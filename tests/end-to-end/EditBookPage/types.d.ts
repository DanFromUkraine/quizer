

export type CardsAsTextModes = 'mixed' | 'short-cards-only';
export type MixedCard = TestExplicitCardViaText | TestShortCardViaText;

export type TestOption = {
        isCorrect: boolean;
        title: string;
};

export type TestShortCardViaText = {
        type: 'short';
        term: string;
        definition: string;
};

export type TestOptionViaText = {
        optionTitle: string;
        isCorrect: boolean;
};

export type TestExplicitCardViaText = {
        type: 'explicit';
        title: string;
        subtitle: string;
        explanation: string;
        options: TestOptionViaText[];
};

export type WithInvalidData = {
        inputText: string;
        expectedData: TestShortCardViaText[];
};