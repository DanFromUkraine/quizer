import clsx from 'clsx';

export function ColorStatusBar() {
    const color = undefined;

    return (
        <section className='border-b-lightGray relative border-b max-sm:h-full sm:h-32 w-5 mobile:w-10 lg-mobile:w-12 sm:w-full'>
            <div className='absolute top-0 left-0 z-0 h-full w-full animate-[gradientShift_8s_ease_infinite] [background-image:var(--color-statusBarLinearPrimary)] [background-size:600%_600%]' />
            <div
                className={clsx(
                    'absolute top-0 left-0 h-full w-full bg-[#ffd93b] opacity-0 transition-opacity duration-300',
                    {
                        'z-10 opacity-100': color === 'yellow'
                    }
                )}
            />
            <div
                className={clsx(
                    'absolute top-0 left-0 h-full w-full bg-green-500 opacity-0 transition-opacity duration-300',
                    {
                        'z-10 opacity-100': color === 'green'
                    }
                )}
            />
        </section>
    );
}
