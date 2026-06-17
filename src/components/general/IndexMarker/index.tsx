import { ALPHABET } from '@/src/constants/indexation';
import clsx from 'clsx';

export default function IndexMarker({
    index,
    className
}: {
    index: number;
    className?: string;
}) {
    const displayedIndexMarker = ALPHABET[index];

    return (
        <div
            className={clsx(
                'flex size-4km  ff items-center justify-center rounded-full p-2 font-semibold',
                className
            )}>
            <span>{displayedIndexMarker}</span>
        </div>
    );
}
