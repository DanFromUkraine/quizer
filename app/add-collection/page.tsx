"use client";

import {
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { MdOutlineAddBox } from "react-icons/md";

function Header() {
  const { control } = useFormContext();
  const { field } = useController({ control, name: "collectionName" });

  console.log("header render");

  return (
    <header className="flex justify-between items-center w-full px-12 py-12">
      <input
        {...field}
        className="heading m-0 outline-none"
        placeholder="Назва колекції"
      />

      <button
        className="bg-myBlue rounded-xl flex font-medium text-base h-min text-white items-center justify-center gap-2 py-3 w-[230px]"
        type="submit"
      >
        <MdOutlineAddBox /> Додати колекцію
      </button>
    </header>
  );
}

export default function page() {
  const methods = useForm({
    defaultValues: {
      collectionName: "",
      cards: [],
    },
  });
  const onSubmit = (data: unknown) => {
    console.log({ data });
  };

  console.log("page render");

  return (
    <main className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header />
          <Cards />
        </form>
      </FormProvider>
    </main>
  );
}

function Cards() {
  const { control } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: "cards",
  });

  console.log("cards render");

  console.log({ fields });

  return (
    <div>
      {fields.map(({ id }, index) => (
        <Card key={id} id={index} />
      ))}

      <button onClick={() => append({})}>Додати</button>
    </div>
  );
}

function Card({ id }: { id: number }) {
  const { control, register } = useFormContext();
  const { fields, append } = useFieldArray({ control, name: `cards.${id}` });

  return (
    <section className="flex flex-col">
      <input {...register("textQuestion")} placeholder="Текст питання" />
    </section>
  );
}
