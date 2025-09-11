export default function QuestionTitle({ title }: { title: string }) {
        return (
                <div className='flex flex-col justify-center gap-6 pl-1'>
                        <h2 className='text-xl w-full font-semibold'>
                                {title}
                        </h2>
                </div>
        );
}
