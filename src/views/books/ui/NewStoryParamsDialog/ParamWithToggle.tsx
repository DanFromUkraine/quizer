import InputSwitch from '@/src/shared/ui/InputSwitch';
import { HrWrapper } from '@/src/shared/ui/Hr';

export default function ParamWithToggle({
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
