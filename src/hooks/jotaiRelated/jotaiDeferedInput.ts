'use client';

/*
 * Проблеми:
 * 1. Перша ініціалізація jotaiRelated може бути пустою строкою, відбудеться рендер, й він перезапишеться пустиою строкою
 * 2. Deferred хук не оновлюється, якщо різниця з оригіналом -1
 * 3. Враховуючи попередні 2 правила, має бути можливість стерти перший символ
 *
 * */

import { useDeferredValue, useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { StringAdapterAtom } from '@/src/types/jotaiGlobal';

export default function useJotaiDeferredInput(adapterAtom: StringAdapterAtom) {
        const jotaiLoadable = useAtomValue(loadable<StringAdapterAtom>(adapterAtom));
        const setJotaiValue = useSetAtom(adapterAtom);

        const [value, setValue] = useState('');
        const deferredValue = useDeferredValue(value);

        const isLoadingOrError =
                jotaiLoadable.state === 'loading' || jotaiLoadable.state === 'hasError';
        const jotaiData =
                !isLoadingOrError && typeof jotaiLoadable.data === 'string'
                        ? jotaiLoadable.data
                        : undefined;

        // Sync initial/remote -> local input when valid and different
        useEffect(() => {
                if (!jotaiData) return;
                if (jotaiData === value) return;
                setValue(jotaiData);
                // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [jotaiData]); // залежимо тільки від фактичних даних

        // Centralized update logic: decide when to write back to jotai
        useEffect(() => {
                if (isLoadingOrError) return;

                // If user cleared local input, clear atom
                if (value === '') {
                        if (jotaiData !== '') {
                                setJotaiValue('');
                        }
                        return;
                }

                // Use deferred value for writes (debounced by React)
                if (typeof deferredValue === 'string' && deferredValue !== jotaiData) {
                        setJotaiValue(deferredValue);
                }
        }, [isLoadingOrError, value, deferredValue, jotaiData, setJotaiValue]);

        return [value, setValue] as const;
}