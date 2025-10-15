'use client';

import {
        BooleanButtons,
        TermDefinitionTitle,
        useIsCorrectCardStatus
} from '@/src/components/play_page/CardsList/IsCorrectCard/client';



export default function IsCorrectCard({ cardId }: { cardId: string }) {
        const cardStatus = useIsCorrectCardStatus(cardId);
        console.debug('is correct card render')


        return (
                <div data-status={cardStatus} className='questionCard !w-full data-[status=correct]:bg-green-100 data-[status=incorrect]:bg-red-100'>
                        <TermDefinitionTitle cardId={cardId} />
                        <BooleanButtons cardId={cardId} />
                </div>
        );
}
