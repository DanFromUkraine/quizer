import { FieldValues, UseFormRegister } from "react-hook-form";
import { Data } from "../page";

export default function HeaderUI({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <header className="flex justify-between items-center py-4">
      <input
        {...register("collectionName")}
        placeholder="Назва колекції"
        className="border-b-2 border-gray-300 focus:border-blue-500 outline-none text-xl font-semibold flex-grow mr-4"
      />
    </header>
  );
}
