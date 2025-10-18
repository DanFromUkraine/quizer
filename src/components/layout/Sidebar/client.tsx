'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { IconType } from 'react-icons';
import { BsFillCollectionFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { NavLinkUI } from './UI';

export type LinkType = {
        href: string;
        Icon: IconType;
        text: string;
};

const NAV_LINKS: LinkType[] = [
        {
                href: '/',
                Icon: BsFillCollectionFill,
                text: 'Home'
        },
        {
                href: '/history',
                Icon: FaHistory,
                text: 'History'
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

