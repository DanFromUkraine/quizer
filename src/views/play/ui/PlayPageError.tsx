'use client';

import { ErrorProps } from 'next/error';

export function PlayPageError(params: ErrorProps) {
    return (
        <div>
            {params.title} {params.statusCode}
        </div>
    );
}
