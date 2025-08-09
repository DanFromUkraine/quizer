import { useDB } from "./provider";
import { useDB as useMainDB } from "../MainPageDB/provider";

export function useInitFromHistory() {
  const { db: mainDB } = useMainDB();
  const { db, forwardInfo } = useDB();
}
