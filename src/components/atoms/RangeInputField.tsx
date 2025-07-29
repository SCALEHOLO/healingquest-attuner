'use client';
import React, { useEffect, useRef, useState } from 'react';

const CustomDragSlider: React.FC<{onChange:(value:number)=>void, resetValue:number, category:string}> = ({onChange, resetValue, category}) => {
    const [value, setValue] = useState<number>(1);
    const [barValue, setBarValue] = useState<number>(10);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef<boolean>(false);

    useEffect(() => {
        // Initialize value and barValue based on resetValue prop
        const time = setTimeout(() => {
            //  if(resetValue > 0) {
                setValue(1);
                setBarValue(1 * 10); // Assuming resetValue is in range 0-10
                onChange(1);
            // }
        }, 100);

        return () => clearTimeout(time);
    }, [resetValue]);

  

    const updateValueFromPosition = (clientX: number) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const percent = ((clientX - rect.left) / rect.width) * 10;
        const barPercent = ((clientX - rect.left) / rect.width) * 100;
        setValue(Math.min(10, Math.max(0, percent)));
        setBarValue(Math.min(100, Math.max(0, barPercent)));
        onChange(Math.min(10, Math.max(0, percent)))
    };



    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        updateValueFromPosition(e.clientX);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            updateValueFromPosition(e.clientX);
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="flex flex-col gap-1 w-full  ">
            {/* Value above thumb */}
            <div
                className=" flex justify-between text-right text-2xl font-bold pb-1 "
            >
                <p>{category}</p>
               <p> {value.toFixed(1)}</p>
            </div>
            <div className="relative w-full ">
                {/* Slider track */}
                <div
                    ref={sliderRef}
                    className="w-full h-4 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-300 rounded-full relative cursor-pointer"
                    onMouseDown={handleMouseDown}
                >
                    {/* Thumb */}
                    <div
                        className="absolute top-1/2 w-[30px] h-[30px] bg-white rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-in-out pointer-events-none"
                        style={{
                            left: `${barValue}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomDragSlider;
