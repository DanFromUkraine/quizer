import clsx from 'clsx';
import { ReactNode } from 'react';

export function Hr({ className }: { className?: string }) {
    return <hr className={clsx('my-2 text-gray-300', className)} />;
}

export function HrWrapper({
    children,
    className
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <>
            <Hr className={className} />
            {children}
            <Hr className={className} />
        </>
    );
}
