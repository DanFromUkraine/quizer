import { useSaveCollection } from "@/app/lib/db/AddCollectionPageDB";

export default function SaveBtn() {
  const { onSaveButtonClick } = useSaveCollection();
  return (
    <button
      className="bg-gray-800 hover:bg-green-800 simpleButton"
      onClick={onSaveButtonClick}
    >
      Зберегти
    </button>
  );
}
