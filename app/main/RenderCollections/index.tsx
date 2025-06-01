"use client";

export default function RenderCollections() {
  const collections =
    typeof document !== "undefined"
      ? (localStorage.getItem("collections") as string[] | null)
      : [];

  return (
    <div>
      {collections?.map(() => (
        <Collection />
      ))}
    </div>
  );
}

function Collection() {
  return <div></div>;
}
