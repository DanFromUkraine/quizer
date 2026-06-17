'use client';

import { useAtom } from 'jotai';
import { getNewStoryIsSmartModeParamAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { BP_TEST_IDS } from '@/src/constants/testIds';
import ParamWithToggle from '@/src/views/books/ui/NewStoryParamsDialog/ParamWithToggle';

export default function IsSmartModeToggle() {
    const [currState, setCurrState] = useAtom(
        getNewStoryIsSmartModeParamAdapterAtom
    );

    return (
        <ParamWithToggle
            {...{
                currState,
                setCurrState,
                title: 'Smart mode',
                testId: BP_TEST_IDS.newStoryDialog.isSmartModeInp
            }}
        />
    );
}
