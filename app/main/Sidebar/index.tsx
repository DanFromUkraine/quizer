"use client";

import { RenderNavLinks, useDragSidebar } from "./client";
import { ColorStatusBarUI, DragHandlerUI } from "./UI";

export default function Sidebar() {
  const { containerRef, dragHandlerRef } = useDragSidebar();

  return (
    <nav
      ref={containerRef}
      className="flex flex-col items-center min-w-16 w-16 max-w-lg h-full border-r border-r-lightGray relative @container"
    >
      <DragHandlerUI dragHandlerRef={dragHandlerRef} />
      <ColorStatusBarUI />
      <RenderNavLinks />
    </nav>
  );
}
