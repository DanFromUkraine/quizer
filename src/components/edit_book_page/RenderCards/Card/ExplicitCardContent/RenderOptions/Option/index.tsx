'use client';

import { createPropsProvider } from '@/src/utils/createPropsProvider';
import OptionTitle from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/OptionTitle';
import DeleteOptionButton from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/DeleteOptionBtn';
import CorrectnessMarketButton from '@/src/components/edit_book_page/RenderCards/Card/ExplicitCardContent/RenderOptions/Option/CorrectnessMarkerButton';
import { useEffect, useMemo, useRef } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useAtom, useSetAtom } from 'jotai';
import { deleteOptionAtom } from '@/src/jotai/optionAtoms';
import { useCardProps } from '@/src/components/edit_book_page/RenderCards/Card';
import { getOptionCorrectnessMarkerFamilyAdapterAtom } from '@/src/utils/jotai/atomAdapters';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { FaXmark } from 'react-icons/fa6';
import { EP_TEST_IDS } from '@/src/constants/testIds';

interface OptionProps {
    optionId: string;
    optionIndex: number;
}

export const {
    Provider: OptionPropsProvider,
    usePropsContext: useOptionProps
} = createPropsProvider<OptionProps>('card option context');

const MAX_DRAG_WIDTH_PX = 60;

function useSwipe({
    onLeft,
    onRight,
    dependencies
}: {
    onLeft: () => void;
    onRight: () => void;
    dependencies?: unknown[];
}) {
    const targetElRef = useRef<HTMLDivElement>(null);
    const startX = useRef(0);
    const currentX = useRef(0);

    useEffect(() => {
        const option = targetElRef.current;
        if (!option) return;
        const dragListener = (ev: TouchEvent) => {
            ev.preventDefault();
            const newX = ev.touches[0].clientX;

            if (Math.abs(startX.current - newX) > MAX_DRAG_WIDTH_PX + 10)
                return;

            currentX.current = newX;
            option.style.transform = `translateX(${currentX.current - startX.current}px)`;
        };
        const touchStartListener = (ev: TouchEvent) => {
            startX.current = ev.touches[0].clientX;
            option.style.transition = 'none';
        };
        const touchEndListener = () => {
            option.style.transition = 'transform 0.2s ease';
            const diff = currentX.current - startX.current;

            if (currentX.current === 0) return;

            if (diff > MAX_DRAG_WIDTH_PX - (MAX_DRAG_WIDTH_PX / 100) * 20) {
                onRight();
            } else if (
                diff <
                -MAX_DRAG_WIDTH_PX + (MAX_DRAG_WIDTH_PX / 100) * 20
            ) {
                onLeft();
            }
            option.style.transform = 'translateX(0px)';
            startX.current = 0;
            currentX.current = 0;
        };

        option.addEventListener('touchstart', touchStartListener, {
            passive: true
        });
        option.addEventListener('touchend', touchEndListener, {
            passive: true
        });
        option.addEventListener('touchmove', dragListener, {
            passive: false
        });

        return () => {
            option.removeEventListener('touchstart', touchStartListener);
            option.removeEventListener('touchend', touchEndListener);
            option.removeEventListener('touchmove', dragListener);
        };
    }, [dependencies]);

    return targetElRef;
}

function useSwipeOption(optionId: string) {
    const deleteOption = useSetAtom(deleteOptionAtom);
    const { cardId } = useCardProps();
    const stableAdapterAtom = useMemo(
        () => getOptionCorrectnessMarkerFamilyAdapterAtom(optionId),
        []
    );

    const [isOptionCorrect, setIsOptionCorrect] = useAtom(stableAdapterAtom);

    const optionRef = useSwipe({
        onLeft: () => {
            void deleteOption(cardId, optionId);
        },
        onRight: () => {
            void setIsOptionCorrect(!isOptionCorrect);
        },
        dependencies: [isOptionCorrect]
    });

    return {
        optionRef,
        isOptionCorrect
    };
}

export default function Option({ optionId, optionIndex }: OptionProps) {
    const { isOptionCorrect, optionRef } = useSwipeOption(optionId);

    return (
        <OptionPropsProvider {...{ optionIndex, optionId }}>
            <div
                className='relative flex min-h-[54px] w-full overflow-hidden rounded-xl'
                data-testid={EP_TEST_IDS.card.explicitCardContent.option.me}>
                <div
                    data-iscorrect={!isOptionCorrect}
                    className='absolute top-0 left-0 z-0 flex h-full w-1/2 items-center rounded-xl bg-red-500 data-[iscorrect=true]:bg-green-500 min-[540px]:hidden'>
                    {!isOptionCorrect ? (
                        <IoCheckmarkCircleOutline className='text-semibold my-auto ml-5 flex text-3xl text-white' />
                    ) : (
                        <FaXmark className='text-semibold my-auto ml-5 flex text-2xl text-white' />
                    )}
                </div>
                <div
                    data-status={isOptionCorrect ? 'correct' : 'incorrect'}
                    ref={optionRef}
                    data-testid={
                        EP_TEST_IDS.card.explicitCardContent.option.mainOptBody
                            .me
                    }
                    className='group relative z-10 flex min-h-[54px] w-full items-center gap-2 overflow-hidden rounded-xl border border-[#e1e5ec] bg-white  font-semibold text-[#222] min-[540px]:pointer-events-none'>
                    <CorrectnessMarketButton />
                    <OptionTitle />
                    <DeleteOptionButton />
                </div>
                <div className='absolute top-0 right-0 z-0 flex h-full w-1/2 items-center justify-end rounded-xl bg-red-500 min-[540px]:hidden'>
                    <MdDeleteOutline className='mr-5 text-2xl text-white' />
                </div>
            </div>
        </OptionPropsProvider>
    );
}
