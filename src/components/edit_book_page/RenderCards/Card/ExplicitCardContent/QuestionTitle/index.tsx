'use client';

import {
        MainQuestionTitle, SubQuestionTitle
} from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle/client';

export default function QuestionTitle() {
        return (
                <section className="flex flex-col gap-2 w-full">
                        <MainQuestionTitle />
                        <SubQuestionTitle />
                </section>
        );
}
