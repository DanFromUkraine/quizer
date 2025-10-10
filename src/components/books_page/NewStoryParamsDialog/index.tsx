import Dialog from '@/src/components/general/Dialog';
import {
        CustomParam,
        IsSmartModeToggle,
        ShowAnswersImmediately,
        SubmitButton
} from '@/src/components/books_page/NewStoryParamsDialog/client';
import { NEW_STORY_PARAMS } from '@/src/constants/newCardParams';

export default function NewStoryParamsDialog() {
        return (
                <Dialog
                        dialogName='newStoryParams'
                        className='bg-white w-xl p-6'>
                        <h2 className='heading-2'>Set up your new story</h2>

                        <div className='flex flex-col'>
                                <IsSmartModeToggle />
                                <ShowAnswersImmediately />
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
