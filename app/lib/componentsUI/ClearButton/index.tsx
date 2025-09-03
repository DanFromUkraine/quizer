import clsx from 'clsx';
import { IoClose } from 'react-icons/io5';

export type ClearButtonUIProps = {
        clear?: () => void;
        clearable: boolean;
        classNameIcon?: string;
};

export function ClearButtonUI({
        clear,
        clearable,
        classNameIcon
}: ClearButtonUIProps) {
        return (
                <button
                        type='button'
                        onClick={clear}
                        className={clsx({ hidden: !clearable })}>
                        <IoClose className={clsx('text-xl', classNameIcon)} />
                </button>
        );
}
