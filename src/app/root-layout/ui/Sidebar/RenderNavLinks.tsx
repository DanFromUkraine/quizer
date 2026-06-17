'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';
import { NAV_LINKS } from '@/src/app/root-layout/ui/const';

export function RenderNavLinks() {
    const pathname = usePathname();

    return (
        <section className='static m-0 flex w-full items-center max-sm:justify-center max-sm:gap-3 sm:flex-col sm:px-5 sm:pt-5'>
            {NAV_LINKS.map(({ href, Icon, text, testId }) => (
                <Link
                    key={href}
                    data-testid={testId}
                    href={href}
                    className={clsx(
                        'xl-mobile:px-8 m-3 flex items-center gap-2 rounded-xl max-sm:m-0 sm:p-3',
                        {
                            'bg-gray-200 max-sm:p-3': pathname === href
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
