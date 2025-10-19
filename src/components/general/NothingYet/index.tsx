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
                                        'text-6xl max-md:text-5xl max-[424px]:text-4xl w-full col-span-full font-bold mx-auto mt-18 !flex text-gray-300':
                                                listLength === 0
                                },
                                className
                        )}>
                        {message}
                </h2>
        );
}
