import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useInputType } from './client';
import { InputContainerProps } from '@/src/components/general/Input/types';
import { IoClose } from 'react-icons/io5';

export function ToggleVisibilityButtonUI({
        toggleInputType,
        isPasswordButtonVisible,
        currentInputType
}: ReturnType<typeof useInputType>) {
        return (
                <button
                        onClick={toggleInputType}
                        type='button'
                        className={clsx('text-xl', {
                                hidden: !isPasswordButtonVisible
                        })}>
                        {currentInputType === 'password' ? (
                                <FaEyeSlash />
                        ) : (
                                <FaEye />
                        )}
                </button>
        );
}

export function InputNameUI({ textContent }: { textContent: string | void }) {
        const textContentVisible = typeof textContent === 'string';
        return (
                <h4
                        className={clsx(
                                'absolute -top-4 left-8 px-2 font-semibold bg-white',
                                { hidden: !textContentVisible }
                        )}>
                        {textContentVisible ? textContent : ''}
                </h4>
        );
}

export function ClearButton({
                                    clearable,
                                    onClearButtonClick
                            }: Pick<InputContainerProps, 'clearable' | 'onClearButtonClick'>) {
        return clearable ? (
                <button
                        type='button'
                        onClick={
                                typeof onClearButtonClick === 'function'
                                        ? onClearButtonClick
                                        : undefined
                        }
                        className={clsx({ hidden: !clearable })}>
                        <IoClose className={clsx('text-xl')} />
                </button>
        ) : (
                <></>
        );
}