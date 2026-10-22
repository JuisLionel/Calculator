import type { Metadata } from "next";

import Calculator, { type CalculatorKey } from "./components/calculator";

export const metadata: Metadata = {
  title: "Calculator",
  description: "Welcome to the Calculator page",
};

export default function Home() {
  const keys: CalculatorKey[] = [
    // Row 1
    { label: "DISP", top: true, align: true },
    { label: "GO TO", small: true, top: true, align: true },
    { label: "AUTO REVIEW", small: true, top: true, align: true },
    { label: "CORRECT", small: true, top: true, align: true },
    { label: "ARROWS", group: true, span: "col-span-2", top: true },

    // Row 2
    { label: "TAX+", top: true },
    { label: "TAX−", top: true },
    { label: "%", top: true },
    { label: "√", top: true },
    { label: "►", top: true },
    { label: "MU", top: true },

    // Row 3
    { label: "+/−" }, 
    { label: "7" }, 
    { label: "8" }, 
    { label: "9" }, 
    { label: "×" }, 
    { label: "÷" },

    // Row 4
    { label: "C", red: true }, 
    { label: "4" }, 
    { label: "5" }, 
    { label: "6" }, 
    { label: "−" }, 
    { label: "MRC", small: true },

    // Row 5
    { label: "AC", red: true }, 
    { label: "1" }, 
    { label: "2" }, 
    { label: "3" },
    { label: "+", span: "row-span-2" }, 
    { label: "M−" },

    // Row 6
    { label: "0" }, 
    { label: "00" }, 
    { label: "•" }, 
    { label: "=" }, 
    { label: "M+" },
  ];

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <Calculator keys={keys} />
    </div>
  );
}