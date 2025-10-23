import InputSwitch from '@/src/components/general/InputSwitch';
import { HrWrapper } from '@/src/components/general/Hr';

export function ParamWithToggleUI({
        currState,
        setCurrState,
        title,
        testId
}: {
        currState: boolean;
        setCurrState: (newVal: boolean) => void;
        title: string;
        testId: string;
}) {
        return (
                <HrWrapper>
                        <section className='flex justify-between'>
                                <h3 className='heading-3'>{title}:</h3>
                                <InputSwitch {...{ currState, setCurrState, testId }} />
                        </section>
                </HrWrapper>
        );
}
