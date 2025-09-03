import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import Modal from './Modal';

export default function ModalContainerUI({
        modalVisible,
        onClick
}: {
        modalVisible: boolean;
        onClick: MouseEventHandler;
}) {
        return (
                <div
                        className={clsx(
                                'absolute top-0 left-0 w-full h-full  hidden',
                                {
                                        '!flex': modalVisible
                                }
                        )}>
                        <div
                                className='sticky top-0 left-0 w-full h-full backdrop-blur-md flex z-30 justify-center items-center'
                                onClick={onClick}>
                                <Modal />
                        </div>
                </div>
        );
}
