import clsx from 'clsx';

export function ColorStatusBar() {
        const color = undefined;

        return (
                <section className='colorStatusBar'>
                        <div className='statusBarLayer statusBarBlueGradient' />
                        <div
                                className={clsx(
                                        ' absolute bg-[#ffd93b] top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300',
                                        {
                                                'opacity-100 z-10':
                                                        color === 'yellow'
                                        }
                                )}
                        />
                        <div
                                className={clsx(
                                        ' absolute bg-green-500 top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300',
                                        {
                                                'opacity-100 z-10':
                                                        color === 'green'
                                        }
                                )}
                        />
                        <span className="font-semibold text-white text-lg absolute top-2 left-2 max-sm:text-xs">Beta</span>
                </section>
        );
}
