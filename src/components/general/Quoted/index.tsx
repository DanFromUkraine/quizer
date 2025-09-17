import { ReactNode } from 'react';

export default function Quoted({ children }: { children: ReactNode }) {
        return (
                <div className='flex w-full gap-2 bg-gray-300 heading-3 font-medium rounded-md p-3'>
                        <span>"</span>
                        {children}
                        <span className='mt-auto'>"</span>
                </div>
        );
}
