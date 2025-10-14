import {
        deleteExplicitCardStoryIdb,
        updateExplicitCardStoryIdb
} from '@/src/utils/idb/main/actions';
import { explicitCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import {
        getAtomFamilyDeleteAtom_NoFatherUpdate,
        getAtomFamilyUpdateAtom
} from '@/src/utils/jotai/helpers';

export const updateExplicitCardStoryAtom = getAtomFamilyUpdateAtom({
        atomFamily: explicitCardStoriesAtomFamily,
        updateIdb: updateExplicitCardStoryIdb
});

export const deleteExplicitCardStoryAtom =
        getAtomFamilyDeleteAtom_NoFatherUpdate({
                atomFamily: explicitCardStoriesAtomFamily,
                deleteIdb: deleteExplicitCardStoryIdb
        });
