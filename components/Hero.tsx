"use client";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <img src="/icon.svg" alt="Icon" className="w-8 object-contain" />
          <p className="text-4xl tracking-widest font-medium">
            Brev<span className="text-primary font-semibold">AI</span>
          </p>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <Button
            variant="default"
            type="button"
            onClick={() =>
              window.open("https://github.com/TidbitsJS/Summize", "_blank")
            }
            className="gap-4"
          >
            <Github />
            <p>Github</p>
          </Button>
        </div>
      </nav>
      <h1 className="mt-5 text-5xl font-extrabold tracking-wider leading-[1.15] text-center">
        Summarize articles with{" "}
        <span className="rose_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="mt-5 tracking-wider text-lg sm:text-xl text-center max-w-2xl">
        Transform your reading experience with{" "}
        <span className="text-primary">BrevA1</span> — an open-source article
        summarizer that turns long, complex articles into clear, concise
        summaries in a flash. Say goodbye to information overload and hello to
        streamlined insights!
      </h2>
    </header>
  );
};

export default Hero;
