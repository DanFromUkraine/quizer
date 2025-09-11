'use client';

import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import CollectionTitle from './CollectionTitle';
import SaveBtn from './SaveCollectionBtn';
import {
        useGetCollectionTitle,
        useUpdateBookTitle,

} from '@/app/lib/db/ObservableCreateCollectionDB';
import { useEffect } from 'react';

type HeaderFormDataType = {
        collectionTitle: string;
};

function useStayUpdated(
        methods: UseFormReturn<HeaderFormDataType>,
        loading: boolean,
        collectionTitle: string
) {
        const { updateTitle } = useUpdateBookTitle();

        const data = methods.watch();

        useEffect(() => {
                console.log({
                        dirty: methods.formState.isDirty,
                        loading,
                        collectionTitle,
                        data: data.collectionTitle
                });
                if (
                        methods.formState.isDirty &&
                        !loading &&
                        collectionTitle !== data.collectionTitle
                ) {
                        updateTitle(data.collectionTitle);
                }
        }, [updateTitle, loading, collectionTitle]);
}

function useInitFormData(
        methods: UseFormReturn<HeaderFormDataType, any, HeaderFormDataType>,
        collectionTitle: string
) {
        useEffect(() => {
                if (
                        typeof collectionTitle !== 'string' ||
                        collectionTitle.length === 0
                )
                        return;
                methods.reset({
                        collectionTitle
                });
        }, [collectionTitle]);
}

export default function Header() {
        const { defaultCollectionTitle, loading } = useGetCollectionTitle()!;

        const methods = useForm<HeaderFormDataType>({
                defaultValues: {
                        collectionTitle: defaultCollectionTitle
                }
        });
        useStayUpdated(methods, loading, defaultCollectionTitle);
        useInitFormData(methods, defaultCollectionTitle);

        return (
                <FormProvider {...methods}>
                        <form className='w-full'>
                                <header className='w-full flex justify-bАetween'>
                                        <CollectionTitle />
                                        <SaveBtn />
                                </header>
                        </form>
                </FormProvider>
        );
}
