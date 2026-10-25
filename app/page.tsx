import type { Metadata } from "next";

import MJ100D from "./components/MJ-100D";

export const metadata: Metadata = {
  title: "Calculator",
  description: "Welcome to the Calculator page",
};

export default function Home() {

  return (
    <main className="flex min-h-dvh w-full items-center justify-center bg-white p-2 sm:p-4">
      <MJ100D />
    </main>
  );
}