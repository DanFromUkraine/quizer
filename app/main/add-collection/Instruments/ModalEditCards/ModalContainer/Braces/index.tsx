import clsx from "clsx";
import { ReactNode } from "react";

/*
    brightness-[1]
    brightness-[1.3]
    brightness-[1.6]
    brightness-[1.8]
    brightness-[2.2]
    brightness-[2.5]
    brightness-[2.8]
*/

export default function Braces({
  colorPriority,
  children,
  classNameParent,
}: {
  colorPriority: 1 | 2 | 3 | 4 | 5 | 6 | 7 /* Lower number - higher priority */;
  children: ReactNode;
  classNameParent?: string;
}) {
  return (
    <div className={clsx("flex w-full", classNameParent)}>
      <div
        className={`border-4 border-r-0 border-[#8f30aa] w-6 brightness-[${
          1 + (colorPriority - 1) * 0.3
        }]`}
      />
      <div
        className="py-5 w-full
      "
      >
        {children}
      </div>
    </div>
  );
}
