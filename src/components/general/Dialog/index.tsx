// 'todo' - refactor this component

'use client';
import { ReactNode, useRef } from 'react';
import useCloseModalWhenClickOutOfContainer from '@/src/hooks/useCloseModalWhenClickOutOfContainer';
import { IoClose } from 'react-icons/io5';
import {
        DialogNames,
        dialogVisibilityFamilyAtom
} from '@/src/jotai/dialogVisibilityFamily';
import { useAtom } from 'jotai';
import clsx from 'clsx';
import { BASE_DIALOG_TEST_IDS } from '@/src/constants/testIds';

export default function Dialog({
        children,
        dialogName,
        className,
        containerClassName,
        onCloseSideEffectAction,
        testId,
        CloseDialogComponent
}: {
        children: ReactNode;
        dialogName: DialogNames;
        className?: string;
        containerClassName?: string;
        onCloseSideEffectAction?: () => void;
        testId: string;
        CloseDialogComponent?: React.FC; // Otherwise it pushes me to include word 'action' in name, which may mislead other developer
}) {
        const containerRef = useRef<HTMLDivElement>(null);
        const [dialogVisible, setDialogVisible] = useAtom(
                dialogVisibilityFamilyAtom(dialogName)
        );
        const dialogState = dialogVisible ? 'open' : 'closed';
        useCloseModalWhenClickOutOfContainer(containerRef, () => {
                setDialogVisible(false);
                if (typeof onCloseSideEffectAction === 'function') {
                        onCloseSideEffectAction();
                }
        });
        const onCloseDialogButtonClick = () => {
                setDialogVisible(false);
        };

        return (
                <section
                        data-testid={testId}
                        role='dialog'
                        ref={containerRef}
                        data-state={dialogState}
                        className={clsx(
                                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 w-screen h-screen data-[state=closed]:hidden',
                                containerClassName
                        )}>
                        <section
                                tabIndex={-1}
                                data-state={dialogState}
                                className={clsx(
                                        'fixed top-[50%] left-[50%] z-50 flex flex-col translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 w-8/12 max-sm:!w-full max-sm:h-full',
                                        className
                                )}>
                                <button
                                        onClick={onCloseDialogButtonClick}
                                        type='button'
                                        className='ml-auto text-2xl text-black'>
                                        {typeof CloseDialogComponent ===
                                        'function' ? (
                                                <CloseDialogComponent />
                                        ) : (
                                                <IoClose
                                                        data-testid={
                                                                BASE_DIALOG_TEST_IDS.defCloseBtn
                                                        }
                                                />
                                        )}
                                </button>
                                {children}
                        </section>
                </section>
        );
}
