import Quoted from '@/src/components/general/Quoted';
import { ReactNode } from 'react';

export default function LikeSubtitleUI({ children }: { children: ReactNode }) {
        return (
                <div className='w-full flex justify-center'>
                        <Quoted
                                variant='subtitle'
                                className='!w-fit heading-4 field-sizing-content'>
                                {children}
                        </Quoted>
                </div>
        );
}
