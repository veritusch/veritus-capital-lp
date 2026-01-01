import Header from "../components/Header";
import Hero from "../components/Hero";
import WhoWeAre from "../components/WhoWeAre";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-[21px] relative">
      <div className="relative z-10">
        <Header />
      </div>
      <div className="-mt-[32px]">
        <Hero />
      </div>
      <div>
        <WhoWeAre />
      </div>
    </main>
  );
}
