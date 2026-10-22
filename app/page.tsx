import type { Metadata } from "next";

type CalculatorKey = {
  label: string;
  small?: boolean;
  red?: boolean;
  span?: string;
};

export const metadata: Metadata = {
  title: "Calculator",
  description: "Welcome to the Calculator page",
};

export default function Home() {
  const keys: CalculatorKey[] = [

    { label: "DISP" }, { label: "+/−", small: true }, { label: "MRC", small: true },
    { label: "CORRECT", small: true }, { label: "▲", small: true }, { label: "▼", small: true },

    { label: "TAX+"}, { label: "TAX−" }, { label: "MC", small: true },
    { label: "M−", small: true }, { label: "MU" }, { label: "GT" },

    { label: "►" }, { label: "7" }, { label: "8" }, { label: "9" }, { label: "%" }, { label: "√" },

    { label: "C", red: true }, { label: "4" }, { label: "5" }, { label: "6" }, { label: "×" }, { label: "÷" },

    { label: "AC", red: true }, { label: "1" }, { label: "2" }, { label: "3" },
    { label: "+", span: "row-span-2" }, { label: "−" },

    { label: "0" }, { label: "00" }, { label: "•" }, { label: "=" }, { label: "M+" },
  ];


  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="w-170 h-180 bg-[#484655] rounded-b-[50px] rounded-t-lg p-5 border-3 border-[#605e6b]">

        {/* Logo */}
        <div className="w-full flex items-center justify-between text-white px-5">
          <h1 className="casio-logo text-3xl">CASIO</h1>
          <div className="w-60 h-20 bg-[#33221c] rounded-lg shadow-inner shadow-[#27262e] " />
          <div className='flex gap-6 justify-around items-center'>
            <p className="casio-logo">M1 100D</p>
            <div className="flex flex-col items-center justify-center">
              <h1 className="casio-logo text-2xl font-bold">10</h1>
              <p className="text-[6px] leading-none">DIGIT DISPLAY</p>
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="w-full border-2 border-[#4c485a]  h-40 bg-[#4f4d5d] shadow-inner shadow-[#3b3a46] rounded-lg rounded-b-[50px] mt-5 flex justify-center items-center py-5 px-18" >
          <div className='bg-[#dbece7] w-full rounded-lg h-full flex items-center justify-end shadow-inner shadow-[#484655] px-2'>
            <h1 className="lcd-font text-[100px]">0</h1>
          </div>
        </div>

        {/* Keys */}
        <div className="relative flex-1 min-h-0 mt-4 px-1 pb-8 m-2">
          <div className="h-full grid grid-cols-6 grid-rows-6 gap-x-3 gap-y-2.5">
            {keys.map((k, i) => (
              <button
                type="button"
                key={i}
                className={[
                  "bg-[#0c1015] flex items-center justify-center cursor-pointer text-white rounded-2xl shadow-sm shadow-[#1c1c1c] p-1",
                  k.red ? "bg-[#71424f]" : "",
                  k.small ? "text-[13px]" : "text-[30px]",
                  k.span ?? "",
                ].join(" ")}
              >
                {k.label}
              </button>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}
