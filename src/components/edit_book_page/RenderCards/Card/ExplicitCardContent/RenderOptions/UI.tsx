export function NoOptionsMessage({ isVisible }: { isVisible: boolean }) {
    return (
        <h2
            data-visible={isVisible}
            className='m-auto hidden text-lg font-semibold text-[#666b78] data-[visible=true]:col-span-full data-[visible=true]:!flex'>
            No options yet
        </h2>
    );
}
