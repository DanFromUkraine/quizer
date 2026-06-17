import EditButton from '@/src/components/books_page/RenderBooks/Book/BookToolbar/EditButton';
import DeleteButton from '@/src/components/books_page/RenderBooks/Book/BookToolbar/DeleteButton';

export default function Toolbar() {
    return (
        <div className='mb-1 flex w-full items-center justify-between'>
            <EditButton />
            <DeleteButton />
        </div>
    );
}
