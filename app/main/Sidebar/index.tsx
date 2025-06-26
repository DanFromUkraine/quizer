"use client";

import { RenderNavLinks, useDragSidebar } from "./client";
import { ColorStatusBar } from "./ColorStatusBar";
import {  DragHandlerUI } from "./UI";

export default function Sidebar() {
  const { containerRef, dragHandlerRef } = useDragSidebar();

  return (
    <nav
      ref={containerRef}
      className="flex flex-col items-center min-w-16 w-16 max-w-lg h-screen border-r border-r-lightGray sticky top-0 left-0 @container"
    >
      <DragHandlerUI dragHandlerRef={dragHandlerRef} />
      <ColorStatusBar />
      <RenderNavLinks />
    </nav>
  );
}
