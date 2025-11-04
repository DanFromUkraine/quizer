import { atom, Getter } from 'jotai';
import {
        booksAtomFamily,
        explicitCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import {
        hideDialogAtom,
        openDialogAtom
} from '@/src/jotai/dialogVisibilityFamily';
import { NewStoryTemporaryInfo } from '@/src/types/newStory';
import {
        EMPTY_NEW_STORY_TEMPORARY_INFO,
        EMPTY_STORY_SETTINGS_ATOM
} from '@/src/constants/emptyObjects';
import { newStorySettingsAtom } from '@/src/jotai/historyAtoms';

export const newStoryTemporaryInfoAtom = atom<NewStoryTemporaryInfo>(
        EMPTY_NEW_STORY_TEMPORARY_INFO
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
        (_get, set, bookId: string) => {
                set(setNewStorySettingsAtomToDefaultAtom, bookId);
                set(openDialogAtom, 'newStoryParams');
        }
);

export const closeNewStorySettingsDialogAtom = atom(null, (_get, set) => {
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

                set(newStoryTemporaryInfoAtom, {
                        maxNumOfExplicitCards: explicitCardIds.length,
                        maxNumOfNormalCards,
                        maxNumOfTypeInCards: numOfAllCards,
                        maxNumOfIsCorrectCards: numOfAllCards
                });

                set(newStorySettingsAtom, {
                        isSmartMode: true,
                        showAnswersImmediately: false,
                        numOfExplicitCards: explicitCardIds.length,
                        numOfNormalCards: maxNumOfNormalCards,
                        numOfTypeInCards,
                        numOfIsCorrectCards,
                        bookId
                });
        }
);
