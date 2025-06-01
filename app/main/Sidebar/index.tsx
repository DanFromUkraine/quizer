"use client";

import Link from "next/link";
import { BsFillCollectionFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { BiSolidAddToQueue, BiExpandHorizontal } from "react-icons/bi";
import { IconType } from "react-icons";
import { MouseEventHandler, Ref, RefObject, useEffect, useRef } from "react";

type Link = {
  href: string;
  Icon: IconType;
};

const NAV_LINKS: Link[] = [
  {
    href: "/main",
    Icon: BsFillCollectionFill,
  },
  {
    href: "/main/history",
    Icon: FaHistory,
  },
  {
    href: "/main/add-collection",
    Icon: BiSolidAddToQueue,
  },
];

export default function Sidebar() {
  const containerRef = useRef<HTMLElement>(null);
  const dragHandler = useRef<HTMLDivElement>(null);
  const sidebarIsBeingResized = useRef(false);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.style.width = `${event.clientX}px`;
        }
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      sidebarIsBeingResized.current = false;
    };

    const onMouseDown = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      sidebarIsBeingResized.current = true;
    };

    const dragElement = dragHandler.current;
    dragElement?.addEventListener("mousedown", onMouseDown);

    return () => {
      dragElement?.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <nav
      ref={containerRef}
      className="flex flex-col items-center min-w-16 w-16 max-w-lg h-full border-r border-r-lightGray relative"
    >
      <div className="animated-gradient border-b w-full h-32 border-b-lightGray" />
      <div
        ref={dragHandler}
        className="absolute flex -right-[19px] top-14 p-2 rounded bg-lightBg text-xl js-clickable"
      >
        <BiExpandHorizontal />
      </div>
      <RenderNavLinks />
    </nav>
  );
}

function RenderNavLinks() {
  const pathname = usePathname();

  return NAV_LINKS.map((link) => (
    <NavLink key={link.href} {...link} pathname={pathname} />
  ));
}

function NavLink({ href, Icon, pathname }: Link & { pathname: string }) {
  return (
    <Link href={href}>
      <Icon
        className={clsx("navIcon", {
          "bg-lightBg": pathname === href,
        })}
      />
    </Link>
  );
}
