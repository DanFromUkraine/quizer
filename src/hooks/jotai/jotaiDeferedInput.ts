'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { StringAtomAdapter } from '@/src/types/jotai';

export default function useJotaiDeferredInput(
        atomAdapter: StringAtomAdapter,
        itemId: string
) {
        const itemAtom = useMemo(() => atomAdapter(itemId), []);
        const [jotaiValue, setJotaiValue] = useAtom(itemAtom);
        const [value, setValue] = useState(() => jotaiValue);
        const deferredValue = useDeferredValue(value);

        useEffect(() => {
                if (jotaiValue.length === 0 && value.length > 0) {
                        setJotaiValue(deferredValue);
                }
        }, [value, jotaiValue]);

        useEffect(() => {
                if (jotaiValue.length === 0) return;
                setJotaiValue(deferredValue);
        }, [deferredValue]);

        return [value || jotaiValue, setValue] as const;
}
