'use client';

/*
 * Проблеми:
 * 1. Перша ініціалізація jotaiRelated може бути пустою строкою, відбудеться рендер, й він перезапишеться пустиою строкою
 * 2. Deferred хук не оновлюється, якщо різниця з оригіналом -1
 * 3. Враховуючи попередні 2 правила, має бути можливість стерти перший символ
 *
 * */

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { StringAtomAdapter } from '@/src/types/jotaiGlobal';

export default function useJotaiDeferredInput(
        atomAdapter: StringAtomAdapter,
        itemId: string
) {
        const itemAtom = useMemo(() => atomAdapter(itemId), []);
        const jotaiValue = useAtomValue(loadable(itemAtom));
        const setJotaiValue = useSetAtom(itemAtom);
        const [value, setValue] = useState('');
        const deferredValue = useDeferredValue(value);
        const shouldSkip =
                jotaiValue.state === 'loading' ||
                jotaiValue.state === 'hasError';
        const jotaiDataTypeSafe = shouldSkip ? undefined : jotaiValue.data;

        useEffect(() => {
                if (shouldSkip || jotaiValue.data.length === 0) return;
                setValue(jotaiValue.data);
        }, [jotaiValue.state, jotaiDataTypeSafe]);

        useEffect(() => {
                if (shouldSkip || value.length > 0) return;
                setJotaiValue('');
        }, [jotaiValue.state, jotaiDataTypeSafe, value]);

        useEffect(() => {
                if (shouldSkip || deferredValue.length === 0) return;
                setJotaiValue(deferredValue);
        }, [deferredValue]);

        return [value, setValue] as const;
}
