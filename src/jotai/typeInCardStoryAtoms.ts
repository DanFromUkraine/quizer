import {
        deleteTypeInCardStoryIdb,
        updateTypeInCardStoryIdb
} from '@/src/utils/idb/main/actions';
import { typeInCardStoriesAtomFamily } from '@/src/jotai/mainAtoms';
import {
        getAtomFamilyDeleteAtom_NoFatherUpdate,
        getAtomFamilyUpdateAtom
} from '@/src/utils/jotai/helpers';

export const updateTypeInCardStoryAtom = getAtomFamilyUpdateAtom({
        atomFamily: typeInCardStoriesAtomFamily,
        updateIdb: updateTypeInCardStoryIdb
});

export const deleteTypeInCardStoryAtom = getAtomFamilyDeleteAtom_NoFatherUpdate(
        {
                atomFamily: typeInCardStoriesAtomFamily,
                deleteIdb: deleteTypeInCardStoryIdb
        }
);
