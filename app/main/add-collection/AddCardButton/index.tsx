import BtnWithShortcut from '@/app/lib/componentsUI/ButtonWithShortcut';
import { useAddEmptyCard } from '@/app/lib/db/ObservableCreateCollectionDB';
import AddEmptyCardUI from './UI';

export default function AddCardButton() {
        const { addEmptyCard } = useAddEmptyCard();
        const onButtonClick = () => addEmptyCard();

        return <AddEmptyCardUI onClick={onButtonClick} />;
}
