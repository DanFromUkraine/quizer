import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type AvailableInputTypes = 'password' | 'text' | 'number';

export type InputContainerProps = {
        inputType: AvailableInputTypes;
        clearable: true | void;
        inputName: string | void;
        inputAttributes: InputHTMLAttributes | TextareaHTMLAttributes | void;
        onClearButtonClick: (() => void) | void;
        extendable: true | void;
};

export interface InputContainerPropsIfClearable extends InputContainerProps {
        clearable: true;
        onClearButtonClick: () => void;
}
