'use client';

import { useSetAtom } from 'jotai';
import {
        addEmptyExplicitCardAtom,
        addEmptyTermShortCard
} from '@/src/jotai/cardAtoms';
import BtnWithShortcut from '@/src/components/general/ButtonWithShortcut';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function AddCardButtons() {
        const addEmptyCard = useSetAtom(addEmptyExplicitCardAtom);
        const addEmptyShortCard = useSetAtom(addEmptyTermShortCard);

        return (
                <section className='mx-auto flex gap-2 max-[440px]:flex-col'>
                        <BtnWithShortcut
                                testId={EP_TEST_IDS.newExpCardBtn}
                                textContent='New Explicit Card'
                                shortcutKeys={['Alt', 'j']}
                                buttonType='button'
                                onClickAction={addEmptyCard}
                        />
                        <BtnWithShortcut
                                testId={EP_TEST_IDS.newShortCardBtn}
                                textContent='New Short Card'
                                className='bg-green-500 hover:bg-green-400'
                                shortcutKeys={['Alt', 'l ']}
                                buttonType={'button'}
                                onClickAction={addEmptyShortCard}
                        />
                </section>
        );
}
