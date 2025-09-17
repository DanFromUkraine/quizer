import { RefObject } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export default function CollectionTitleUI({
        ref,
        register
}: {
        ref: RefObject<HTMLInputElement | null>;
        register: UseFormRegister<FieldValues>;
}) {
        return (
                <input
                        data-testid='collection-title-input'
                        type='text'
                        placeholder='Enter heading'
                        className='px-6 py-1.5 w-full text-[#5C5E64] text-2xl font-semibold focus:outline-none mb-8'
                        {...register('collectionTitle')}
                />
        );
}
