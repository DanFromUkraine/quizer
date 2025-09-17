import clsx from 'clsx';
import Link from 'next/link';
import { RefObject } from 'react';
import { BiExpandHorizontal } from 'react-icons/bi';
import { LinkType } from './client';

export function NavLinkUI({
        href,
        Icon,
        pathname,
        text
}: LinkType & { pathname: string }) {
        return (
                <Link
                        href={href}
                        className='flex items-center justify-center gap-2'>
                        <Icon
                                className={clsx('navIcon', {
                                        'bg-lightBg': pathname === href
                                })}
                        />
                        <p className='hidden @sidebarNavTextVisible:flex select-none'>
                                {text}
                        </p>
                </Link>
        );
}

export function DragHandlerUI({
        dragHandlerRef
}: {
        dragHandlerRef: RefObject<HTMLDivElement | null>;
}) {
        return (
                <div
                        ref={dragHandlerRef}
                        className='absolute flex -right-[19px] top-14 p-2 rounded bg-lightBg text-xl js-clickable z-20'>
                        <BiExpandHorizontal />
                </div>
        );
}
