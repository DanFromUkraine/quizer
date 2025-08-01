import clsx from "clsx";
import { MouseEventHandler } from "react";

export default function ModalContainerUI({
  modalVisible,
  onClick,
}: {
  modalVisible: boolean;
  onClick: MouseEventHandler;
}) {
  return (
    <div
      className={clsx("absolute top-0 left-0 w-full h-full hidden", {
        "!flex": modalVisible,
      })}
    >
      <div
        className="sticky top-0 left-0 w-full h-full backdrop-blur-md flex justify-center items-center"
        onClick={onClick}
      >
        <Modal />
      </div>
    </div>
  );
}

function Modal() {
  return <div className="w-8/12 bg-gray-700 h-8/12 rounded-4xl"></div>;
}
