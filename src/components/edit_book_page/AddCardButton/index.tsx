'use client';

import { useSetAtom } from 'jotai';
import AddEmptyCardUI from './UI';
import { addEmptyCardAtom } from '@/src/jotai/mainAtoms';
import { useEditBookProps } from '@/app/edit/page';

export default function AddEmptyCardButton() {
        const addEmptyCard = useSetAtom(addEmptyCardAtom);
        const onButtonClick = () => addEmptyCard();

        return <AddEmptyCardUI onClick={onButtonClick} />;
}
