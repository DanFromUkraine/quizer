"use client";
import Header from "./Header";
import RenderCards from "./RenderCards";

export default function PageUI() {
  return (
    <main className="w-full p-8 flex flex-col min-h-full">
      <Header />
      <RenderCards />
    </main>
  );
}
