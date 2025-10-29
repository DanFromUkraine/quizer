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
                                'simpleButton flex justify-between group px-6 hover:bg-blue-400 duration-100 bg-blueAccent gap-2 items-center overflow-hidden w-fit',
                                className
                        )}
                        type={buttonType}
                        onClick={onClickAction}
                        {...otherAttributes}>
                        <p className='heading-3 !text-white'>{textContent}</p>
                        <div className='flex items-center gap-2 max-xl:hidden'>
                                <RenderShortcutKeys
                                        shortcutKeys={shortcutKeys}
                                />
                        </div>
                </button>
        );
}
