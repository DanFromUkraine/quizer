/* 'todo' - I see there's some code duplications.
1. updateIsCorrectCardStoryAtom - updateExplicitCardStoryAtom - updateTypeInCardStoryAtom - updateExplicitCardAtom - updateShortCardAtom
2. deleteIsCorrectCardStoryAtom - deleteExplicitCardStoryAtom - deleteTypeInCardStoryAtom

*  */

import { deleteIsCorrectCardStoryIdb, updateIsCorrectCardStoryIdb } from '@/src/utils/idb/main/actions';
import { isCorrectCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import { getAtomFamilyDeleteAtom_NoFatherUpdate, getAtomFamilyUpdateAtom } from '@/src/utils/jotai/helpers';

export const updateIsCorrectCardStoryAtom = getAtomFamilyUpdateAtom({
        atomFamily: isCorrectCardStoriesAtomFamily,
        updateIdb: updateIsCorrectCardStoryIdb
});

export const deleteIsCorrectCardStoryAtom =
        getAtomFamilyDeleteAtom_NoFatherUpdate({
                atomFamily: isCorrectCardStoriesAtomFamily,
                deleteIdb: deleteIsCorrectCardStoryIdb
        });
