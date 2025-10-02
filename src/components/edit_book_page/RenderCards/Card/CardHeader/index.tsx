import {
        CardIndex,
        DeleteCardButton
} from '@/src/components/edit_book_page/RenderCards/Card/CardHeader/client';

export default function CardHeader() {
        return (
                <div className='flex justify-between items-center'>
                        <CardIndex />
                        <DeleteCardButton />
                </div>
        );
}
