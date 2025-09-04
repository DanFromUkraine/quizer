'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { QuestionCardCreateModeProps } from '../types.d';
import CardIndex from './CardIndex';
import { FaRegTrashAlt } from 'react-icons/fa';
import { QuestionTitle } from './QuestionTitle';
import RenderOptions from './RenderOptions';
import { CreateModeQuestionCardType } from '@/app/lib/db/ObservableCreateCollectionDB/types';
import { useOnClickDeleteCard } from '@/app/lib/db/ObservableCreateCollectionDB';
import { useStayUpdated } from './client';
import { memo } from 'react';

export default memo(function CreateModeImplementation({
        id,
        questionTitle,
        options
}: QuestionCardCreateModeProps) {
        console.log({ questionCardId: id });

        const methods = useForm<CreateModeQuestionCardType>({
                defaultValues: {
                        id,
                        questionTitle,
                        options
                }
        });

        useStayUpdated(methods);
        const { onClickDeleteCard } = useOnClickDeleteCard(id);

        return (
                <FormProvider {...methods}>
                        <form className='questionCard'>
                                <div className='flex justify-between items-center'>
                                        <CardIndex />
                                        <FaRegTrashAlt
                                                data-testid='remove-card-btn'
                                                className='text-xl text-questTextColor'
                                                onClick={onClickDeleteCard}
                                        />
                                </div>
                                <QuestionTitle />
                                <RenderOptions />
                        </form>
                </FormProvider>
        );
});
