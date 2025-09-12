'use client';

import { atom } from 'jotai';

type StatusBarColors = 'green' | 'yellow' | undefined;

export const statusBarColorAtom = atom<StatusBarColors>();
