import { ChangeEventHandler } from 'react';

export default function TermOrDeterminationInput({
        underText,
        value,
        onChange
}: {
        underText: string;
        value: string;
        onChange: ChangeEventHandler;
}) {
        return (
                <section className='flex flex-col gap-2'>
                        <input value={value} onChange={onChange} type='text' />
                        <h3>{underText}</h3>
                </section>
        );
}
