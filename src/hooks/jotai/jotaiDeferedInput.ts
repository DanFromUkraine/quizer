'use client';

import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { bookTitleAtomAdapter } from '@/src/jotai/mainDbAtom';
import { useAtom } from 'jotai';

export default function useJotaiDeferredInput(bookId: string) {
        const bookAtom = useMemo(() => bookTitleAtomAdapter(bookId), []);
        const [jotaiValue, setJotaiValue] = useAtom(bookAtom);
        const [value, setValue] = useState(() => jotaiValue);
        const deferredValue = useDeferredValue(value);

        useEffect(() => {
                setJotaiValue(deferredValue);
        }, [value]);

        return [value || jotaiValue, setValue] as const;
}
