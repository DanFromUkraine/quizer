import { ChangeEventHandler } from 'react';

export default function getInputChangeCallback<
        T extends HTMLInputElement | HTMLTextAreaElement
>(callback: (arg1: string) => void) {
        const onChange: ChangeEventHandler<T> = (e) => {
                const val = e.target.value;
                callback(val);
        };
        return onChange;
}
