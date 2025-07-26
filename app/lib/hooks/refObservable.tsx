import { useCallback, useRef } from "react";

type Listener<T> = {
  id: string;
  listenerFn: (newVal: T) => void;
};
export type RefSubscriber<T> = (callback: (arg0: T) => void) => () => void;

export default function useRefObservable<T>(defValue: T) {
  const ref = useRef<T>(defValue);
  const listeners = useRef<Listener<T>[]>([]);

  const set = useCallback((newVal: T) => {
    ref.current = newVal;
  }, []);

  const subscribe = (callback: (newVal: T) => void) => {
    const id = crypto.randomUUID();
    listeners.current.push({ id, listenerFn: callback });

    return () => {
      listeners.current = listeners.current.filter((l) => l.id !== id);
    };
  };

  const getValue = () => ref.current;

  return { set, subscribe, getValue };
}
