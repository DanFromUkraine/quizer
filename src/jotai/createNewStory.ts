import { atom, Getter } from 'jotai';
import {
        booksAtomFamily,
        explicitCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import {
        hideDialogAtom,
        openDialogAtom
} from '@/src/jotai/dialogVisibilityFamily';

interface StorySettings {
        isSmartMode: boolean;
        maxNumOfExplicitCards: number;
        maxNumOfNormalCards: number;
        maxNumOfTypeInCards: number;
        maxNumOfIsCorrectCards: number;
        numOfExplicitCards: number;
        numOfNormalCards: number;
        numOfTypeInCards: number;
        numOfIsCorrectCards: number;
}

const EMPTY_STORY_SETTINGS_ATOM: StorySettings = {
        isSmartMode: false,
        maxNumOfExplicitCards: 0,
        maxNumOfNormalCards: 0,
        maxNumOfTypeInCards: 0,
        maxNumOfIsCorrectCards: 0,
        numOfExplicitCards: 0,
        numOfNormalCards: 0,
        numOfTypeInCards: 0,
        numOfIsCorrectCards: 0
};

export const newStorySettingsAtom = atom<StorySettings>(
        EMPTY_STORY_SETTINGS_ATOM
);

function getNumOfAllExplicitCardOptionsInBook({
        get,
        explicitCardIds
}: {
        get: Getter;
        explicitCardIds: string[];
}) {
        let numOfOptions = 0;

        for (const cardId of explicitCardIds) {
                const { childrenIds } = get(explicitCardsAtomFamily(cardId));
                numOfOptions += childrenIds.length;
        }

        return numOfOptions;
}

export const openNewStorySettingsDialogAtom = atom(
        null,
        (get, set, bookId: string) => {
                set(setNewStorySettingsAtomToDefaultAtom, bookId);
                set(openDialogAtom, 'newStoryParams');
        }
);

export const closeNewStorySettingsDialogAtom = atom(null, (get, set) => {
        set(newStorySettingsAtom, EMPTY_STORY_SETTINGS_ATOM);
        set(hideDialogAtom, 'newStoryParams');
});

const setNewStorySettingsAtomToDefaultAtom = atom(
        null,
        (get, set, bookId: string) => {
                const { shortCardIds, explicitCardIds } = get(
                        booksAtomFamily(bookId)
                );

                const numOfExplicitCardOptions =
                        getNumOfAllExplicitCardOptionsInBook({
                                get,
                                explicitCardIds
                        });

                const maxNumOfNormalCards = Math.floor(
                        (numOfExplicitCardOptions + shortCardIds.length) / 4
                );

                const numOfTypeInCards = Math.floor(
                        (shortCardIds.length - maxNumOfNormalCards) / 2
                );
                const numOfIsCorrectCards = Math.floor(
                        (shortCardIds.length - maxNumOfNormalCards) / 2
                );
                const numOfAllCards =
                        explicitCardIds.length + shortCardIds.length;

                set(newStorySettingsAtom, {
                        isSmartMode: true,
                        maxNumOfExplicitCards: explicitCardIds.length,
                        maxNumOfNormalCards,
                        maxNumOfTypeInCards: numOfAllCards,
                        maxNumOfIsCorrectCards: numOfAllCards,
                        numOfExplicitCards: explicitCardIds.length,
                        numOfNormalCards: maxNumOfNormalCards,
                        numOfTypeInCards,
                        numOfIsCorrectCards
                });
        }
);
