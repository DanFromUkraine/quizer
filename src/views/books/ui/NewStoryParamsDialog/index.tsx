import Dialog from '@/src/components/general/Dialog';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import CustomParamsList from '@/src/views/books/ui/NewStoryParamsDialog/CustomParamsList';
import IsSmartModeToggle from '@/src/views/books/ui/NewStoryParamsDialog/IsSmartModeToggle';
import ShowAnswersImmediatelyToggle from '@/src/views/books/ui/NewStoryParamsDialog/ShowAnswersImmediatelyToggle';
import SubmitButton from '@/src/views/books/ui/NewStoryParamsDialog/SubmitButton';

export default function NewStoryParamsDialog() {
    return (
        <Dialog
            testId={BP_TEST_IDS.newStoryDialog.me}
            dialogName='newStoryParams'
            className='w-xl bg-white p-6'>
            <h2 className='heading-2'>Set up your new story</h2>

            <div className='flex flex-col'>
                <IsSmartModeToggle />
                <ShowAnswersImmediatelyToggle />
                <CustomParamsList />
                <SubmitButton />
            </div>
        </Dialog>
    );
}
