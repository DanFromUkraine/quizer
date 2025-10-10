import { atom } from 'jotai';
import {
        booksAndStoriesAssociationsAtom,
        booksAtomFamily,
        storiesAtomFamily
} from '@/src/jotai/mainAtoms';
import {
        ExplicitCard,
        Story,
        TermDefinitionCard
} from '@/src/types/mainDbGlobal';
import { getDerivedAtomWithIdb } from '@/src/utils/jotai/mainDbUtils';
import { deleteStoryIdb, updateStoryIdb } from '@/src/utils/idb/main/actions';
import {
        currentStoryIdAtom,
        deleteIdAtom,
        storyIdsAtom
} from '@/src/jotai/idManagers';
import { StoriesByBook } from '@/src/types/historyPage';

type TemporaryExplicitCard = Omit<ExplicitCard, 'type' | 'childrenIds' | 'id'>;
type TemporaryShortCard = Omit<TermDefinitionCard, 'type'>;

type TemporaryDefinition = {
        definition: string;
        id: string;
};

export const deleteStoryAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, storyId: string) => {
                await deleteStoryIdb(mainDb, storyId);
                storiesAtomFamily.remove(storyId);
                set(deleteIdAtom, {
                        idManager: storyIdsAtom,
                        deleteId: storyId
                });
        }
);

export const finishStoryAtom = getDerivedAtomWithIdb(
        async (get, set, mainDb, storyId: string) => {
                const prevStory = get(storiesAtomFamily(storyId));
                const newStory: Story = {
                        ...prevStory,
                        isCompleted: true
                };
                await updateStoryIdb(mainDb, newStory);
                set(storiesAtomFamily(storyId), newStory);
        }
);

export const getChoiceIndexMade = (cardIndex: number) =>
        atom((get) => {
                const storyId = get(currentStoryIdAtom);
                return get(storiesAtomFamily(storyId)).choicePointers[
                        cardIndex
                ];
        });

export const saveChoice = getDerivedAtomWithIdb(
        async (
                get,
                set,
                mainDb,
                {
                        cardIndex,
                        optionIndex
                }: { cardIndex: number; optionIndex: number }
        ) => {
                const storyId = get(currentStoryIdAtom);
                const { choicePointers, ...other } = get(
                        storiesAtomFamily(storyId)
                );
                if (typeof choicePointers[cardIndex] !== 'undefined') return;
                const newChoicePointers = [...choicePointers];
                newChoicePointers[cardIndex] = optionIndex;
                const newStory: Story = {
                        ...other,
                        choicePointers: newChoicePointers
                };
                await updateStoryIdb(mainDb, newStory);
                set(storiesAtomFamily(storyId), newStory);
        }
);

export const storiesSortedByBookAtom = atom((get) => {
        const bookAndStoriesAssociations = get(booksAndStoriesAssociationsAtom);
        const bookIds = Object.keys(bookAndStoriesAssociations);

        return bookIds.map((bookId) => {
                const { bookTitle } = get(booksAtomFamily(bookId));
                return {
                        bookTitle,
                        storyIds: bookAndStoriesAssociations[bookId]
                };
        }) as StoriesByBook[];
});

export const canRevealChoicesAtom =
        /* Important: this atom is meant to be used by few independent components with their own local Provider scopes*/ atom(
                false
        );
