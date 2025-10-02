import { ALPHABET } from '@/src/constants/indexation';

export default function IndexMarker({ index }: { index: number }) {
        const displayedIndexMarker = ALPHABET[index];

        return (
                <div className='size-7 flex justify-center font-semibold items-center p-2 rounded-full bg-white'>
                        <span>{displayedIndexMarker}</span>
                </div>
        );
}
