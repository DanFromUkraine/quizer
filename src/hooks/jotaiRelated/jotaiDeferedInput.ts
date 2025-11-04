// 'use client';
//
// There's fundamental problem, that with sync atoms you cannot now, whether atom it just empty, or it hasn't just been updated yet
// I need to rewrite all main atom families into async style, but I think that currently I have higher priorities, that that
//
import { useDeferredValue, useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { StringAdapterAtom } from '@/src/types/jotaiGlobal';
import { updateCardViaTextAtomFamily } from '@/src/jotai/cardAtoms';
import { isInitializationFromIdbCompletedAtom } from '@/src/jotai/mainAtoms';

export default function useJotaiDeferredUpdateAdapter({
        adapterAtom,
        cardId
}: {
        adapterAtom: StringAdapterAtom;
        cardId: string;
}) {
        /* This hook should only be used in components, that can be updated via text */
        const prevUpdateCountNum = useRef(0);
        const [initPerformed, setInitPerformed] = useState(false);
        const updateCount = useAtomValue(updateCardViaTextAtomFamily(cardId));
        const [inputValue, setInputValue] = useState('');
        const [jotaiValue, setJotaiValue] = useAtom(adapterAtom);
        const deferredValue = useDeferredValue(inputValue);
        const isIdbInitiated = useAtomValue(
                isInitializationFromIdbCompletedAtom
        );

        useEffect(() => {
                console.debug(1, { initPerformed, isIdbInitiated, jotaiValue });
                if (initPerformed || !isIdbInitiated) return;
                if (jotaiValue.length > 0) {
                        setInputValue(jotaiValue);
                }
                setInitPerformed(true);
        }, [isIdbInitiated, jotaiValue]);

        useEffect(() => {
                console.debug(2, {
                        initPerformed,
                        deferredValue,
                        jotaiValue,
                        updateCount
                });
                if (
                        initPerformed &&
                        deferredValue !== jotaiValue &&
                        updateCount === prevUpdateCountNum.current
                ) {
                        void setJotaiValue(deferredValue);
                }
        }, [deferredValue, jotaiValue, updateCount]);

        useEffect(() => {
                console.debug(3, {
                        updateCount,
                        prevUpdateCountNum,
                        jotaiValue
                });
                if (updateCount > prevUpdateCountNum.current && jotaiValue) {
                        setInputValue(jotaiValue);
                        prevUpdateCountNum.current = updateCount;
                }
        }, [updateCount, jotaiValue]);

        console.debug(`

          `);

        return {
                inputValue,
                setInputValue,
                isDisabled: !initPerformed
        };
}
