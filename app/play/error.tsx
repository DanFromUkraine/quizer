'use client';

import { ErrorProps } from 'next/error';

export default function errorPage(params: ErrorProps) {
        return (
                <div>
                        {params.title} {params.statusCode}
                </div>
        );
}
