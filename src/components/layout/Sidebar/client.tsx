'use client';

import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { BsFillCollectionFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { LAYOUT_TEST_IDS } from '@/src/constants/testIds';
import clsx from 'clsx';
import Link from 'next/link';

export type LinkType = {
    href: string;
    Icon: IconType;
    text: string;
    testId: string;
};

const NAV_LINKS: LinkType[] = [
    {
        href: '/',
        Icon: BsFillCollectionFill,
        text: 'Home',
        testId: LAYOUT_TEST_IDS.booksPageLinkBtn
    },
    {
        href: '/history',
        Icon: FaHistory,
        text: 'History',
        testId: LAYOUT_TEST_IDS.storiesPageLinkBtn
    }
];

export function RenderNavLinks() {
    const pathname = usePathname();

    return (
        <section className='static m-0 sm:px-5 sm:pt-5 flex w-full items-center max-sm:justify-center max-sm:gap-3 sm:flex-col'>
            {NAV_LINKS.map(({ href, Icon, text, testId }) => (
                <Link
                    key={href}
                    data-testid={testId}
                    href={href}
                    className={clsx(
                        'xl-mobile:px-8 m-3 flex items-center gap-2 sm:p-3 rounded-xl max-sm:m-0',
                        {
                            'bg-gray-200 max-sm:p-3':
                                pathname === href
                        }
                    )}>
                    <Icon className='text-icon rounded-md text-xl' />
                    <p className='flex font-medium whitespace-nowrap select-none'>
                        {text}
                    </p>
                </Link>
            ))}
        </section>
    );
}
