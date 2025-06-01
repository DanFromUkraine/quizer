import Header from "./Header";
import RenderCollections from "./RenderCollections";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <RenderCollections />
    </main>
  );
}
