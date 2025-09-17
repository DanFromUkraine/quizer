'use client';

import { useSetAtom } from 'jotai';
import { editCardsAsTextModalVisibilityAtom } from '@/src/jotai/statusAtoms';
import { FaRegEdit } from 'react-icons/fa';

export default function OpenEditCardsModalButton() {
        const setVisibility = useSetAtom(editCardsAsTextModalVisibilityAtom);
        const onClick = () => setVisibility(true);

        return (
                <section className="container">
                        <button onClick={onClick} className='buttonV1'>
                                <span className="heading-3 !text-white">Edit cards as a text</span> <FaRegEdit className="text-2xl"/>
                        </button>
                </section>
        );
}
