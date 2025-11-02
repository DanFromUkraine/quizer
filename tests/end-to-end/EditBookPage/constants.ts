import {
        TestExplicitCardViaText,
        TestOption,
        TestShortCardViaText,
        WithInvalidData
} from '@/tests/end-to-end/EditBookPage/types';

export const EXAMPLE_STR = 'This is an example string';

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

export const EXAMPLE_DATA_FOR_UPDATE_CARDS_FROM_TEXT__MIXED_MODE: (
        | TestShortCardViaText
        | TestExplicitCardViaText
)[] = [
        {
                type: 'short',
                term: 'Term 3 (Changed)',
                definition: 'Definition for term 3 (Changed)'
        },
        {
                type: 'explicit',
                title: 'Explicit card 3 (Changed)',
                subtitle: 'Subtitle for explicit card 3 (Changed)',
                options: [
                        {
                                optionTitle: 'Option 1 (Changed)',
                                isCorrect: true /* Also changed isCorrect */
                        },
                        { optionTitle: 'Option 2 (Changed)', isCorrect: false },
                        { optionTitle: 'Option 3 (Changed)', isCorrect: false },
                        { optionTitle: 'Option 4 (Changed)', isCorrect: false }
                ],
                explanation: 'Explanation for explicit card 3 (Changed)'
        },
        {
                type: 'short',
                term: 'Term 2 (Changed)',
                definition: 'Definition for term 2 (Changed)'
        },
        {
                type: 'explicit',
                title: 'Explicit card 2 (Changed)',
                subtitle: 'Subtitle for explicit card 2 (Changed)',
                options: [
                        {
                                optionTitle: 'Option 1 (Changed)',
                                isCorrect: false /* Also changed isCorrect */
                        },
                        { optionTitle: 'Option 2 (Changed)', isCorrect: true },
                        { optionTitle: 'Option 3 (Changed)', isCorrect: false },
                        { optionTitle: 'Option 4 (Changed)', isCorrect: false }
                ],
                explanation: 'Explanation for explicit card 2 (Changed)'
        },
        {
                type: 'short',
                term: 'Term 1 (Changed)',
                definition: 'Definition for term 1 (Changed)'
        },
        {
                type: 'explicit',
                title: 'Explicit card 1 (Changed)',
                subtitle: 'Subtitle for explicit card 1 (Changed)',
                options: [
                        {
                                optionTitle: 'Option 1 (Changed)',
                                isCorrect: false /* Also changed isCorrect */
                        },
                        { optionTitle: 'Option 2 (Changed)', isCorrect: false },
                        { optionTitle: 'Option 3 (Changed)', isCorrect: true },
                        { optionTitle: 'Option 4 (Changed)', isCorrect: false }
                ],
                explanation: 'Explanation for explicit card 1 (Changed)'
        }
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

export const EXP_CARDS_TEXT_TITLE_ONLY: {
        inputText: string;
        expectedData: TestExplicitCardViaText[];
} = {
        inputText: '&& Card 1 && card 2 && card 3',
        expectedData: [
                {
                        type: 'explicit',
                        title: 'Card 1',
                        subtitle: '',
                        explanation: '',
                        options: []
                },
                {
                        type: 'explicit',
                        title: 'card 2',
                        subtitle: '',
                        explanation: '',
                        options: []
                },
                {
                        type: 'explicit',
                        title: 'card 3',
                        subtitle: '',
                        explanation: '',
                        options: []
                }
        ]
};

export const EXAMPLE_DATA_FOR_CARDS_FROM_TEXT_WITH_INVALID__MIX_MODE: WithInvalidData =
        {
                inputText: `
        @@ - definition for invalid term
        @@ invalid term, where no definition
        @@ correct term - correct definition -*&#@
        @@ - incorrect definition one more time
        @@ correct term 22 - correct definition 2222!)
        `,
                expectedData: [
                        {
                                type: 'short',
                                term: 'correct term',
                                definition: 'correct definition -*&#@'
                        },
                        {
                                type: 'short',
                                term: 'correct term 22',
                                definition: 'correct definition 2222!)'
                        }
                ]
        };

export const EXAMPLE_DATA_FOR_CARDS_FROM_TEXT_WITH_INVALID__SHORT_ONLY_MODE: WithInvalidData =
        {
                inputText: `
- definition for invalid term
invalid term, where no definition
correct term - correct definition -*&#@
- incorrect definition one more time
correct term 22 - correct definition 2222!)
        `,
                expectedData: [
                        {
                                type: 'short',
                                term: 'correct term',
                                definition: 'correct definition -*&#@'
                        },

                        {
                                type: 'short',
                                term: 'correct term 22',
                                definition: 'correct definition 2222!)'
                        }
                ]
        };
