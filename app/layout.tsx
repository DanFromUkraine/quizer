import { Provider } from 'jotai';
import { ReactNode } from 'react';
import './globals.css';
import Sidebar from '@/src/components/layout/Sidebar';

export default function layout({ children }: { children: ReactNode }) {
        return (
                <html lang='en'>
                        <body className='flex'>
                                <Provider>
                                        <Sidebar />
                                        {children}
                                </Provider>
                        </body>
                </html>
        );
}
