import '@/src/styles/index.css';
import { Metadata } from 'next';
import { RootLayout } from '@/src/app/root-layout';

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

export default RootLayout;
