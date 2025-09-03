import { MouseEventHandler } from 'react';

export default function ButtonUI({ onClick }: { onClick: () => void }) {
        return (
                <button
                        type='button'
                        className='text-lightestGray bg-gray-600 rounded-3xl px-3.5 py-2'
                        onClick={onClick}>
                        Edit cards as a text
                </button>
        );
}
