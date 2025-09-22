import clsx from 'clsx';
import { ReactNode } from 'react';

export default function Quoted({
        children,
        className
}: {
        children: ReactNode;
        className?: string;
}) {
        return (
                <div
                        className={clsx(
                                'flex w-full gap-2 bg-gray-300 heading-3 font-medium rounded-md p-3',
                                className
                        )}>
                        <span>"</span>
                        {children}
                        <span className='mt-auto'>"</span>
                </div>
        );
}
