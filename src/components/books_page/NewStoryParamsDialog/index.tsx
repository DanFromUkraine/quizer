import Dialog from '@/src/components/general/Dialog';
import {
        CustomParam,
        IsSmartModeToggle,
        ShowAnswersImmediatelyToggle,
        SubmitButton
} from '@/src/components/books_page/NewStoryParamsDialog/client';
import { NEW_STORY_PARAMS } from '@/src/constants/newCardParams';
import { BP_TEST_IDS } from '@/src/constants/testIds';

export default function NewStoryParamsDialog() {
        return (
                <Dialog
                        testId={BP_TEST_IDS.newStoryDialog.me}
                        dialogName='newStoryParams'
                        className='bg-white w-xl p-6'>
                        <h2 className='heading-2'>Set up your new story</h2>

                        <div className='flex flex-col'>
                                <IsSmartModeToggle />
                                <ShowAnswersImmediatelyToggle />
                                <ul>
                                        <li>
                                                <h3 className='heading-3 mb-5'>
                                                        Custom settings:
                                                </h3>
                                        </li>
                                        {NEW_STORY_PARAMS.map((param) => (
                                                <CustomParam
                                                        key={param.title}
                                                        {...param}
                                                />
                                        ))}
                                </ul>

                                <SubmitButton />
                        </div>
                </Dialog>
        );
}
