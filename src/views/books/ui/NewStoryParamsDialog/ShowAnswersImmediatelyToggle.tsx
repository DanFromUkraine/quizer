'use client';

import { useAtom } from 'jotai';
import { getNewStoryShowAnswersImmediatelyParamAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import ParamWithToggle from '@/src/views/books/ui/NewStoryParamsDialog/ParamWithToggle';

export default function ShowAnswersImmediatelyToggle() {
    const [currState, setCurrState] = useAtom(
        getNewStoryShowAnswersImmediatelyParamAdapterAtom
    );

    return (
        <ParamWithToggle
            {...{
                currState,
                setCurrState,
                title: 'Show answers immediately',
                testId: BP_TEST_IDS.newStoryDialog.areAnswersShownImmediatelyInp
            }}
        />
    );
}
