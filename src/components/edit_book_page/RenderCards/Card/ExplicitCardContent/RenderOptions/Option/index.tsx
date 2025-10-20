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

                        if (
                                Math.abs(startX.current - newX) >
                                MAX_DRAG_WIDTH_PX + 10
                        )
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

                        if (diff > MAX_DRAG_WIDTH_PX) {
                                onRight();
                        } else if (diff < -MAX_DRAG_WIDTH_PX) {
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
                        option.removeEventListener(
                                'touchstart',
                                touchStartListener
                        );
                        option.removeEventListener(
                                'touchend',
                                touchEndListener
                        );
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

        const [isOptionCorrect, setIsOptionCorrect] =
                useAtom(stableAdapterAtom);

        const optionRef = useSwipe({
                onLeft: () => {
                        deleteOption(cardId, optionId);
                },
                onRight: () => {
                        setIsOptionCorrect(!isOptionCorrect);
                        console.debug('callR');
                },
                dependencies: [isOptionCorrect]
        });

        return {
                optionRef,
                isOptionCorrect
        }
}

export default function Option({ optionId, optionIndex }: OptionProps) {
        const {isOptionCorrect, optionRef} = useSwipeOption(optionId);

        return (
                <OptionPropsProvider {...{ optionIndex, optionId }}>
                        <div className='optionContainer'>
                                <div
                                        data-iscorrect={!isOptionCorrect}
                                        className='beforeOptionMobile'
                                />
                                <div
                                        data-status={
                                                isOptionCorrect
                                                        ? 'correct'
                                                        : 'incorrect'
                                        }
                                        ref={optionRef}
                                        data-testid='container-option'
                                        className='option group '>
                                        <CorrectnessMarketButton />
                                        <OptionTitle />
                                        <DeleteOptionButton />
                                </div>
                                <div className='afterOptionMobile'>
                                        <MdDeleteOutline className='text-white text-2xl mr-5' />
                                </div>
                        </div>
                </OptionPropsProvider>
        );
}
