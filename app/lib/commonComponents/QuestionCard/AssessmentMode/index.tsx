import { AssessmentModeQuestionCardType } from '@/app/lib/db/History/types';
import Heading from './Heading';
import NumberOfCorrectOptions from './NumberOfCorrectOptions';
import RenderOptions from './RenderOptions';
import { memo } from 'react';

export default memo(function AssessmentModeImplementation({
        options,
        questionTitle,
        cardIndex,
        numberOfCorrectAnswers,
        anyOptionChosen
}: AssessmentModeQuestionCardType & {
        cardIndex: number;
}) {
        return (
                <div className='questionCard'>
                        <Heading
                                questionTitle={questionTitle}
                                index={cardIndex}
                        />
                        <NumberOfCorrectOptions
                                {...{ numberOfCorrectAnswers }}
                        />
                        <RenderOptions
                                options={options}
                                isMultiOption={numberOfCorrectAnswers > 1}
                                questionIndex={cardIndex}
                                anyOptionChosen={anyOptionChosen}
                        />
                </div>
        );
});
