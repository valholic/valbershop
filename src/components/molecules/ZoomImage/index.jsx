import { ChevronRight, Circle, ChevronLeft, X } from "lucide-react";

export default function ZoomImage({ handleClick, index, handleIndex, images }) {
    return (
        <div className="fixed inset-0 bg-black/70 z-30 w-screen h-screen flex flex-col items-center justify-center">
            <X className="text-white transform absolute top-5 right-3 md:right-10 w-10 h-10 cursor-pointer" onClick={handleClick} />
            <div className="w-full h-7/8 flex flex-nowrap items-center justify-evenly">
                <ChevronLeft className="text-white cursor-pointer w-20 h-20" onClick={() => {
                        index === 0 ? handleIndex(0) : handleIndex(index - 1);
                }} />
                <img src={images[index]} className="object-contain w-4/5 h-4/5" />
                <ChevronRight className="text-white cursor-pointer w-20 h-20" onClick={() => {
                    index + 1 === images.length ? handleIndex(index) : handleIndex(index + 1);
                }}  />
            </div>
            <div className="w-full h-1/8 flex gap-x-2 justify-center">    
                {images.map((img, i) => {
                    return <Circle key={i} className={`text-[#d4af37] cursor-pointer ${i === index ? "rounded-full bg-[#d4af37]" : ""}`} onClick={() => {
                            handleIndex(i);
                        }}/>
                    })
                }
            </div>
        </div>
    )
}
