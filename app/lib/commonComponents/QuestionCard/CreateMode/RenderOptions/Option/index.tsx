import { useFormContext } from 'react-hook-form';
import OptionUI from './UI';

export default function Option({
        index,
        remove
}: {
        index: number;
        remove: (i: number) => void;
}) {
        const { control } = useFormContext();
        const onRemoveBtnClick = () => remove(index);

        return (
                <OptionUI
                        index={index}
                        onRemoveBtnClick={onRemoveBtnClick}
                        control={control}
                />
        );
}
