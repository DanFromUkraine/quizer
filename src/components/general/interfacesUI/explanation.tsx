import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import { MouseEventHandler, ReactNode } from 'react';

export default function LikeExplanationUI({
        onContainerClick,
        children
}: {
        onContainerClick?: MouseEventHandler;
        children: ReactNode;
}) {
        return (
                <section
                        className='flex flex-col gap-2 p-3.5 rounded-lg bg-muted w-full'
                        onClick={onContainerClick}>
                        <h4 className='font-medium '>Explanation</h4>
                        <div className='text-muted-foreground w-full [&>*]:w-full'>
                                {children}
                        </div>
                </section>
        );
}
