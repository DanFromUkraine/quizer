'use client';
import { ReactNode, useRef } from 'react';
import useCloseModalWhenClickOnContainer from '@/src/hooks/useCloseModalWhenClickOnContainer';
import {
        DialogNames,
        dialogVisibilityFamilyAtom
} from '@/src/jotai/dialogVisibilityFamily';
import { useAtom } from 'jotai';
import clsx from 'clsx';

export default function Dialog({
        children,
        dialogName,
        dialogClassName,
        containerClassName,
        onCloseSideEffect
}: {
        children: ReactNode;
        dialogName: DialogNames;
        dialogClassName?: string;
        containerClassName?: string;
        onCloseSideEffect?: () => void;
}) {
        const containerRef = useRef<HTMLDivElement>(null);
        const [dialogVisible, setDialogVisible] = useAtom(
                dialogVisibilityFamilyAtom(dialogName)
        );
        const dialogState = dialogVisible ? 'open' : 'closed';
        useCloseModalWhenClickOnContainer(containerRef, () => {
                setDialogVisible(false);
                if (typeof onCloseSideEffect === 'function') {
                        onCloseSideEffect();
                }
        });

        return (
                <section
                        role='dialog'
                        ref={containerRef}
                        data-state={dialogState}
                        className={clsx(
                                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:hidden',
                                containerClassName
                        )}>
                        <section
                                tabIndex={-1}
                                data-state={dialogState}
                                className={clsx(
                                        'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 flex flex-col translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 w-8/12',
                                        dialogClassName
                                )}>
                                {children}
                        </section>
                </section>
        );
}
