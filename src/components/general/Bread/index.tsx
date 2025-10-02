import { Serializable } from '@/src/types/globals';
import clsx from 'clsx';

export default function Bread({ items, className }: { items: Serializable[]; className?: string }) {
        return <span className={clsx('span', className)}>{items.join('/')}</span>;
}
