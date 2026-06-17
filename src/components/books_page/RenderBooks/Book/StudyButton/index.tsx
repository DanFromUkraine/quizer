'use client';

import useStudyButtonClickHandler from '@/src/hooks/historyRelated/onStudyBtnClick';
import { useBookProps } from '@/src/components/books_page/RenderBooks/Book';
import { BP_TEST_IDS } from '@/src/constants/testIds';

export default function StudyButton() {
    const { id } = useBookProps();
    const onClick = useStudyButtonClickHandler(id);
    return (
        <button
            data-testid={BP_TEST_IDS.bookCard.playBookBtn}
            className='mt-5 w-full rounded-md bg-primary p-2 text-white duration-100 hover:bg-primaryHover'
            onClick={onClick}>
            study
        </button>
    );
}
