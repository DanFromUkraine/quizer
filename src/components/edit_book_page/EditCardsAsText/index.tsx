'use client';

import { useAtom } from 'jotai';
import { editCardsAsTextModalVisibilityAtom } from '@/src/jotai/statusAtoms';
import EditCardsAsTextModal from '@/src/components/edit_book_page/EditCardsAsText/Modal';
import { useRef } from 'react';
import clsx from 'clsx';
import useCloseModalWhenClickOnContainer from '@/src/hooks/edit_book_page/useCloseModalWhenClickOnContainer';
import useUpdateCardsFromText from '@/src/hooks/edit_book_page/useUpdateCardsFromText';

export default function EditCardsAsTextModalContainer() {
        const containerRef = useRef<HTMLDivElement>(null);
        const [modalVisible, setModalVisible] = useAtom(
                editCardsAsTextModalVisibilityAtom
        );


        useCloseModalWhenClickOnContainer(containerRef, () =>
                setModalVisible(false)
        );

        useUpdateCardsFromText();

        return (
                <section
                        ref={containerRef}
                        className={clsx(' hidden', {
                                'fixed top-0 left-0 mainContainer h-screen items-center justify-center z-10 backdrop-blur-md duration-100 ':
                                        modalVisible
                        })}>
                        {modalVisible ? <EditCardsAsTextModal /> : <></>}
                </section>
        );
}
