'use client';

import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';

export default function ExtendableTextArea({
        ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
        return (
                <textarea
                        {...props}
                        className={clsx(
                                'resize-none field-sizing-content',
                                props.className
                        )}></textarea>
        );
}

/* sdfsdf
 * s
 * df
 * sdf
 * */