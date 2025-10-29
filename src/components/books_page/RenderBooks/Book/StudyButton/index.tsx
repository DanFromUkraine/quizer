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
                        className='mt-5 w-full text-white  hover:bg-blue-200 p-2 rounded-md bg-blue-400 duration-100'
                        onClick={onClick}>
                        study
                </button>
        );
}
