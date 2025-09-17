import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import CollectionTitleUI from './UI';

export default function CollectionTitle() {
        const titleRef = useRef<HTMLInputElement>(null);
        const { control, register } = useFormContext();

        return <CollectionTitleUI {...{ ref: titleRef, register }} />;
}
