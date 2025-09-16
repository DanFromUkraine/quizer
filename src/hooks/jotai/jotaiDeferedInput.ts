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
                setJotaiValue(deferredValue);
        }, [value]);

        return [value || jotaiValue, setValue] as const;
}
