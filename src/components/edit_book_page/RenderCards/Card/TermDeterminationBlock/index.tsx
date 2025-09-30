import TermOrDeterminationInput from '@/src/components/edit_book_page/RenderCards/Card/TermDeterminationBlock/UI';

export default function TermDeterminationBlock() {
        return (
                <section className='flex gap-2'>
                        <TermOrDeterminationInput
                                {...{
                                        underText: 'TERM',
                                        value: '',
                                        onChange: () => {}
                                }}
                        />
                        <TermOrDeterminationInput
                                {...{
                                        underText: 'DEFINITION',
                                        value: '',
                                        onChange: () => {}
                                }}
                        />
                </section>
        );
}
