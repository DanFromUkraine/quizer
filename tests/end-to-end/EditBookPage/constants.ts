export const EXAMPLE_STR = 'This is an example string';

type TestOption = {
        isCorrect: boolean;
        title: string;
};

export const UPDATE_OPTION_DATA: TestOption[] = [
        {
                isCorrect: false,
                title: 'This is option n1'
        },
        {
                isCorrect: true,
                title: 'This is option n22'
        },
        {
                isCorrect: false,
                title: 'This is option n333'
        },
        {
                isCorrect: false,
                title: 'This is option n4444'
        },
        {
                isCorrect: true,
                title: 'This is option n55555'
        },
        {
                isCorrect: false,
                title: 'This is option n666666'
        },
        {
                isCorrect: true,
                title: 'This is option n7777777'
        }
];

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

export const EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__MIXED_MODE: (
        | TestShortCardViaText
        | TestExplicitCardViaText
)[] = [
        {
                type: 'explicit',
                title: 'Explicit card 1',
                subtitle: 'Subtitle for explicit card 1',
                options: [
                        { optionTitle: 'Option 1', isCorrect: true },
                        { optionTitle: 'Option 2', isCorrect: false },
                        { optionTitle: 'Option 3', isCorrect: false },
                        { optionTitle: 'Option 4', isCorrect: false }
                ],
                explanation: 'Explanation for explicit card 1'
        },
        {
                type: 'short',
                term: 'Term 1',
                definition: 'Definition for term 1'
        },
        {
                type: 'explicit',
                title: 'Explicit card 2',
                subtitle: 'Subtitle for explicit card 2',
                options: [
                        { optionTitle: 'Option 1', isCorrect: false },
                        { optionTitle: 'Option 2', isCorrect: true },
                        { optionTitle: 'Option 3', isCorrect: false },
                        { optionTitle: 'Option 4', isCorrect: false }
                ],
                explanation: 'Explanation for explicit card 2'
        },
        { type: 'short', term: 'Term 2', definition: 'Definition for term 2' },
        {
                type: 'explicit',
                title: 'Explicit card 3',
                subtitle: 'Subtitle for explicit card 3',
                options: [
                        { optionTitle: 'Option 1', isCorrect: false },
                        { optionTitle: 'Option 2', isCorrect: false },
                        { optionTitle: 'Option 3', isCorrect: true },
                        { optionTitle: 'Option 4', isCorrect: false }
                ],
                explanation: 'Explanation for explicit card 3'
        },
        { type: 'short', term: 'Term 3', definition: 'Definition for term 3' }
];

export const EXAMPLE_DATA_FOR_CARDS_FROM_TEXT__SHORT_CARDS_ONLY: TestShortCardViaText[] =
        [
                {
                        type: 'short',
                        term: '(1) Term in short cards only mode',
                        definition: '(1) Definition for such card'
                },
                {
                        type: 'short',
                        term: '(2) Term in short cards only mode',
                        definition: '(2) Definition for such card'
                },
                {
                        type: 'short',
                        term: '(3) Term in short cards only mode',
                        definition: '(3) Definition for such card'
                },
                {
                        type: 'short',
                        term: '(4) Term in short cards only mode',
                        definition: '(4) Definition for such card'
                },
                {
                        type: 'short',
                        term: '(5) Term in short cards only mode',
                        definition: '(5) Definition for such card'
                },
                {
                        type: 'short',
                        term: '(6) Term in short cards only mode',
                        definition: '(6) Definition for such card'
                }
        ];
