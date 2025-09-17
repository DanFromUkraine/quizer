import { SaveBtn } from './client';

export function HeaderUI() {
        return (
                <div className='flex w-full justify-between items-center'>
                        <PageInputTitle />
                        <SaveBtn />
                </div>
        );
}

function PageInputTitle() {
        return (
                <input
                        type='text'
                        placeholder='Введіть заголовок'
                        className='px-6 py-1.5 text-[#5C5E64] text-2xl font-semibold focus:outline-none mb-8'
                        // defaultValue={defValue}
                        // onChange={onChange}
                />
        );
}

export function PageSkeleton() {
        return <div>And this is skeleton</div>;
}
