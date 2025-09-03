export function createDebounce() {
        let timer: ReturnType<typeof setTimeout> | undefined;

        return {
                updateCallback: (callback: () => void, wait: number) => {
                        clearTimeout(timer);
                        timer = setTimeout(callback, wait);
                },
                abort: () => {
                        clearTimeout(timer);
                        console.log('aborted');
                        timer = undefined;
                }
        };
}
