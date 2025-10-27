export const BASE_DIALOG_TEST_IDS = {
        defCloseBtn: 'Close dialog BUTTON'
};

export const BP_TEST_IDS = {
        // Book page test ids
        addNewBookBtn: 'Create new empty book BUTTON',
        bookCard: {
                me: 'BOOK CARD CONTAINER',
                editBookBtn: 'edit book BUTTON',
                deleteBookBtn: 'delete book BUTTON',
                playBookBtn: 'play book BUTTON'
        },
        bookStoriesDialog: {
                me: 'BOOK STORIES DIALOG CONTAINER',
                storyCard: 'Story card related to this book',
                ...BASE_DIALOG_TEST_IDS
        },
        newStoryDialog: {
                me: 'CREATE NEW STORY DIALOG',
                isSmartModeInp: 'are cards distributed via smart way INPUT',
                areAnswersShownImmediatelyInp:
                        'are answers shown immediately INPUT',
                numOfExpCardsInp:
                        'custom param --> number of explicit cards INPUT',
                numOfNormCardsInp:
                        'custom param --> number of regular cards INPUT',
                numOfTypeInCards:
                        'custom param --> number of type in cards INPUT',
                numOfIsCorrectCards:
                        'custom param --> number of isCorrect cards INPUT',
                submitBtn: 'Submit params and create new story BUTTON',
                ...BASE_DIALOG_TEST_IDS
        }
};

export const EP_TEST_IDS = {
        // Edit book page test ids
        bookTitleInp: 'Edit book title INPUT', // +
        bookDescInp: 'Edit book description INPUT', // +
        openDialogBtnCardsAsText: 'open dialog BUTTON to edit cards as text',
        cardsAsTextDialog: {
                me: 'EDIT CARDS AS TEXT DIALOG CONTAINER',
                saveAndExitBtn: 'Save and exit BUTTON',
                mixedModeBtn: 'Choose mixed mode BUTTON',
                shortCardsOnlyModeBtn: 'Choose short cards only mode BUTTON',
                mainInp: 'Edit cards as text dialog --> main INPUT'
        },
        card: {
                me: 'CARD CONTAINER',
                deleteBtn: 'delete card BUTTON',
                explicitCardContent: {
                        me: 'EXPLICIT CARD CONTENT CONTAINER',
                        titleInp: 'edit explicit card --> title INPUT',
                        subtitleInp: 'Edit explicit card --> subtitle INPUT',
                        option: {
                                me: 'OPTION',
                                mainOptBody: {
                                        me: 'MAIN OPTION BODY',
                                        changeIsCorrectCheckbox:
                                                'Edit explicit card --> edit option --> change option is correct CHECKBOX',
                                        titleInp: 'Edit explicitCard --> edit option --> option title INPUT',
                                        deleteBtn: 'Edit explicit card --> delete option BUTTON'
                                },
                                changeIsCorrectCheckbox_MobileOnly:
                                        'Edit explicit card --> edit option --> change option is correct CHECKBOX'
                        },
                        newOptionBtn:
                                'Edit explicit card --> create new empty option BUTTON',
                        explanationInp:
                                'Edit explicit card --> explanation INPUT'
                },
                shortCardContent: {
                        me: 'SHORT CARD CONTENT CONTAINER',
                        termInp: 'Edit short card --> term INPUT',
                        definitionInp: 'Edit short card --> definition INPUT'
                }
        },

        newExpCardBtn: 'Add new empty explicit card BUTTON',
        newShortCardBtn: 'Add new empty short card BUTTON'
};

export const PP_TEST_IDS = {
        // Play page test ids
};

export const SP_TEST_IDS = {
        // Stories page test ids
};
