import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { booksFamilyAtom } from '@/src/jotai/mainDbAtom';

export default function BookItem({ id }: { id: string }) {
        const { bookTitle } = useAtomValue(booksFamilyAtom(id));
        return (
                <div className='w-full flex flex-col h-fit rounded-normal overflow-hidden border border-lightGray'>
                        <Link href={`main/play-offline?id=${id}`}>
                                <div className='w-full h-10 bg-gray-700' />
                                <div className='flex flex-col p-6'>
                                        <h3>{bookTitle}</h3>
                                </div>
                        </Link>
                </div>
        );
}
