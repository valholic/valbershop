import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function ChangeTime({ handleOut, goodsData, handleDate, date, handleTime, time }) {
    const [day, setDay] = useState([]);
    
    function getDay() {
        const today = new Date().toLocaleDateString();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const bigTomorrow = new Date(today);
        bigTomorrow.setDate(tomorrow.getDate() + 1);
        setDay([today, tomorrow.toLocaleDateString(), bigTomorrow.toLocaleDateString()]);
    }

    useEffect(() => {
        getDay()
    }, [])

    return (
        <div className="fixed inset-0 bg-black/70 z-30 w-screen h-screen flex flex-col items-center justify-center p-10">
            <div className="w-[80%] md:w-[30%] h-[45%] md:h-[30%] absolute flex flex-col gap-y-4 z-70 bg-[#363636] p-5 rounded-2xl items-center justify-center">
                <X className="w-8 h-8 absolute top-5 right-5 text-white cursor-pointer" onClick={handleOut} />
                <p className="font-semibold text-xl lg:text-2xl text-[#d4af37]">Choose the date</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {day.map((data, i) => {
                        return <p key={i} className={`p-2 w-full border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-[#d4af37] font-semibold text-base lg:text-xl text-white rounded-lg cursor-pointer text-center ${data === date ? "bg-[#d4af37]" : ""}`} onClick={() => handleDate(data)}>{data}</p>
                    })
                    }
                </div>
                <p className="font-semibold text-xl lg:text-2xl text-[#d4af37]">Choose the time</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center">
                    {goodsData.time.map((data, i) => {
                        return <p key={i} className={`p-2 w-full border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-[#d4af37] font-semibold text-base md:text-xl text-white rounded-lg cursor-pointer ${data === time ? "bg-[#d4af37]" : ""}`} onClick={() => handleTime(data)}>{data}</p>
                    })
                    }
                </div>
            </div>
        </div>
    )
}
