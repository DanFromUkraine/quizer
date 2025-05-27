import Header from "./components/Header";
import RenderCollections from "./components/RenderCollections";

export default function page() {
  return (
    <main className="flex flex-col">
      <Header />
      <RenderCollections />
    </main>
  );
}
