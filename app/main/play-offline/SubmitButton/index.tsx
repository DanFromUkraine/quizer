'use client';

import { useSubmit } from '@/app/lib/db/History';

export default function SubmitButton() {
        const { submit } = useSubmit();
        return (
                <button
                        type='button'
                        onClick={submit}
                        className='text-2xl bg-gray-500 text-black px-10 py-3 rounded-2xl hover:bg-green-500 hover:text-white'>
                        Submit
                </button>
        );
}
