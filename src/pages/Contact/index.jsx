import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { ContactImage } from "../../assets";
import { MapPin, Smartphone } from "lucide-react";

export default function Contact() {
    return (
        <div className="flex-grow font-Poiret p-5 md:p-10 flex flex-col gap-y-10 bg-cover bg-center bg-blend-overlay bg-black/70" style={{backgroundImage: `url(${ContactImage})`}}>
            <p className="text-[#d4af37] text-5xl lg:text-6xl 2xl:text-8xl w-full font-bold">Meet us at</p>
            <div className="flex flex-col lg:flex-row w-full gap-y-5 lg:gap-x-5">
                <div className="flex flex-col border border-[#d4af37] rounded-2xl w-full lg:w-1/2 p-10 gap-y-5">
                    <div className="flex flex-row gap-x-4 items-center">
                        <p className="text-3xl md:text-4xl 2xl:text-6xl font-bold text-[#d4af37]">Our address</p>
                        <MapPin className="text-[#d4af37] w-7.5 md:w-9 2xl:w-15 h-7.5 md:h-9 2xl:h-15" />
                    </div>
                    <p className="text-xl lg:text-3xl font-semibold text-white text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel minima iste sit nam rem? Ut.</p>
                </div>
                <div className="flex flex-col border border-[#d4af37] rounded-2xl w-full lg:w-1/2 p-10 gap-y-5">
                    <div className="flex flex-row gap-x-4 items-center">
                        <p className="text-3xl md:text-4xl 2xl:text-6xl font-bold text-[#d4af37]">Our social media</p>
                        <Smartphone className="text-[#d4af37] w-7.5 md:w-9 2xl:w-15 h-7.5 md:h-9 2xl:h-15" />
                    </div>
                    <div className="flex flex-row gap-x-3 w-full cursor-pointer">
                        <FaFacebookSquare className="text-blue-500 text-3xl" />
                        <p className="text-lg lg:text-2xl font-semibold text-white text-justify">@valber_shop</p>
                    </div>
                    <div className="flex flex-row gap-x-3 w-full cursor-pointer">
                        <FaInstagram className="text-pink-400 text-3xl" />
                        <p className="text-lg lg:text-2xl font-semibold text-white text-justify">@valber_shop</p>
                    </div>
                    <div className="flex flex-row gap-x-3 w-full cursor-pointer">
                        <FaWhatsapp className="text-green-500 text-3xl" />
                        <p className="text-lg lg:text-2xl font-semibold text-white text-justify">081234567890</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
