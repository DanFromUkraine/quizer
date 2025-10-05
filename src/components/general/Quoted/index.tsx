import clsx from 'clsx';
import { ReactNode } from 'react';

type QuotationMarks = 'large-heading' | 'heading' | 'subtitle';

function getSigns(variant: QuotationMarks): [ReactNode, ReactNode] | undefined {
        if (variant === 'large-heading') {

        } else if (variant === 'heading') {
                return [
                        <span className='heading-3'>'</span>,
                        <span className='mt-auto'>
                                <sub className='heading-3'>'</sub>
                        </span>
                ];
        } else if (variant === 'subtitle') {
                return [
                        <span className='heading-3'>«</span>,
                        <span className='heading-3'>»</span>
                ]; // « »
        } else {
                throw `variant ${variant} is not of allowed QuotationMarks types`
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
                                'flex w-full gap-2 bg-gray-300 rounded-md p-3',
                                className
                        )}>
                        {leadingSign}
                        {children}
                        {closingSign}
                </div>
        );
}
