'use client';

import {
        BooleanButtons,
        TermDefinitionTitle,
        useIsCorrectCardStatus
} from '@/src/components/play_page/CardsList/IsCorrectCard/client';



export default function IsCorrectCard({ cardId }: { cardId: string }) {
        const cardStatus = useIsCorrectCardStatus(cardId);

        return (
                <div data-status={cardStatus} className='questionCard !w-full data-[status=correct]:bg-green-200 data-[status=incorrect]:bg-red-200'>
                        <TermDefinitionTitle cardId={cardId} />
                        <BooleanButtons cardId={cardId} />
                </div>
        );
}
