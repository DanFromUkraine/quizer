// 'todo' - in future should rewrite all atomFamilies here into derived atoms. Because under the hood all of them use maps. And at some point they will consume a lot of memory.
// 'todo' - It seems like all of the atom adapters have similar structure. So I can rewrite them into 1 multi adapter

import {
        booksAtomFamily,
        explicitCardsAtomFamily,
        optionsAtomFamily,
        shortCardsAtomFamily
} from '@/src/jotai/mainAtoms';
import { atom, PrimitiveAtom, WritableAtom } from 'jotai';
import { AtomFamily, WithInitialValue } from '@/src/types/jotaiGlobal';
import { updateBookAtom } from '@/src/jotai/bookAtoms';
import {
        updateExplicitCardAtom,
        updateShortCardAtom
} from '@/src/jotai/cardAtoms';
import { updateOptionAtom } from '@/src/jotai/optionAtoms';

function getAtomAdapter<Item extends {}, K extends keyof Item>({
        targetAtomFamily,
        targetProperty,
        targetUpdateAtom
}: {
        targetAtomFamily: AtomFamily<
                string,
                PrimitiveAtom<Item> & WithInitialValue<Item>
        >;
        targetProperty: K;
        targetUpdateAtom: WritableAtom<null, [newItem: Item], Promise<void>>;
}) {
        return (
                targetId: string
        ): WritableAtom<Item[K], [newVal: Item[K]], void> =>
                atom(
                        (get) =>
                                get(targetAtomFamily(targetId))[targetProperty],
                        (get, set, newVal: Item[K]) => {
                                const prevAtomValue = get(
                                        targetAtomFamily(targetId)
                                );
                                const newAtomValue = {
                                        ...prevAtomValue,
                                        [targetProperty]: newVal
                                };
                                set(targetUpdateAtom, newAtomValue);
                        }
                );
}

export const getBookTitleAtomAdapter = getAtomAdapter({
        targetAtomFamily: booksAtomFamily,
        targetProperty: 'bookTitle',
        targetUpdateAtom: updateBookAtom
});

export const getBookDescriptionAtomAdapter = getAtomAdapter({
        targetAtomFamily: booksAtomFamily,
        targetProperty: 'description',
        targetUpdateAtom: updateBookAtom
});

export const getExplicitCardTitleAtomAdapter = getAtomAdapter({
        targetAtomFamily: explicitCardsAtomFamily,
        targetProperty: 'cardTitle',
        targetUpdateAtom: updateExplicitCardAtom
});

export const getExplicitCardSubtitleAtomAdapter = getAtomAdapter({
        targetAtomFamily: explicitCardsAtomFamily,
        targetProperty: 'subtitle',
        targetUpdateAtom: updateExplicitCardAtom
});

export const getExplicitCardExplanationAtomAdapter = getAtomAdapter({
        targetAtomFamily: explicitCardsAtomFamily,
        targetProperty: 'explanation',
        targetUpdateAtom: updateExplicitCardAtom
});

export const getCardOptionTitleAtomAdapter = getAtomAdapter({
        targetAtomFamily: optionsAtomFamily,
        targetProperty: 'optionTitle',
        targetUpdateAtom: updateOptionAtom
});

export const getOptionCorrectnessMarkerAtomAdapter = getAtomAdapter({
        targetAtomFamily: optionsAtomFamily,
        targetProperty: 'isCorrect',
        targetUpdateAtom: updateOptionAtom
});

export const getShortCardTermAdapterAtom = getAtomAdapter({
        targetAtomFamily: shortCardsAtomFamily,
        targetProperty: 'term',
        targetUpdateAtom: updateShortCardAtom
});

export const getShortCardDefinitionAdapterAtom = getAtomAdapter({
        targetAtomFamily: shortCardsAtomFamily,
        targetProperty: 'definition',
        targetUpdateAtom: updateShortCardAtom
});
