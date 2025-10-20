import QuestionTitle from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle';
import RenderOptions from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions';
import Explanation from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/Explanation';

export default function ExplicitCardContent() {

        return (
                <section className='flex flex-col gap-2 explicitCard'>
                        <QuestionTitle />
                        <RenderOptions />
                        <Explanation />
                </section>
        );
}
