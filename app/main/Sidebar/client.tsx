'use client';

import { usePathname } from 'next/navigation';
import { RefObject, useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { BiSolidAddToQueue } from 'react-icons/bi';
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
                href: '/main',
                Icon: BsFillCollectionFill,
                text: 'Home Page'
        },
        {
                href: '/main/history',
                Icon: FaHistory,
                text: 'History'
        },
        {
                href: '/main/add-collection',
                Icon: BiSolidAddToQueue,
                text: 'Add Collection'
        }
];

export function RenderNavLinks() {
        const pathname = usePathname();

        return (
                <section className=' flex flex-col items-start'>
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

export function useDragSidebar() {
        const containerRef = useRef<HTMLElement>(null);
        const dragHandlerRef = useRef<HTMLDivElement>(null);
        const sidebarIsBeingResized = useRef(false);

        useEffect(() => {
                const onMouseMove = (event: MouseEvent) => {
                        requestAnimationFrame(() => {
                                if (containerRef.current) {
                                        containerRef.current.style.width = `${event.clientX}px`;
                                }
                        });
                };

                const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                        sidebarIsBeingResized.current = false;
                };

                const onMouseDown = () => {
                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                        sidebarIsBeingResized.current = true;
                };

                const dragElement = dragHandlerRef.current;
                dragElement?.addEventListener('mousedown', onMouseDown);

                return () => {
                        dragElement?.removeEventListener(
                                'mousedown',
                                onMouseDown
                        );
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                };
        }, []);

        return { containerRef, dragHandlerRef };
}
