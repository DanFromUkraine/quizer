'use client';

import Link from 'next/link';

export function SkipBtn() {
        return (
                <Link href='/books' className='text-secondary'>
                        Skip for now
                </Link>
        );
}
