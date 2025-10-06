export function NoOptionsMessage({ isVisible }: { isVisible: boolean }) {
        return (
                <h2
                        data-visible={isVisible}
                        className='!text-gray-500 heading-2 hidden data-[visible=true]:!flex m-auto'>
                        No options yet
                </h2>
        );
}
