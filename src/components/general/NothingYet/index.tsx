import clsx from 'clsx';

export default function NothingYetMessage({
    message,
    listLength,
    className
}: {
    message: string;
    listLength: number;
    className?: string;
}) {
    return (
        <h2
            className={clsx(
                'hidden',
                {
                    'col-span-full mx-auto mt-18 flex! w-full text-4xl lg-mobile:text-5xl xl-mobile:6xl font-bold text-gray-300':
                        listLength === 0
                },
                className
            )}>
            {message}
        </h2>
    );
}
