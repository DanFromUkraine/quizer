'use client';

import { TextareaHTMLAttributes, useEffect, useRef } from 'react';

export default function ExtendableTextArea({
        ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
        const ref = useRef<HTMLTextAreaElement>(null);
        const textarea = ref.current;

        const resize = () => {
                console.log('call');
                if (textarea && 'style' in textarea) {
                        textarea.style.height = '48px';
                        textarea.style.height = textarea.scrollHeight + 'px';
                }
        };

        useEffect(() => {
                resize();
        }, [props.defaultValue]);

        useEffect(() => {
                if (!textarea) return;

                textarea.addEventListener('input', resize);

                return () => {
                        textarea.removeEventListener('input', resize);
                };
        }, [ref]);

        return <textarea ref={ref} {...props} />;
}

