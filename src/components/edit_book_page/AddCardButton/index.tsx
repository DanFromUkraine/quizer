'use client';

import { useSetAtom } from 'jotai';
import {
        addEmptyCardAtom,
        addEmptyTermDefinitionCard
} from '@/src/jotai/cardAtoms';
import BtnWithShortcut from '@/src/components/general/ButtonWithShortcut';

export default function AddCardButtons() {
        const addEmptyCard = useSetAtom(addEmptyCardAtom);
        const addEmptyShortCard = useSetAtom(addEmptyTermDefinitionCard);

        return (
                <section>
                        <BtnWithShortcut
                                textContent='New Explicit Card'
                                shortcutKeys={['Alt', 'j']}
                                buttonType='button'
                                onClick={addEmptyCard}
                        />
                        <BtnWithShortcut
                                textContent='New Term-Definition Card'
                                shortcutKeys={['Alt', 'l ']}
                                buttonType={'button'}
                                onClick={addEmptyShortCard}
                        />
                </section>
        );
}
