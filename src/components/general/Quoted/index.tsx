import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type QuotationMarks = 'large-heading' | 'heading';

function getSigns(variant: QuotationMarks): [ReactNode, ReactNode] {
    if (variant === 'large-heading') {
        return [
            <span>
                <sub>„</sub>
            </span>,
            <span className='mt-auto'>
                <sup>”</sup>
            </span>
        ];
    } else if (variant === 'heading') {
        return [<span>"</span>, <span>"</span>];
    } else {
        throw new Error(
            `variant ${variant as string} is not of allowed QuotationMarks types`
        );
    }
}

export default function Quoted({
    children,
    className,
    variant,
    ...props
}: Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
    children: ReactNode;
    className?: string;
    variant: QuotationMarks;
}) {
    const [leadingSign, closingSign] = getSigns(variant);

    return (
        <div
            {...props}
            className={clsx(
                'flex gap-2 rounded-md bg-gray-300 p-3',
                className
            )}>
            {leadingSign}
            {children}
            {closingSign}
        </div>
    );
}
