"use client";

import Link from "next/link";
import { BsFillCollectionFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BiSolidAddToQueue } from "react-icons/bi";

export default function Sidebar() {
  const pathname = usePathname();
  // console.log({ pathname });

  return (
    <nav className="flex flex-col items-center w-16 h-full border-r border-r-lightGray">
      <div className="bg-lightestGray border-b w-full h-32 border-b-lightGray" />
      <Link href="/">
        <BsFillCollectionFill
          className={clsx("navIcon", {
            "bg-lightBg": pathname === "/",
          })}
        />
      </Link>
      <Link href="/history">
        <FaHistory
          className={clsx("navIcon", {
            "bg-lightBg": pathname === "/history",
          })}
        />
      </Link>
      <Link href="/add-collection">
        <BiSolidAddToQueue
          className={clsx("navIcon text-blueAccent", {
            "bg-lightBg": pathname === "/add-collection",
          })}
        />
      </Link>
    </nav>
  );
}
