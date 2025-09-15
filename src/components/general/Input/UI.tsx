import clsx from 'clsx';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useInputType } from './client';

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

export function InputNameUI({ textContent }: { textContent: string }) {
        return (
                <h4 className='absolute -top-4 left-8 px-2 font-semibold bg-white'>
                        {textContent}
                </h4>
        );
}
