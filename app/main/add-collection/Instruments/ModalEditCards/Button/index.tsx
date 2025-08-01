"use client";

import { useSetAtom } from "jotai";
import ButtonUI from "./UI";
import { cardsEditModalVisibilityAtom } from "@/app/lib/jotai/addCollection";

export default function Button() {
  const setModalVisibility = useSetAtom(cardsEditModalVisibilityAtom);

  const onClick = () => {
    setModalVisibility(true);
    console.log("click")
  };

  return <ButtonUI onClick={onClick} />;
}
