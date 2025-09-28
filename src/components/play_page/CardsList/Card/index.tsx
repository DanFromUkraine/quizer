import { FullCard } from '@/src/types/mainDbGlobal';

export default function Card({ card }: { card: FullCard }) {
        return (
                <li>
                        <h3 className='heading-3'>hhh{card.title}</h3>
                </li>
        );
}
