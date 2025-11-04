import type { MainDbGlobal } from '@/src/types/mainDbGlobal';
import { mainDbAtom } from '@/src/jotai/mainAtoms';
import { atom, Getter, Setter, WritableAtom } from 'jotai';

export function getDerivedAtomWithIdb<Args extends unknown[]>(
        callback: (
                get: Getter,
                set: Setter,
                mainDb: MainDbGlobal,
                ...args: Args
        ) => Promise<void>
): WritableAtom<null, Args, Promise<void>> {
        return atom<null, Args, Promise<void>>(
                null,
                async (get, set, ...args: Args) => {
                        const mainDb = get(mainDbAtom);
                        if (typeof mainDb === 'undefined')
                                throw new Error('main idb is undefined');

                        await callback(get, set, mainDb, ...args);
                }
        ) as WritableAtom<null, Args, Promise<void>>;
}
