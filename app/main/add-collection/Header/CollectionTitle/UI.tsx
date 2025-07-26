import { FormEventHandler, RefObject } from "react";
import { Control, Controller } from "react-hook-form";

export default function CollectionTitleUI({
  ref,
  control,
}: {
  ref: RefObject<HTMLInputElement | null>;
  control: Control;
}) {
  return (
    <Controller
      name="collectionTitle"
      control={control}
      render={({ field: { name, onChange, value } }) => (
        <input
          name={name}
          type="text"
          placeholder="Enter heading"
          className="px-6 py-1.5 w-full text-[#5C5E64] text-2xl font-semibold focus:outline-none mb-8"
          defaultValue={value}
          onChange={onChange}
          />
      )}
    />
  );
}
