import clsx from "clsx";
import { ReactNode } from "react";

export default function OptionUI({
  className,
  name,
  defaultChecked,
  children,
  onChange,
}: {
  className?: string;
  name: string;
  defaultChecked: boolean;
  children: ReactNode;
  onChange: () => void;
}) {
  return (
    <div className="flex relative w-fit">
      <input
        type="checkbox"
        name={name}
        className="absolute w-full h-full top-0 left-0 z-50 opacity-0 peer"
        onClick={onChange}
        defaultChecked={defaultChecked}
      />
      <div
        className={clsx(
          "overflow-hidden size-5 rounded-normal border-2 border-[#8f30aa] peer-checked:bg-[#b986c7]",
          className
        )}
      />
      {children}
    </div>
  );
}
