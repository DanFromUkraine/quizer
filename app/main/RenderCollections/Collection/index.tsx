import { CollectionResult } from "@/app/lib/db/ObservableCreateCollectionDB/types";
import Link from "next/link";

export default function Collection({
  collectionTitle,
  cards,
  id,
}: CollectionResult) {
  return (
    <div className="w-full flex flex-col h-fit rounded-normal overflow-hidden border border-lightGray">
      <Link href={`main/play-offline?id=${id}`}>
        <div className="w-full h-10 bg-gray-700" />
        <div className="flex flex-col p-6">
          <h3>{collectionTitle}</h3>
        </div>
      </Link>
    </div>
  );
}
