import React from "react";

type SliderInputProps = {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    label?: string;
    disabled?: boolean;
};

function getSliderColor(value: number, min: number, max: number): string {
    // Interpolate color: 1=red, 5=green, 10=gold
    // We'll use HSL: red (0deg), green (120deg), gold (50deg)
    // For 1-5: red to green, 5-10: green to gold
    if (value <= 5) {
        // Red (0deg) to Green (120deg)
        const hue = 0 + ((value - min) / (5 - min)) * 120;
        return `hsl(${hue}, 80%, 50%)`;
    } else {
        // Green (120deg) to Gold (50deg)
        const hue = 120 - ((value - 5) / (max - 5)) * 70;
        return `hsl(${hue}, 80%, 50%)`;
    }
}

export const SliderInput: React.FC<SliderInputProps> = ({
    value,
    onChange,
    min = 1,
    max = 10,
    label,
    disabled = false,
}) => {
    const color = getSliderColor(value, min, max);

    return (
        <div className="flex flex-col items-center w-full py-2">
            {label && <label className="mb-2 font-medium">{label}</label>}
            <div className="relative w-full flex items-center">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    disabled={disabled}
                    onChange={e => onChange(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-red-500 via-green-500 to-yellow-400 focus:outline-none"
                    style={{
                        accentColor: color,
                        // fallback for browsers that don't support accentColor
                        background: `linear-gradient(90deg, red 0%, green 50%, gold 100%)`,
                    }}
                />
                {/* Value label */}
                <div
                    className="absolute"
                    style={{
                        left: `calc(${((value - min) / (max - min)) * 100}% - 20px)`,
                        top: "-32px",
                        transition: "left 0.2s",
                    }}
                >
                    <span
                        className="px-2 py-1 rounded shadow text-white font-bold text-sm"
                        style={{
                            background: color,
                            border: `2px solid ${color}`,
                            minWidth: "32px",
                            display: "inline-block",
                            textAlign: "center",
                        }}
                    >
                        {value}
                    </span>
                </div>
            </div>
            <div className="flex justify-between w-full text-xs mt-1 px-1">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

export default SliderInput;
