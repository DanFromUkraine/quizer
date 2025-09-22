import ExtendableTextArea from '@/src/components/general/ExtendableInput';
import MainTextArea from '@/src/components/edit_book_page/EditCardsAsText/Modal/MainTextArea';

export default function EditCardsAsTextModal() {
        return (
                <div className='z-50 container p-5 w-8/12 rounded-md shadow-md relative bg-white overflow-auto'>
                        <h2 className='heading-2'>
                                Here you can edit your cards as a text
                        </h2>
                        <MainTextArea />
                </div>
        );
}
