import { useSaveCollection } from "@/app/lib/db/AddCollectionPageDB";
import { statusBarColorAtom } from "@/app/lib/jotai/userState";
import { useSetAtom } from "jotai";
import SaveCollectionBtnUI from "./UI";

export default function SaveBtn() {
  const { onSaveButtonClick } = useSaveCollection();
  const setStatusBarColor = useSetAtom(statusBarColorAtom);

  const onMouseDown = () => {
    setStatusBarColor("green");
  };

  const onMouseUp = () => {
    setStatusBarColor(undefined);
  };

  return (
    <SaveCollectionBtnUI {...{ onSaveButtonClick, onMouseDown, onMouseUp }} />
  );
}
