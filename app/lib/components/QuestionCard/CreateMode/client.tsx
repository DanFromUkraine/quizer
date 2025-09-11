'use client';

import { useUpdateCard } from '@/app/lib/db/ObservableCreateCollectionDB';
import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function useStayUpdated(
        methods: UseFormReturn<CreateModeQuestionCardType>
) {
        const data = methods.watch();
        const updateCard = useUpdateCard();

        useEffect(() => {
                if (methods.formState.isDirty) {
                        updateCard({
                                ...data,
                                numberOfCorrectAnswers:
                                        calculateNumberOfCorrectOptions(
                                                data.options
                                        )
                        });
                }
        }, [data]);
}

function calculateNumberOfCorrectOptions(
        options: Pick<CreateModeQuestionCardType, 'options'>['options']
) {
        return options.reduce(
                (accum, { isCorrect }) => (isCorrect ? accum + 1 : accum),
                0
        );
}
