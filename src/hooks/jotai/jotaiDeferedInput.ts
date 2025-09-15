'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { StringAtomAdapter } from '@/src/types/jotai';

export default function useJotaiDeferredInput(
        atomAdapter: StringAtomAdapter,
        bookId: string
) {
        const bookAtom = useMemo(() => atomAdapter(bookId), []);
        const [jotaiValue, setJotaiValue] = useAtom(bookAtom);
        const [value, setValue] = useState(() => jotaiValue);
        const deferredValue = useDeferredValue(value);

        useEffect(() => {
                setJotaiValue(deferredValue);
        }, [value]);

        return [value || jotaiValue, setValue] as const;
}
