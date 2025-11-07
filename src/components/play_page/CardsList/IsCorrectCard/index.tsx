'use client';

import {
        BooleanButtons,
        TermDefinitionTitle,
        useIsCorrectCardStatus
} from '@/src/components/play_page/CardsList/IsCorrectCard/client';
import { PP_TEST_IDS } from '@/src/constants/testIds';

export default function IsCorrectCard({ cardId }: { cardId: string }) {
        const cardStatus = useIsCorrectCardStatus(cardId);

        return (
                <div
                        data-testid={PP_TEST_IDS.isCorrectCard.me}
                        data-status={cardStatus}
                        className='questionCard !w-full data-[status=correct]:bg-green-100 data-[status=incorrect]:bg-red-100'>
                        <TermDefinitionTitle cardId={cardId} />
                        <BooleanButtons cardId={cardId} />
                </div>
        );
}
