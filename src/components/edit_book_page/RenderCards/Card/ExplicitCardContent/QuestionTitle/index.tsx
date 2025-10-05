'use client';

import {
        MainQuestionTitle, SubQuestionTitle
} from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle/client';

export default function QuestionTitle() {
        return (
                <section className="flex flex-col w-full">
                        <MainQuestionTitle />
                        <SubQuestionTitle />
                </section>
        );
}
