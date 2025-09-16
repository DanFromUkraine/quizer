'use client';

import { useEffect, useRef } from 'react';
import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';
import { useSetAtom } from 'jotai';
import { addEmptyCardAtom } from '@/src/jotai/mainDbAtom';

export function useAddCardOnShortcut() {
        const { id: bookId } = useBookProps();
        const addEmptyCard = useSetAtom(addEmptyCardAtom);
        const lastPressedKeys = useRef<string[]>([]);

        useEffect(() => {
                const keydownListener = (event: KeyboardEvent) => {
                        if (lastPressedKeys.current.includes(event.code))
                                return;
                        lastPressedKeys.current.push(event.code);

                        if (
                                lastPressedKeys.current.includes(
                                        'ControlLeft'
                                ) &&
                                lastPressedKeys.current.includes('KeyM')
                        ) {
                                addEmptyCard(bookId);
                        }
                        console.log(lastPressedKeys.current, event);
                        console.log('down');
                };

                const keyupListener = (event: KeyboardEvent) => {
                        lastPressedKeys.current =
                                lastPressedKeys.current.filter(
                                        (key) => key !== event.code
                                );

                        console.log('up');
                };

                document.addEventListener('keydown', keydownListener);
                document.addEventListener('keyup', keyupListener);

                return () => {
                        document.removeEventListener(
                                'keydown',
                                keydownListener
                        );
                        document.removeEventListener('keyup', keyupListener);
                };
        }, [addEmptyCard]);
}
