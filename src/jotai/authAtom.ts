import { atomWithStorage } from 'jotai/utils';

export type Modes = 'guest' | 'authorized';

export const authModeAtom = atomWithStorage<Modes>('mode', 'guest');
