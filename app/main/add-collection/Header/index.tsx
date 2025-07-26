"use client";

import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import CollectionTitle from "./CollectionTitle";
import SaveBtn from "./SaveCollectionBtn";
import {
  useGetPageTitle,
  useUpdatePageTitle,
} from "@/app/lib/db/AddCollectionPageDB";
import { useEffect } from "react";

type HeaderFormDataType = {
  collectionTitle: string;
};

function useStayUpdated(methods: UseFormReturn<HeaderFormDataType>) {
  const { updateTitle } = useUpdatePageTitle();

  const data = methods.watch();

  useEffect(() => {
    if (methods.formState.isDirty) {
      updateTitle(data.collectionTitle);
    }
  }, [updateTitle, data]);
}

export default function Header() {
  const { title } = useGetPageTitle();

  console.log("call")

  const methods = useForm<HeaderFormDataType>({
    defaultValues: {
      collectionTitle: title,
    },
  });

  useStayUpdated(methods);

  return (
    <FormProvider {...methods}>
      <header className="w-full flex justify-between">
        <CollectionTitle />
        <SaveBtn />
      </header>
    </FormProvider>
  );
}
