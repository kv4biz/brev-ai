import Demo from "@/components/Demo";
import Hero from "@/components/Hero";
import DotPattern from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main>
      <div className="main">
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(340px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
}
