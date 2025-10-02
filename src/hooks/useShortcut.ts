
'use client';

import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { addEmptyExplicitCardAtom } from '@/src/jotai/cardAtoms';

export function useAddCardOnShortcut() {
        const addEmptyCard = useSetAtom(addEmptyExplicitCardAtom);
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
                                addEmptyCard();
                        }
                };

                const keyupListener = (event: KeyboardEvent) => {
                        lastPressedKeys.current =
                                lastPressedKeys.current.filter(
                                        (key) => key !== event.code
                                );

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
