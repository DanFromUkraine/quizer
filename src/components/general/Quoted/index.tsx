import clsx from 'clsx';
import { ReactNode } from 'react';

type QuotationMarks = 'large-heading' | 'heading' | 'subtitle';

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
        } else if (variant === 'subtitle') {
                return [
                        <span className='heading-3'>«</span>,
                        <span className='heading-3'>»</span>
                ]; // « »
        } else {
                throw `variant ${variant} is not of allowed QuotationMarks types`;
        }
}

export default function Quoted({
        children,
        className,
        variant
}: {
        children: ReactNode;
        className?: string;
        variant: QuotationMarks;
}) {
        const [leadingSign, closingSign] = getSigns(variant);

        return (
                <div
                        className={clsx(
                                { 'p-0.5 py-0 bg-gray-200 text-gray-700': variant === 'subtitle' },

                                'flex w-full gap-2 bg-gray-300 rounded-md p-3',
                                className
                        )}>
                        {leadingSign}
                        {children}
                        {closingSign}
                </div>
        );
}
