import BtnWithShortcut from '@/app/lib/componentsUI/ButtonWithShortcut';

export default function AddEmptyCardUI({ onClick }: { onClick: () => void }) {
        return (
                <section className='w-full flex justify-center pt-4'>
                        <BtnWithShortcut
                                textContent='Add card'
                                onClick={onClick}
                                type='button'
                                shortcutKeys={['Ctrl', 'M']}
                                otherAttributes={{
                                        'data-testid': 'add-card'
                                }}
                        />
                </section>
        );
}
