import { Provider } from 'jotai/react/Provider';
import Sidebar from '@/src/app/root-layout/ui/Sidebar';
import { ReactNode } from 'react';

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
