import FallingText from "./components/Text/FallingText";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7f7fb] via-white to-[#f1eef8] p-4">
      {/* Wrapper takes the falling text out of the flex layout */}
      <div className="absolute inset-0">
        <FallingText
          text="0 1 2 3 4 5 6 7 8 9 + − × ÷ % √ ="
          highlightWords={["+", "−", "×", "÷", "%", "√", "="]}
          trigger="auto"
          fontSize="clamp(4rem, 12vw, 9rem)"
          gravity={1}
          restoreDelay={0}
          variant="text"
          split="letters"
          order="random"
          bounciness={0.2}
          scatter={0.5}
          stagger={0.03}
          cursorPush={0.5}
          mouseConstraintStiffness={0.2}
          accentColor="#6e11b0"
          draggable={false}
          wireframes={false}
          className="h-full w-full items-start! justify-center! font-bold text-[#484655]/20"
          textClassName="!p-0 text-center"
        />
      </div>

      <section className="relative z-10 w-full max-w-lg rounded-3xl border border-white/80 bg-white/65 p-8 text-center shadow-xl shadow-[#484655]/10 backdrop-blur-md sm:p-12">
        <p className="casio-logo text-sm tracking-[0.3em] text-[#7d80df]">
          404 — CASIO CALCULATOR
        </p>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#252431] sm:text-4xl">
          You seem <span className="text-[#6e11b0]">lost.</span>
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-[#666572] sm:text-lg">
          Let’s get you back to the right page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#6e11b0] px-6 py-3 font-semibold text-white shadow-lg shadow-[#6e11b0]/20 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6e11b0]"
        >
          Go back
        </Link>
      </section>
    </main>
  );
}