import {
        ExplicitCardDataStore,
        ExplicitOptionDataStore
} from '@/src/utils/parseTextIntoCardsArray';
import {
        addNewCardViaTextAtom,
        addNewOptionViaTextAtom,
        booksFamilyAtom,
        cardsFamilyAtom,
        deleteCardAtom,
        deleteOptionViaTextAtom,
        updateCardViaTextAtom,
        updateOptionViaTextAtom
} from '@/src/jotai/mainDbAtom';
import {
        FatherFamilyAtom,
        SetterAtomForDeleteViaTextProps,
        SetterAtomForInsertionViaTextProps,
        SetterAtomForUpdateViaTextProps
} from '@/src/types/jotai/cardsTextParserFactories';

export const getSettingsForUpdateCard = ({
        bookId,
        cardsArray
}: {
        bookId: string;
        cardsArray: ExplicitCardDataStore[];
}): SetterAtomForUpdateViaTextProps<ExplicitCardDataStore> => ({
        fatherId: bookId,
        fatherFamily: booksFamilyAtom as FatherFamilyAtom,
        items: cardsArray,
        updateActionAtom: updateCardViaTextAtom
});

export const getSettingsForInsertCard = ({
        bookId,
        cardsArray
}: {
        bookId: string;
        cardsArray: ExplicitCardDataStore[];
}): SetterAtomForInsertionViaTextProps<ExplicitCardDataStore> => ({
        fatherId: bookId,
        fatherFamily: booksFamilyAtom as FatherFamilyAtom,
        insertActionAtom: addNewCardViaTextAtom,
        items: cardsArray
});

export const getSettingsForDeleteCard = ({
        bookId,
        cardsArray
}: {
        bookId: string;
        cardsArray: ExplicitCardDataStore[];
}): SetterAtomForDeleteViaTextProps<ExplicitCardDataStore> => ({
        fatherId: bookId,
        fatherFamily: booksFamilyAtom as FatherFamilyAtom,
        deleteActionAtom: deleteCardAtom,
        items: cardsArray
});

export const getSettingsForInsertOptions = ({
        cardId,
        options
}: {
        cardId: string;
        options: ExplicitOptionDataStore[];
}) => ({
        fatherId: cardId,
        fatherFamily: cardsFamilyAtom as FatherFamilyAtom,
        insertActionAtom: addNewOptionViaTextAtom,
        items: options
});

export const getSettingsForDeleteOptions = ({
        cardId,
        options
}: {
        cardId: string;
        options: ExplicitOptionDataStore[];
}): SetterAtomForDeleteViaTextProps<ExplicitOptionDataStore> => ({
        fatherId: cardId,
        fatherFamily: cardsFamilyAtom as FatherFamilyAtom,
        deleteActionAtom: deleteOptionViaTextAtom,
        items: options
});

export const getSettingsForUpdateOptions = ({
        cardId,
        options
}: {
        cardId: string;
        options: ExplicitOptionDataStore[];
}) => ({
        fatherId: cardId,
        fatherFamily: cardsFamilyAtom as FatherFamilyAtom,
        updateActionAtom: updateOptionViaTextAtom,
        items: options
});
