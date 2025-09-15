'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import CustomRule from './CustomRule';
import Braces from '../../../Braces';

export default function RenderCustomRules() {
        const { control, register } = useFormContext();
        const { fields, append, remove } = useFieldArray({
                control,
                name: 'custom_rules'
        });
        console.log('render');
        const onBtnClick = () => {
                append('');
        };
        return (
                <Braces colorPriority={3}>
                        <h3 className='text-white text-xl font-semibold'>
                                Create your custom rules:
                        </h3>
                        {fields.map(({ id }, i) => (
                                <CustomRule
                                        key={id}
                                        register={register}
                                        index={i}
                                        remove={() => remove(i)}
                                />
                        ))}
                        <button
                                type='button'
                                onClick={onBtnClick}
                                className='text-white'>
                                add new rule
                        </button>
                </Braces>
        );
}
