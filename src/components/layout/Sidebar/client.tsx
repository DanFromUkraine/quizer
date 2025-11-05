'use client';

import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { BsFillCollectionFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { NavLinkUI } from './UI';
import { LAYOUT_TEST_IDS } from '@/src/constants/testIds';

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
                <section className='navLinks'>
                        {NAV_LINKS.map((link) => (
                                <NavLinkUI
                                        key={link.href}
                                        {...link}
                                        pathname={pathname}
                                />
                        ))}
                </section>
        );
}
