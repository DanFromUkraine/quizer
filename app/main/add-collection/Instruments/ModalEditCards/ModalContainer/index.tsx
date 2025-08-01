"use client";

import { cardsEditModalVisibilityAtom } from "@/app/lib/jotai/addCollection";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import { MouseEventHandler, useRef } from "react";
import ModalContainerUI from "./UI";

export function ModalContainer() {
  const [modalVisible, setModalVisible] = useAtom(cardsEditModalVisibilityAtom);
  const onClick: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      setModalVisible(false);
    }
  };

  return <ModalContainerUI onClick={onClick} modalVisible={modalVisible} />;
}
