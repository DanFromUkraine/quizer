import ExtendableTextArea from '@/src/components/general/ExtendableInput';

export default function EditCardsAsTextModal() {
        return (
                <div className='z-50 container w-8/12 h-8/12 rounded-md shadow-md bg-white'>
                        <h2 className='heading-2'>
                                Here you can edit your cards as a text
                        </h2>
                        <ExtendableTextArea name='cards text input' />
                </div>
        );
}
