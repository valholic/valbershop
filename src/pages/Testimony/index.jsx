import axios from "axios";
import { useEffect, useState } from "react";
import { TestimonyImage } from "../../assets";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimony() {
    const [testimoniesData, setTestimoniesData] = useState([]);
    const [selected, setSelected] = useState([0, 1, 2]);

    function OnChevron(direction) {
        if(direction === 'left') {
            setSelected(selected.map(index => {
                if(index > 0) {
                    return index - 1;
                } else {
                    return testimoniesData.length - 1;
                } 
            }));
        } else if(direction === "right") {
            setSelected(selected.map(index => {
                if(index + 1 === testimoniesData.length) {
                    return 0;
                } else {
                    return index + 1;
                }
            }));
        }
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/testimony/get`)
        .then(async result => {
            const data = await result.data.testimonies;
            setTestimoniesData(data);
        })

        const handleKey = (e) => {
            if(e.key === "ArrowRight") {
                setSelected(selected.map(index => {
                    if(index > 0) {
                        return index - 1;
                    } else {
                        return testimoniesData.length - 1;
                    } 
                }));
            } else if(e.key === "ArrowLeft") {
                setSelected(selected.map(index => {
                    if(index + 1 === testimoniesData.length) {
                        return 0;
                    } else {
                        return index + 1;
                    }
                }));
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, [selected, testimoniesData])

    return (
        <div className="flex-grow flex flex-col font-bold font-Poiret bg-black/80 bg-blend-overlay bg-cover bg-center items-center py-5 lg:py-10 gap-y-30" style={{backgroundImage: `url(${TestimonyImage})`}}>
            <p className="text-6xl text-[#d4af37] text-center">Our Testimony</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative p-5 lg:p-10" > 
                <ChevronLeft className="text-white cursor-pointer h-full w-5 md:w-10 lg:w-15 absolute inset-y-0 left-2 md:left-5" onClick={() => OnChevron('left')} />
                {testimoniesData.length !== 0 && 
                <>
                    <div className="hidden lg:flex flex-col w-full h-full items-center justify-center gap-y-4">
                        <p className="text-white text-2xl text-center w-4/5">"{testimoniesData[selected[0]].text}"</p>
                        <p className="text-[#d4af37] text-xl text-center font-semibold">~ {testimoniesData[selected[0]].source}</p>
                    </div>
                    <div className="flex flex-col w-full h-full items-center justify-center gap-y-4">
                        <p className="text-white text-3xl md:text-5xl text-center w-4/5 lg:w-full">"{testimoniesData[selected[1]].text}"</p>
                        <p className="text-[#d4af37] text-xl md:text-3xl text-center font-semibold">~ {testimoniesData[selected[1]].source}</p>
                    </div>
                    <div className="hidden lg:flex flex-col w-full h-full items-center justify-center gap-y-4">
                        <p className="text-white text-2xl text-center w-4/5">"{testimoniesData[selected[2]].text}"</p>
                        <p className="text-[#d4af37] text-xl text-center font-semibold">~ {testimoniesData[selected[2]].source}</p>
                    </div>
                </>
                }
                <ChevronRight className="text-white cursor-pointer h-full w-5 md:w-10 lg:w-15 absolute inset-y-0 right-2 md:right-5" onClick={() => OnChevron('right')} />
            </div>
        </div>
    )
}
