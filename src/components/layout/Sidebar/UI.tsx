import clsx from 'clsx';
import Link from 'next/link';
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
                        className='flex items-center justify-center m-3 gap-2'>
                        <Icon
                                className={clsx('navIcon', {
                                        'bg-lightBg': pathname === href
                                })}
                        />
                        <p className='flex select-none whitespace-nowrap'>
                                {text}
                        </p>
                </Link>
        );
}

