'use client';

import { atom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useRef } from 'react';

export const sidebarWidth = atomWithStorage<number>('sidebarWidth', 64);

// Color status bar

type StatusBarColors = 'green' | 'yellow' | undefined;

export const statusBarColorAtom = atom<StatusBarColors>();

export function useChangeStatusBarColor(newColor: StatusBarColors) {
        const triggered = useRef(false);
        const setColor = useSetAtom(statusBarColorAtom);

        const changeColor = () => {
                if (triggered.current) return;
                setColor(newColor);
        };

        const setDefaultColor = () => {
                // if (!triggered.current) return;
                setColor(undefined);
        };

        return { changeColor, setDefaultColor };
}
