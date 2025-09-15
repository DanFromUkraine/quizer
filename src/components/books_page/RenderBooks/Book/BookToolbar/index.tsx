import { MdDelete, MdEdit } from 'react-icons/md';
import EditButton from '@/src/components/books_page/RenderBooks/Book/BookToolbar/EditButton';
import DeleteButton from '@/src/components/books_page/RenderBooks/Book/BookToolbar/DeleteButton';

export default function Toolbar() {
        return (
                <div className='flex w-full justify-between items-center mb-1'>
                       <EditButton />
                        <DeleteButton />
                </div>
        );
}
