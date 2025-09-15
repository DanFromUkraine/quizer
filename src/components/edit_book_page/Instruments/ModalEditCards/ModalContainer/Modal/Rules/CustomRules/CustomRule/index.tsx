import { FieldValues, UseFormRegister } from 'react-hook-form';

export default function CustomRule({
        index,
        register,
        remove
}: {
        index: number;
        register: UseFormRegister<FieldValues>;
        remove: () => void;
}) {
        return (
                <div className='flex w-full justify-between group'>
                        <input
                                className='text-green-500 font-semibold w-full'
                                placeholder='write your custom rule'
                                {...register(`custom_rules.${index}`)}
                        />
                        <button
                                type='button'
                                className='invisible group-hover:visible duration-200 text-white'
                                onClick={remove}>
                                delete
                        </button>
                </div>
        );
}
