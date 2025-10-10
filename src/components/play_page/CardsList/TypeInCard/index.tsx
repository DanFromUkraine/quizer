import Quoted from '@/src/components/general/Quoted';

export default function TypeInCard({
        definition,
        expectedInput
}: {
        definition: string;
        expectedInput: string;
}) {
        return (
                <li className='flex flex-col border border-gray-500 rounded-xl p-4'>
                        <Quoted variant='heading'>
                                <h3 className='h3'>{definition}</h3>
                        </Quoted>
                        <input className='w-full' />
                </li>
        );
}
