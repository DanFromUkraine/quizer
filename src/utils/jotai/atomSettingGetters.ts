import {
        FullCardFromText,
        FullOptionFromText
} from '@/src/utils/parseTextIntoCardsArray';
import {
        booksAtomFamily,
        explicitCardsAtomFamily,
} from '@/src/jotai/mainAtoms';
import {
        FatherFamilyAtom,
        SetterAtomForDeleteViaTextProps,
        SetterAtomForInsertionViaTextProps,
        SetterAtomForUpdateViaTextProps
} from '@/src/types/jotai/cardsTextParserFactories';
import {
        addNewCardViaTextAtom,
        deleteCardViaTextAtom,
        updateCardViaTextAtom
} from '@/src/jotai/cardAtoms';
import {
        addNewOptionViaTextAtom,
        deleteOptionViaTextAtom,
        updateOptionViaTextAtom
} from '@/src/jotai/optionAtoms';

export const getSettingsForUpdateCard = ({
        bookId,
        cardsArray
}: {
        bookId: string;
        cardsArray: FullCardFromText[];
}): SetterAtomForUpdateViaTextProps<FullCardFromText> => ({
        fatherId: bookId,
        fatherFamily: booksAtomFamily as FatherFamilyAtom,
        items: cardsArray,
        updateActionAtom: updateCardViaTextAtom
});

export const getSettingsForInsertCard = ({
        bookId,
        cardsArray
}: {
        bookId: string;
        cardsArray: FullCardFromText[];
}): SetterAtomForInsertionViaTextProps<FullCardFromText> => ({
        fatherId: bookId,
        fatherFamily: booksAtomFamily as FatherFamilyAtom,
        insertActionAtom: addNewCardViaTextAtom,
        items: cardsArray
});

export const getSettingsForDeleteCard = ({
        bookId,
        cardsArray
}: {
        bookId: string;
        cardsArray: FullCardFromText[];
}): SetterAtomForDeleteViaTextProps<FullCardFromText> => ({
        fatherId: bookId,
        fatherFamily: booksAtomFamily as FatherFamilyAtom,
        deleteActionAtom: deleteCardViaTextAtom,
        items: cardsArray
});

export const getSettingsForInsertOptions = ({
        cardId,
        options
}: {
        cardId: string;
        options: FullOptionFromText[];
}): SetterAtomForInsertionViaTextProps<FullOptionFromText> => ({
        fatherId: cardId,
        fatherFamily: explicitCardsAtomFamily as FatherFamilyAtom,
        insertActionAtom: addNewOptionViaTextAtom,
        items: options
});

export const getSettingsForDeleteOptions = ({
        cardId,
        options
}: {
        cardId: string;
        options: FullOptionFromText[];
}): SetterAtomForDeleteViaTextProps<FullOptionFromText> => ({
        fatherId: cardId,
        fatherFamily: explicitCardsAtomFamily as FatherFamilyAtom,
        deleteActionAtom: deleteOptionViaTextAtom,
        items: options
});

export const getSettingsForUpdateOptions = ({
        cardId,
        options
}: {
        cardId: string;
        options: FullOptionFromText[];
}): SetterAtomForUpdateViaTextProps<FullOptionFromText> => ({
        fatherId: cardId,
        fatherFamily: explicitCardsAtomFamily as FatherFamilyAtom,
        updateActionAtom: updateOptionViaTextAtom,
        items: options
});
