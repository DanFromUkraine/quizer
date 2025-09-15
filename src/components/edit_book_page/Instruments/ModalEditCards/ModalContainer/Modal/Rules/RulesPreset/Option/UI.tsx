import clsx from 'clsx';
import { ReactNode } from 'react';

export default function OptionUI({
        className,
        name,
        defaultChecked,
        children,
        onChange
}: {
        className?: string;
        name: string;
        defaultChecked: boolean;
        children: ReactNode;
        onChange: () => void;
}) {
        return (
                <div className='flex items-center gap-2 py-2 h-[38px] relative w-full group hover:border-y hover:border-y-[#8f30aa]  text-lightestGray'>
                        <input
                                type='checkbox'
                                name={name}
                                className='absolute w-full h-full top-0 left-0 z-50 opacity-0 peer'
                                onClick={onChange}
                                defaultChecked={defaultChecked}
                        />
                        <div
                                className={clsx(
                                        'overflow-hidden size-5 rounded-normal border-2 border-[#8f30aa] peer-checked:bg-[#b986c7] group-hover:!bg-[#eca7ff] duration-200',
                                        className
                                )}
                        />
                        {children}
                </div>
        );
}
