import { createPropsProvider } from '@/src/utils/createPropsProvider';
import OptionTitle from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/OptionTitle';
import DeleteOptionButton from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/DeleteOptionBtn';
import CorrectnessMarketButton from '@/src/components/edit_book_page/RenderCards/Card/RenderOptions/Option/CorrectnessMarkerButton';

interface OptionProps {
        optionId: string;
        optionIndex: number;
}

export const {
        Provider: OptionPropsProvider,
        usePropsContext: useOptionProps
} = createPropsProvider<OptionProps>('card option context');

export default function Option({ optionId, optionIndex }: OptionProps) {
        return (
                <OptionPropsProvider {...{ optionIndex, optionId }}>
                        <div
                                data-testid='container-option'
                                className='group flex justify-between bg-fillbg rounded-normal overflow-hidden w-full text-questTextColor font-semibold'>
                                <CorrectnessMarketButton />
                                <OptionTitle />
                                <DeleteOptionButton />
                        </div>
                </OptionPropsProvider>
        );
}
