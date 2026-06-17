import { createPropsProvider } from '@/src/utils/createPropsProvider';

type EditBookProps = {
    bookId: string;
};

export const {
    Provider: EditBookPropsProvider,
    usePropsContext: useEditBookProps
} = createPropsProvider<EditBookProps>();
