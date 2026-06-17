'use client';

import clsx from 'clsx';
import RenderShortcutKeys from './RenderShortcutKeys';

export default function BtnWithShortcut({
    textContent,
    shortcutKeys,
    className,
    onClickAction,
    otherAttributes,
    buttonType,
    testId
}: {
    textContent: string;
    shortcutKeys: string[];
    className?: string;
    onClickAction?: () => void;
    buttonType: 'submit' | 'reset' | 'button' | undefined;
    otherAttributes?: object;
    testId: string;
}) {
    return (
        <button
            data-testid={testId}
            className={clsx(
                'rounded-normal group flex w-fit items-center justify-between gap-2 overflow-hidden bg-primary px-6 py-2 font-semibold whitespace-nowrap text-white duration-100 hover:bg-primaryHover',
                className
            )}
            type={buttonType}
            onClick={onClickAction}
            {...otherAttributes}>
            <p className='heading-3 !text-white'>{textContent}</p>
            <div className='flex items-center gap-2 max-xl:hidden'>
                <RenderShortcutKeys shortcutKeys={shortcutKeys} />
            </div>
        </button>
    );
}
