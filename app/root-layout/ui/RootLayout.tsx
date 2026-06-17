import { Provider } from 'jotai';
import { ReactNode } from 'react';
import Sidebar from '@/src/components/layout/Sidebar';

export function RootLayout({ children }: { children: ReactNode }) {
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
