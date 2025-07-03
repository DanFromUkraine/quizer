export type FlushDebounceType = {
  id: string;
  flush: () => void;
};

export function createDebounce(
  {
    onDebounceUpdated,
    onDebounceFinished,
  }: {
    onDebounceUpdated: (flushInstance: FlushDebounceType) => void;
    onDebounceFinished: (id: string) => void;
  } = { onDebounceUpdated: () => {}, onDebounceFinished: () => {} }
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let callbackFn: () => void | undefined;
  const id = Date.now().toString();

  const clear = () => clearTimeout(timer);

  const flush = () => {
    clear();
    if (typeof callbackFn === "function") callbackFn();
    callbackFn = () => {};
    onDebounceFinished(id);
  };

  const updateCallback = (callback: () => void, wait: number) => {
    clear();
    callbackFn = callback;
    onDebounceUpdated({ id, flush });
    timer = setTimeout(() => {
      flush();
    }, wait);
  };

  return {
    updateCallback,
    flush,
  };
}
