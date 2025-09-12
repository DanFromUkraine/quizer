import { ReactNode } from 'react';
import Sidebar from '@/src/components/layout/Sidebar';

export default function layout({ children }: { children: ReactNode }) {
        return (
                <div className='flex'>
                        <Sidebar /> {children}
                </div>
        );
}
