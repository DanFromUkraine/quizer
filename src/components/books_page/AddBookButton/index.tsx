'use client';
import { useSetAtom } from 'jotai';
import { IoAddCircle } from 'react-icons/io5';
import { addEmptyBookAtom } from '@/src/jotai/mainDbAtom';

export default function AddBookButton() {
        const add = useSetAtom(addEmptyBookAtom);
        return (
                <button onClick={add} className='fixed bottom-5 right-5'>
                        <IoAddCircle />
                </button>
        );
}
