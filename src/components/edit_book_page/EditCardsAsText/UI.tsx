import { EP_TEST_IDS } from '@/src/constants/testIds';

export function ModeButton({
        title,
        onClick,
        hoverable,
        testId
}: {
        title: string;
        onClick: () => void;
        hoverable: boolean;
        testId: string;
}) {
        return (
                <span
                        data-testid={testId}
                        data-hoverable={hoverable}
                        onClick={onClick}
                        className='p-2 bg-gray-300 heading-4 text-md rounded-md data-[hoverable=true]:hover:bg-gray-700 data-[hoverable=true]:hover:text-gray-300 duration-100 data-[hoverable=false]:bg-gray-400       '>
                        {title}
                </span>
        );
}

export function SaveAndCloseButtonUI() {
        return (
                <span
                        data-testid={
                                EP_TEST_IDS.cardsAsTextDialog.saveAndExitBtn
                        }
                        className='bg-blueAccent span px-5 py-2 rounded-md font-semibold !text-white hover:bg-blue-300 duration-100'>
                        Save & close
                </span>
        );
}