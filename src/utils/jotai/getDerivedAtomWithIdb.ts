console.log('top of file getDerivedAtomWithIdb — module loaded', {
        now: Date.now()
});

import type { MainDbGlobal } from '@/src/types/mainDbGlobal';
import { atom, Getter, Setter, WritableAtom } from 'jotai';

export function getDerivedAtomWithIdb<Args extends unknown[]>(
        callback: (
                get: Getter,
                set: Setter,
                mainDb: MainDbGlobal,
                ...args: Args
        ) => Promise<void>
): WritableAtom<null, Args, Promise<void>> {
        console.log('loaded getDerivedAtomWithIdb');

        return atom<null, Args, Promise<void>>(
                null,
                async (get, set, ...args: Args) => {
                        const mainDbAtom = await import(
                                '@/src/jotai/mainAtoms'
                        ).then((r) => r.mainDbAtom);

                        const mainDb = get(mainDbAtom) as
                                | MainDbGlobal
                                | undefined;
                        if (typeof mainDb === 'undefined')
                                throw new Error('main idb is undefined');

                        try {
                                await callback(get, set, mainDb, ...args);
                        } catch (e) {
                                return await Promise.reject(e);
                        }
                }
        ) as WritableAtom<null, Args, Promise<void>>;
}
