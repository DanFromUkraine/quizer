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
            className='bg-muted flex w-full flex-col gap-2 rounded-lg p-3.5'
            onClick={onContainerClick}>
            <h4 className='font-medium'>Explanation</h4>
            <div className='text-muted-foreground w-full overflow-hidden has-[>[data-visible=false]]:h-0 [&>*]:w-full'>
                {children}
            </div>
        </section>
    );
}
