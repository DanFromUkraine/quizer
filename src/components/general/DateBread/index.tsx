import Bread from '@/src/components/general/Bread';

export default function DateBread({
        timeMs,
        className
}: {
        timeMs: number;
        className?: string;
}) {
        const date = new Date(timeMs);
        const day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear();

        return <Bread items={[day, month, year]} className={className} />;
}
