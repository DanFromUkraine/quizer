'use client';

import { RefObject, useEffect } from 'react';

export default function useCloseModalWhenClickOnContainer(
        containerRef: RefObject<HTMLDivElement | null>,
        callback: () => void
) {
        useEffect(() => {
                if (!containerRef.current)
                        throw 'Container ref for modal (edit cards as text) is not of truthy value. Cannot add click listener to it';
                const clickListener = (e: PointerEvent) => {
                        if (e.target === containerRef.current) {
                                callback();
                        }
                };

                containerRef.current?.addEventListener('click', clickListener);
                return () => {
                        containerRef.current?.removeEventListener(
                                'click',
                                clickListener
                        );
                };
        }, []);
}
