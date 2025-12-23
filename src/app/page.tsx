import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-[12px]">
      <Header />
      <Hero />
    </main>
  );
}
