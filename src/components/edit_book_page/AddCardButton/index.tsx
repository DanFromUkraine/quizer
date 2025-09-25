'use client';

import { useSetAtom } from 'jotai';
import AddEmptyCardUI from './UI';
import { useEditBookProps } from '@/app/edit/page';
import { addEmptyCardAtom } from '@/src/jotai/cardAtoms';

export default function AddEmptyCardButton() {
        const addEmptyCard = useSetAtom(addEmptyCardAtom);
        const onButtonClick = () => addEmptyCard();

        return <AddEmptyCardUI onClick={onButtonClick} />;
}
