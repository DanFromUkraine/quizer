export default function DateBread({ timeMs }: { timeMs: number }) {
        const date = new Date(timeMs);
        const day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear();

        return <span className='span'>{`${day}/${month}/${year}`}</span>;
}
