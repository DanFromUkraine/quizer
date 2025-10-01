import QuestionTitle from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle';
import RenderOptions from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions';

export default function ExplicitCardContent() {
        return (
                <section className='flex flex-col gap-2'>
                        <QuestionTitle />
                        <RenderOptions />
                </section>
        );
}
