import { X } from "lucide-react";

export default function WarnAlert({ title, text, handleOut }) {
    return (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center">
            <div className="w-[80%] md:w-[30%] h-[45%] md:h-[30%] absolute flex flex-col gap-y-10 z-70 bg-[#0c0c0c] p-5 rounded-2xl items-center justify-center">
                <X className="w-8 h-8 absolute top-5 right-5 text-white cursor-pointer" onClick={handleOut} />
                <p className="text-4xl text-center w-full font-bold text-[#d4af37]">{ title }</p>
                <p className="text-2xl text-center w-full font-semibold text-white">{ text }</p>
            </div>
        </div>
    )
}
