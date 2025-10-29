import { Provider } from 'jotai';
import { ReactNode } from 'react';
import './globals.css';
import Sidebar from '@/src/components/layout/Sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
        title: 'Kava Quizer',
        description:
                'Unique application to create your own cards for learning! Completely free & No registration needed. No marketing cookies. Let this app become you right hand in studying. ',
        icons: {
                icon: [
                        { url: '/favicon.ico' }, // classic favicon
                        {
                                url: '/favicon-16x16.png',
                                sizes: '16x16',
                                type: 'image/png'
                        },
                        {
                                url: '/favicon-32x32.png',
                                sizes: '32x32',
                                type: 'image/png'
                        }
                ],
                apple: [
                        {
                                url: '/apple-touch-icon.png',
                                sizes: '180x180',
                                type: 'image/png'
                        }
                ],
                other: [{ rel: 'manifest', url: '/site.webmanifest' }]
        }
};

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
