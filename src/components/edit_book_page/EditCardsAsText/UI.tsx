export function ModeButton({
        title,
        onClick,
        hoverable
}: {
        title: string;
        onClick: () => void;
        hoverable: boolean;
}) {
        return (
                <span
                        data-hoverable={hoverable}
                        onClick={onClick}
                        className='p-2 bg-gray-300 heading-4 text-md rounded-md data-[hoverable=true]:hover:bg-gray-700 data-[hoverable=true]:hover:text-gray-300 duration-100 data-[hoverable=false]:bg-gray-400       '>
                        {title}
                </span>
        );
}
