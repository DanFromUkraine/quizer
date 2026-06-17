// 'todo' - refactor this component

'use client';
import { ReactNode, useCallback, useRef } from 'react';
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
    testId,
    closeButton
}: {
    children: ReactNode;
    dialogName: DialogNames;
    className?: string;
    containerClassName?: string;
    testId: string;
    closeButton?: ReactNode;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dialogVisible, setDialogVisible] = useAtom(
        dialogVisibilityFamilyAtom(dialogName)
    );
    const closeDialog = useCallback(() => setDialogVisible(false), []);
    const dialogState = dialogVisible ? 'open' : 'closed';
    useCloseModalWhenClickOutOfContainer(containerRef, closeDialog);

    return (
        <section
            data-testid={testId}
            role='dialog'
            ref={containerRef}
            data-state={dialogState}
            className={clsx(
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 h-screen w-screen bg-black/50 data-[state=closed]:hidden',
                containerClassName
            )}>
            <section
                tabIndex={-1}
                data-state={dialogState}
                className={clsx(
                    'fixed top-[50%] left-[50%] z-50 flex w-8/12 translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-lg border shadow-lg duration-200 max-sm:h-full max-sm:w-full',
                    className
                )}>
                <section className='flex w-full justify-between'>
                    <IoClose
                        className='text-3xl'
                        onClick={closeDialog}
                        data-testid={BASE_DIALOG_TEST_IDS.defCloseBtn}
                    />
                    {closeButton && (
                        <div onClick={closeDialog}>{closeButton}</div>
                    )}
                </section>

                {children}
            </section>
        </section>
    );
}
