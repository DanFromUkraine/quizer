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
import { newStorySettingsAtom } from '@/src/jotai/createNewStory';

function getAtomFamilyAdapter<Item extends {}, K extends keyof Item>({
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

function getAtomAdapter<Item extends {}, K extends keyof Item>({
        targetAtom,
        targetProperty
}: {
        targetAtom: WritableAtom<Item, [newVal: Item], unknown>;
        targetProperty: K;
}) {
        return atom(
                (get) => get(targetAtom)[targetProperty],
                (get, set, newVal: Item[K]) => {
                        const prevAtomValue = get(targetAtom);
                        const newAtomValue = {
                                ...prevAtomValue,
                                [targetProperty]: newVal
                        };
                        set(targetAtom, newAtomValue);
                }
        );
}

export const getBookTitleFamilyAdapterAtom = getAtomFamilyAdapter({
        targetAtomFamily: booksAtomFamily,
        targetProperty: 'bookTitle',
        targetUpdateAtom: updateBookAtom
});

export const getBookDescriptionFamilyAdapterAtom = getAtomFamilyAdapter({
        targetAtomFamily: booksAtomFamily,
        targetProperty: 'description',
        targetUpdateAtom: updateBookAtom
});

export const getExplicitCardTitleFamilyAdapterAtom = getAtomFamilyAdapter({
        targetAtomFamily: explicitCardsAtomFamily,
        targetProperty: 'cardTitle',
        targetUpdateAtom: updateExplicitCardAtom
});

export const getExplicitCardSubtitleFamilyAdapterAtom = getAtomFamilyAdapter({
        targetAtomFamily: explicitCardsAtomFamily,
        targetProperty: 'subtitle',
        targetUpdateAtom: updateExplicitCardAtom
});

export const getExplicitCardExplanationFamilyAdapterAtom = getAtomFamilyAdapter(
        {
                targetAtomFamily: explicitCardsAtomFamily,
                targetProperty: 'explanation',
                targetUpdateAtom: updateExplicitCardAtom
        }
);

export const getCardOptionTitleFamilyAdapterAtom = getAtomFamilyAdapter({
        targetAtomFamily: optionsAtomFamily,
        targetProperty: 'optionTitle',
        targetUpdateAtom: updateOptionAtom
});

export const getOptionCorrectnessMarkerFamilyAdapterAtom = getAtomFamilyAdapter(
        {
                targetAtomFamily: optionsAtomFamily,
                targetProperty: 'isCorrect',
                targetUpdateAtom: updateOptionAtom
        }
);

export const getShortCardTermFamilyAdapterAtom = getAtomFamilyAdapter({
        targetAtomFamily: shortCardsAtomFamily,
        targetProperty: 'term',
        targetUpdateAtom: updateShortCardAtom
});

export const getShortCardDefinitionFamilyAdapterAtom = getAtomFamilyAdapter({
        targetAtomFamily: shortCardsAtomFamily,
        targetProperty: 'definition',
        targetUpdateAtom: updateShortCardAtom
});

export const getNewStoryIsSmartModeParamAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: 'isSmartMode'
});

export const getNewStoryNumOfNormalCardsParamAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: 'numOfNormalCards'
});

export const getNewStoryNumOfExplicitCardsParamAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: 'numOfExplicitCards'
});

export const getNewStoryNumOfTypeInCardsParamAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: 'numOfTypeInCards'
});

export const getNewStoryNumOfIsCorrectCardsParamAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: 'numOfIsCorrectCards'
});

export const getNewStoryMaxNumOfExplicitCardsAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: "maxNumOfExplicitCards"
})

export const getNewStoryMaxNumOfNormalCardsAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: "maxNumOfNormalCards"
})

export const getNewStoryMaxNumOfTypeInCardsAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: "maxNumOfTypeInCards"
})

export const getNewStoryMaxNumOfIsCorrectCardsAdapterAtom = getAtomAdapter({
        targetAtom: newStorySettingsAtom,
        targetProperty: "maxNumOfIsCorrectCards"
})