export default function DeleteOptionButtonUI({onClick}: {onClick: () => void}) {
        return (
                <div
                        data-testid='option-remove-btn'
                        className='pointer-events-auto bg-questTextColor h-12 min-w-8 flex justify-center items-center hover:bg-red-500 duration-150 max-[540px]:hidden'
                        onClick={onClick}>
                        <span className='w-2/3 h-1.5 bg-white ' />
                </div>
        );
}
