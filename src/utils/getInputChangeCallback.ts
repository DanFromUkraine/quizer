import { ChangeEventHandler } from 'react';

export default function getInputChangeCallback(
        callback: (arg1: string) => void
) {
        const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
                const val = e.target.value;
                callback(val);
        };
        return onChange;
}
