import QuestionTitle from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/QuestionTitle';
import RenderOptions from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions';
import Explanation from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/Explanation';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function ExplicitCardContent() {
        return (
                <section
                        data-testid={EP_TEST_IDS.card.explicitCardContent.me}
                        className='flex flex-col gap-2 explicitCard '>
                        <QuestionTitle />
                        <RenderOptions />
                        <Explanation />
                </section>
        );
}
