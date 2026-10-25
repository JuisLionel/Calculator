"use client"

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react"

const TAX_RATE = 10;

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

const markUp = (cost: number, marginPercent: number): number | "Error" => {
    if (marginPercent >= 100) return "Error";
    return round2(cost / (1 - marginPercent / 100));
};

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

export type CalculatorKey = {
    label: string;
    group?: boolean;
    span?: string;
    red?: boolean;
    small?: boolean;
    top?: boolean;
    align?: boolean;
};

export default function MJ100D() {
    const [displayValue, setDisplayValue] = useState<string>("0");
    const [isOn, setIsOn] = useState<boolean>(false);

    const [dispPressed, setDispPressed] = useState<boolean>(false);
    const [TAXPressedP, setTAXPressedP] = useState<boolean>(false);
    const [TAXPressedM, setTAXPressedM] = useState<boolean>(false);
    const [MUPressed, setMUPressed] = useState<boolean>(false);

    const [decimalSeparator, setDecimalSeparator] = useState<"." | ",">(".");

    const applyTax = (value: number) => {
        if (TAXPressedP) return round2((value * (100 + TAX_RATE)) / 100);
        if (TAXPressedM) return round2((value * 100) / (100 + TAX_RATE));
        return value;
    };


    const handleCalculate = (expression: string): number | "Error" => {
        const tokens: Array<number | string> = [];
        let position = 0;

        while (position < expression.length) {
            const character = expression[position];

            if (/\s/.test(character)) {
                position += 1;
                continue;
            }

            if (/[0-9.,]/.test(character)) {
                const numberMatch = /^(?:\d+(?:[.,]\d*)?|[.,]\d+)/.exec(expression.slice(position));
                if (!numberMatch) return "Error";
                tokens.push(Number(numberMatch[0].replace(",", ".")));
                position += numberMatch[0].length;
                continue;
            }

            const operator = {
                "−": "-",
                "×": "*",
                "÷": "/",
            }[character] ?? character;

            if (!["+", "-", "*", "/", "√", "%"].includes(operator)) return "Error";
            tokens.push(operator);
            position += 1;
        }

        let tokenPosition = 0;

        const parseUnary = (): number | null => {
            const token = tokens[tokenPosition];

            let value: number | null;

            if (token === "+" || token === "-") {
                tokenPosition += 1;
                value = parseUnary();
                if (value === null) return null;
                value = token === "-" ? -value : value;
            } else if (token === "√") {
                tokenPosition += 1;
                value = parseUnary();
                if (value === null || value < 0) return null;
                value = Math.sqrt(value);
            } else if (typeof token === "number") {
                tokenPosition += 1;
                value = token;
            } else {
                return null;
            }

            while (tokens[tokenPosition] === "%") {
                tokenPosition += 1;
                value /= 100;
            }

            return value;
        };

        const parseTerm = (): number | null => {
            let value = parseUnary();
            if (value === null) return null;

            while (tokens[tokenPosition] === "*" || tokens[tokenPosition] === "/") {
                const operator = tokens[tokenPosition];
                tokenPosition += 1;
                const nextValue = parseUnary();
                if (nextValue === null) return null;
                value = operator === "*" ? value * nextValue : value / nextValue;
            }

            return value;
        };

        let result = parseTerm();
        if (result === null) return "Error";

        while (tokens[tokenPosition] === "+" || tokens[tokenPosition] === "-") {
            const operator = tokens[tokenPosition];
            tokenPosition += 1;
            const nextValue = parseTerm();
            if (nextValue === null) return "Error";
            result = operator === "+" ? result + nextValue : result - nextValue;
        }

        if (tokenPosition !== tokens.length || !Number.isFinite(result)) return "Error";
        return result;
    };

    const handleKeyPress = (key: CalculatorKey) => {
        if (key.label === "AC") {
            setDispPressed(false);
            setIsOn(true);
            setDisplayValue("0");
            setDecimalSeparator(".");
            setTAXPressedM(false)
            setTAXPressedP(false)
            setMUPressed(false);
            return;
        }

        if (key.label === "DISP") {
            setDispPressed(true);
            const nextSeparator = decimalSeparator === "." ? "," : ".";
            setDecimalSeparator(nextSeparator);
            setDisplayValue((current) => current.replace(/[.,]/g, nextSeparator));
            return;
        }

        if (key.label === "TAX+" && isOn) {
            const shouldEnable = !TAXPressedP;
            setTAXPressedP(shouldEnable);
            if (shouldEnable) setTAXPressedM(false);
            return;
        }

        if (key.label === "TAX−" && isOn) {
            const shouldEnable = !TAXPressedM;
            setTAXPressedM(shouldEnable);
            if (shouldEnable) setTAXPressedP(false);
            return;
        }

        if (key.label === "arrow" && isOn) {
            setDisplayValue((current) => {
                if (current === "Error") return "0";
                return current.slice(0, -1) || "0";
            });
        }

        if (dispPressed && key.label === "CORRECT" && isOn) {
            setDispPressed(false);
            setIsOn(false);
            setDisplayValue("");
            return;
        }

        if (key.label === "+/−" && isOn) {
            setDisplayValue((current) => {
                if (current === "Error") return "0";
                const currentNumber = /-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.exec(current);

                if (!currentNumber) {
                    return /[+−×÷]$/.test(current) ? `${current}-` : `-${current}`;
                }

                const numberStart = currentNumber.index;
                const number = currentNumber[0];
                const toggledNumber = number.startsWith("-") ? number.slice(1) : `-${number}`;
                return `${current.slice(0, numberStart)}${toggledNumber}`;
            });
            return;
        }

        if (key.label === "%" && isOn) {
            setDisplayValue((current) => {
                const currentNumber = /-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.exec(current);
                if (!currentNumber || current.endsWith("%")) return current;
                return `${current}%`;
            });
            return;
        }

        if (key.label === "MU" && isOn) {
            // MU only arms mark-up mode (like TAX+); the answer appears when "=" is pressed
            setMUPressed((pressed) => !pressed);
            return;
        }

        if (!["AC", "DISP", "CORRECT", "=", "MU",
            "AUTO REVIEW", "CORRECT", "GO TO", "TAX+",
            "TAX−", "MRC", "M−", "M+", "C", "►", "+/−", "%"].includes(key.label) && isOn) {

            if (key.label === "√") {
                setDisplayValue((current) => {
                    if (current === "Error") return "√";
                    return current === "0" ? "√" : `√${current}`;

                });
                return;
            }

            const input = key.label === "•" ? decimalSeparator : key.label;
            setDisplayValue((prev) => {
                // after an Error, start fresh instead of appending to the word "Error"
                if (prev === "Error") {
                    if (/[0-9]/.test(input)) return input;
                    return input === decimalSeparator ? `0${decimalSeparator}` : "0";
                }
                if (prev === "√" && input === decimalSeparator) {
                    return `√0${decimalSeparator}`;
                }
                if (prev === "√") {
                    return `√${input}`;
                }
                if (prev === "0" && input === decimalSeparator) {
                    return `0${decimalSeparator}`;
                }
                if (prev === "0" && input !== decimalSeparator) {
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

        if (key.label === "=" && MUPressed) {
            const number = "(\\d+(?:[.,]\\d*)?|[.,]\\d+)";
            const match = new RegExp(`^${number}×${number}$`).exec(displayValue);
            setMUPressed(false);

            if (!match) {
                setDisplayValue("Error");
                return;
            }

            const cost = Number(match[1].replace(",", "."));
            const margin = Number(match[2].replace(",", "."));
            const result = markUp(cost, margin);

            setDisplayValue(
                result === "Error"
                    ? "Error"
                    : result.toString().replace(".", decimalSeparator),
            );
            return;
        }

        if (key.label === "=") {
            const calculatedValue = handleCalculate(displayValue);
            const result = calculatedValue === "Error"
                ? calculatedValue
                : applyTax(calculatedValue);
            const displayedResult = result !== "Error" && displayValue.includes("√")
                ? Number(result.toPrecision(5))
                : result;
            setDisplayValue(
                displayedResult === "Error"
                    ? "Error"
                    : displayedResult.toString().replace(".", decimalSeparator),
            );
            setTAXPressedP(false);
            setTAXPressedM(false);
            return;
        }
    };

    return (
        <div className="flex w-full max-w-155 flex-col items-center gap-3">
            <div className="flex h-[min(640px,calc(100dvh-1rem))] min-h-125 w-full max-w-155 flex-col rounded-t-lg rounded-b-[50px] border-3 border-[#605e6b] bg-[#484655] p-3 sm:p-5">

                {/* Logo */}
                <div className="flex w-full shrink-0 items-center justify-between gap-2 px-1 text-white sm:px-5">
                    <h1 className="casio-logo text-2xl sm:text-3xl">CASIO</h1>
                    <div className="mx-1 h-12 min-w-2 flex-1 rounded-lg bg-[#33221c] shadow-inner shadow-[#27262e] sm:mx-3 sm:h-20" />
                    <div className="flex items-center justify-around gap-2 sm:gap-6">
                        <p className="text-xs sm:text-[15px]">MJ 100D</p>
                        <div className="flex flex-col items-center justify-center text-[#7d80df] font-bold">
                            <h1 className="casio-logo text-xl font-bold sm:text-2xl">10</h1>
                            <p className="text-[10px] leading-none -mt-1">DIGIT</p>
                        </div>
                    </div>
                </div>

                {/* Display */}
                <div className="mt-4 flex h-32 w-full shrink-0 items-center justify-center rounded-lg rounded-b-[50px] border-2 border-[#4c485a] bg-[#4f4d5d] px-3 py-4 shadow-inner shadow-[#3b3a46] sm:mt-5 sm:h-40 sm:px-8 sm:py-5">
                    <div className="relative flex h-full w-full items-center justify-end overflow-hidden rounded-lg bg-[#dbece7] px-2 shadow-inner shadow-[#484655] @container">
                        {isOn && (
                            <>
                                <div className="absolute p-1 top-0 left-1 opacity-50 text-[8px] flex gap-1" >
                                    {TAXPressedP && (<p className="bg-black txt h-4 font-bold text-white flex justify-center items-center p-1">TAX+</p>)}
                                    {TAXPressedM && (<p className="bg-black txt h-4 font-bold text-white flex justify-center items-center p-1">TAX−</p>)}
                                    {MUPressed && (<p className="bg-black txt h-4 font-bold text-white flex justify-center items-center p-1">MU</p>)}
                                    {decimalSeparator === "," && (<p className="bg-black txt h-4 font-bold text-white flex justify-center items-center p-1">DISP</p>)}
                                </div>

                                <h1 className="lcd-font shrink-0 whitespace-nowrap text-[clamp(2rem,14cqi,6.25rem)]">
                                    {displayValue}
                                </h1>
                            </>
                        )}
                    </div>
                </div>

                {/* Keys */}
                <div className="relative mt-4 min-h-0 flex-1 px-1 pb-5 sm:mt-5 sm:pb-8">

                    <div className="grid h-full grid-cols-6 grid-rows-[61px_40px_repeat(4,minmax(0,1fr))] gap-x-1.5 gap-y-2 sm:gap-x-3 sm:gap-y-2.5">
                        {keys.map((k, i) =>
                            k.group ? (
                                <div
                                    key={i}
                                    className={[
                                        "h-16.25 self-start grid grid-rows-[14px_40px] gap-y-0.5 rounded-lg bg-[#8d8974] border border-[#7c7865] px-1 pt-1 pb-0.75",
                                        k.span ?? "",
                                    ].join(" ")}
                                >
                                    <p className="text-center text-[clamp(8px,2.3vw,14px)] font-bold leading-none tracking-tight text-[#3a3846]">
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
                                        k.label === "CORRECT"
                                            ? "min-w-0 whitespace-nowrap text-[clamp(8px,2.8vw,15px)]"
                                            : k.small
                                                ? "text-[15px]"
                                                : "text-[clamp(12px,3.2vw,20px)]",
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