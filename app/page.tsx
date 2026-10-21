import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the Home page",
};

export default function Home() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white"> 
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Home Page
        </h1>
    </div>
  );
}
