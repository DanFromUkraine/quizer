import { CollectionResult } from "@/app/lib/db/AddCollectionPageDB/types";

export default function Collection({
  collectionTitle,
  cards,
}: CollectionResult) {
  return (
    <div className="w-full flex flex-col h-fit rounded-normal overflow-hidden border border-lightGray">
      <div className="w-full h-10 bg-gray-700" />
      <div className="flex flex-col p-6">
        <h3>{collectionTitle}</h3>
      </div>
    </div>
  );
}
