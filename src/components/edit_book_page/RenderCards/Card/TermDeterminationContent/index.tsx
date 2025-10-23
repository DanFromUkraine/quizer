'use client';

import TermOrDeterminationInput from '@/src/components/edit_book_page/RenderCards/Card/TermDeterminationContent/client';
import {
        getShortCardDefinitionFamilyAdapterAtom,
        getShortCardTermFamilyAdapterAtom
} from '@/src/utils/jotai/atomAdapters';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { EP_TEST_IDS } from '@/src/constants/testIds';

export default function TermDeterminationContent() {
        const { cardId } = useCardProps();

        return (
                <section className='w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1'>
                        <TermOrDeterminationInput
                                testId={EP_TEST_IDS.card.shortCardContent.termInp}
                                underText='TERM'
                                atomAdapterUnstable={getShortCardTermFamilyAdapterAtom(
                                        cardId
                                )}
                        />
                        <TermOrDeterminationInput
                                testId={EP_TEST_IDS.card.shortCardContent.definitionInp}
                                underText='DEFINITION'
                                atomAdapterUnstable={getShortCardDefinitionFamilyAdapterAtom(
                                        cardId
                                )}
                        />
                </section>
        );
}
