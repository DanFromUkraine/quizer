'use client';

import { useSetAtom } from 'jotai';
import {
        addEmptyExplicitCardAtom,
        addEmptyTermShortCard
} from '@/src/jotai/cardAtoms';
import BtnWithShortcut from '@/src/components/general/ButtonWithShortcut';

export default function AddCardButtons() {
        const addEmptyCard = useSetAtom(addEmptyExplicitCardAtom);
        const addEmptyShortCard = useSetAtom(addEmptyTermShortCard);

        return (
                <section className='mx-auto flex gap-2 '>
                        <BtnWithShortcut
                                textContent='New Explicit Card'
                                shortcutKeys={['Alt', 'j']}
                                buttonType='button'
                                onClick={addEmptyCard}
                        />
                        <BtnWithShortcut
                                textContent='New Short Card'
                                className='bg-green-500 hover:bg-green-400'
                                shortcutKeys={['Alt', 'l ']}
                                buttonType={'button'}
                                onClick={addEmptyShortCard}
                        />
                </section>
        );
}
