import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function DeleteOptionButtonUI({
        onClick
}: {
        onClick: () => void;
}) {
        return (
                <div
                        data-testid={
                                EP_TEST_IDS.card.explicitCardContent.option
                                        .deleteBtn
                        }
                        className='pointer-events-auto bg-questTextColor h-12 min-w-8 flex justify-center items-center hover:bg-red-500 duration-150 max-[540px]:hidden'
                        onClick={onClick}>
                        <span className='w-2/3 h-1.5 bg-white ' />
                </div>
        );
}
