'use client';
import { ReactNode, useRef } from 'react';
import useCloseModalWhenClickOnContainer from '@/src/hooks/useCloseModalWhenClickOnContainer';
import {
        DialogNames,
        dialogVisibilityFamilyAtom
} from '@/src/jotai/dialogVisibilityFamily';
import { useAtom } from 'jotai';

export default function Dialog({
        children,
        dialogName
}: {
        children: ReactNode;
        dialogName: DialogNames;
}) {
        const containerRef = useRef<HTMLDivElement>(null);
        const [dialogVisible, setDialogVisible] = useAtom(
                dialogVisibilityFamilyAtom(dialogName)
        );
        const dialogState = dialogVisible ? "open" : "closed";
        useCloseModalWhenClickOnContainer(containerRef, () =>
                setDialogVisible(false)
        );

        console.log({ dialogVisible });

        return (
                <section
                        role='dialog'
                        ref={containerRef}
                        data-state={dialogState}
                        className='data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:hidden'>
                        <section
                                tabIndex={-1}
                                data-state={dialogState}
                                className='bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border shadow-lg duration-200 sm:max-w-[425px]'>
                                {children}
                        </section>
                </section>
        );
}
