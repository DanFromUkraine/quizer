'use client';

import clsx from 'clsx';
import RenderShortcutKeys from './RenderShortcutKeys';

export default function BtnWithShortcut({
        textContent,
        shortcutKeys,
        className,
        onClick,
        otherAttributes,
        buttonType
}: {
        textContent: string;
        shortcutKeys: string[];
        className?: string;
        onClick?: () => void;
        buttonType: 'submit' | 'reset' | 'button' | undefined;
        otherAttributes?: object;
}) {
        return (
                <button
                        className={clsx(
                                'simpleButton tr flex justify-between group px-6 bg-blueAccent gap-2 items-center overflow-hidden w-fit',
                                className
                        )}
                        type={buttonType}
                        onClick={onClick}
                        {...otherAttributes}>
                        <p className='group-hover:opacity:0 group-hover:translate-x-0 duration-100'>
                                {textContent}
                        </p>
                        <div className='flex w-0 group-hover:!w-auto opacity-0  scale-x-0 group-hover:scale-x-100 duration-200 items-center gap-2 group-hover:opacity-100 '>
                                <RenderShortcutKeys
                                        shortcutKeys={shortcutKeys}
                                />
                        </div>
                </button>
        );
}
