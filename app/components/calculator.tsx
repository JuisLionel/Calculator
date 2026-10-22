"use client"

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react"

export type CalculatorKey = {
    label: string;
    group?: boolean;
    span?: string;
    red?: boolean;
    small?: boolean;
    top?: boolean;
    align?: boolean;
};


export default function Calculator({ keys }: { keys: CalculatorKey[] }) {
    const [displayValue, setDisplayValue] = useState<string>("0");
    const [isOn, setIsOn] = useState<boolean>(false);
    const [dispPressed, setDispPressed] = useState<boolean>(false);


    const handleKeyPress = (key: CalculatorKey) => {
        if (key.label === "AC") {
            setDispPressed(false);
            setIsOn(true);
            setDisplayValue("0");
            return;
        }

        if (key.label === "DISP") {
            setDispPressed(true);
            return;
        }

        if (dispPressed && key.label === "CORRECT" && isOn) {
            setDispPressed(false);
            setIsOn(false);
            setDisplayValue("");
            return;
        }

        if (!["CORRECT"].includes(key.label) && dispPressed && isOn) {
            setDispPressed(false);
        }

        if (!["AC", "DISP", "CORRECT", "=",
            "TAX+", "TAX−", "AUTO REVIEW",
            "CORRECT", "GO TO", "MU", "MRC",
            "M−", "M+", "C", "►"].includes(key.label) && isOn) {

            if (key.label === "√") {
                setDisplayValue((current) => {
                    if (current === "Error") return "√";
                    return current === "0" ? "√" : `√${current}`;

                });
                return;
            }

            const input = key.label === "•" ? "." : key.label;
            setDisplayValue((prev) => {
                if (prev === "√" && input === ".") {
                    return "√0.";
                }
                if (prev === "√") {
                    return `√${input}`;
                }
                if (prev === "0" && input === ".") {
                    return "0.";
                }
                if (prev === "0" && input !== ".") {
                    return input.replace(/^0+/, "") || "0";
                }
                return prev + input;
            });

            return;
        }

        if (key.label === "C" && isOn) {
            setDisplayValue(displayValue.slice(0, -1) || "0");
            return;
        }

        if (key.label === "=") {
            return;
        }
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-155 h-165 bg-[#484655] rounded-b-[50px] rounded-t-lg p-5 border-3 border-[#605e6b]">

                {/* Logo */}
                <div className="w-full flex items-center justify-between text-white px-5">
                    <h1 className="casio-logo text-3xl">CASIO</h1>
                    <div className="w-60 h-20 bg-[#33221c] rounded-lg shadow-inner shadow-[#27262e] " />
                    <div className='flex gap-6 justify-around items-center'>
                        <p className="casio-logo">MJ 100D</p>
                        <div className="flex flex-col items-center justify-center text-[#7d80df] font-bold">
                            <h1 className="casio-logo text-2xl font-bold">10</h1>
                            <p className="text-[10px] leading-none -mt-1">DIGIT</p>
                            <p className="text-[10px] leading-none">DISPLAY</p>
                        </div>
                    </div>
                </div>

                {/* Display */}
                <div className="w-full border-2 border-[#4c485a]  h-40 bg-[#4f4d5d] shadow-inner shadow-[#3b3a46] rounded-lg rounded-b-[50px] mt-5 flex justify-center items-center py-5 px-18" >
                    <div className='relative bg-[#dbece7] w-full rounded-lg h-full flex items-center justify-end overflow-hidden shadow-inner shadow-[#484655] px-2'>
                        {isOn && (
                            <h1 className="lcd-font shrink-0 whitespace-nowrap text-[100px]">
                                {displayValue}
                            </h1>
                        )}
                    </div>
                </div>

                {/* Keys */}
                <div className="relative flex-1 min-h-0 mt-7 px-1 pb-8">

                    <div className="h-full grid grid-cols-6 grid-rows-[61px_40px_repeat(4,1fr)] gap-x-3 gap-y-2.5">
                        {keys.map((k, i) =>
                            k.group ? (
                                <div
                                    key={i}
                                    className={[
                                        "h-16.25 self-start grid grid-rows-[14px_40px] gap-y-0.5 rounded-lg bg-[#8d8974] border border-[#7c7865] px-1 pt-1 pb-0.75",
                                        k.span ?? "",
                                    ].join(" ")}
                                >
                                    <p className="text-[14px] font-bold leading-none text-[#3a3846] text-center tracking-tight">
                                        150 STEPS CHECK
                                    </p>
                                    <div className="grid h-10 grid-cols-2 gap-x-1.5">
                                        <button
                                            type="button"
                                            aria-label="Round up"
                                            className="h-10 flex-1 flex items-center justify-center rounded-md bg-[#0c1015] border border-[#05070a] shadow-[0_2px_0_#1c1c1c] cursor-pointer active:translate-y-0.5 active:shadow-none hover:brightness-125"
                                        >
                                            <IoIosArrowUp className="h-5 w-5 shrink-0 text-white" />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Round down"
                                            className="h-10 flex-1 flex items-center justify-center rounded-md bg-[#0c1015] border border-[#05070a] shadow-[0_2px_0_#1c1c1c] cursor-pointer active:translate-y-0.5 active:shadow-none hover:brightness-125"
                                        >
                                            <IoIosArrowDown className="h-5 w-5 shrink-0 text-white" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    key={i}
                                    onClick={() => handleKeyPress(k)}
                                    className={[
                                        "bg-[#0c1015] flex items-center justify-center cursor-pointer rounded-md shadow-sm shadow-[#1c1c1c] p-1 active:translate-y-0.5 active:shadow-none hover:brightness-125",
                                        k.red ? "bg-[#71424f]" : "",
                                        k.small ? "text-[15px]" : "text-[20px]",
                                        k.span ?? "",
                                        k.top ? "h-10" : "",
                                        k.align ? "self-start mt-5.25" : "",
                                        k.label === "DISP" ? "text-[12px] bg-white border border-black text-black" : "text-white",
                                        k.label === "AUTO REVIEW" ? "leading-none" : "",
                                    ].join(" ")}
                                >
                                    {k.label}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}