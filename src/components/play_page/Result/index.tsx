'use client';

import { usePlayModeProps } from '@/src/components/play_page/CardsList';
import { Activity } from 'react';

export default function Result() {
        const { isCompleted } = usePlayModeProps();
        
        return (
                <Activity mode={isCompleted ? 'visible' : 'hidden'}>
                        <section className='w-full flex flex-col'>
                                <div>
                                        <h2>{/* Success percentage */}</h2>
                                        <h2>{/* mark from 0 to 12 */}</h2>
                                </div>
                                <div>
                                        {/* Link to main page*/}
                                        {/* Link to history page */}
                                </div>
                        </section>
                </Activity>
        );
}
