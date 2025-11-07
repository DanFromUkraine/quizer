import clsx from 'clsx';
import Link from 'next/link';
import { LinkType } from './client';

export function NavLinkUI({
        href,
        Icon,
        pathname,
        text,
        testId
}: LinkType & { pathname: string }) {
        return (
                <Link
                        data-testid={testId}
                        href={href}
                        className={clsx('navLink', {
                                'bg-gray-200': pathname === href
                        })}>
                        <Icon className='navIcon' />
                        <p className='flex select-none whitespace-nowrap max-[350px]:hidden'>
                                {text}
                        </p>
                </Link>
        );
}
