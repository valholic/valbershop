import axios from "axios";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Card } from "../../components";
import { BookingImage } from "../../assets";

export default function Booking() {
    const scrollRef = useRef(null);
    const [servicesData, setServicesData] = useState([]);
    const [isDown, setIsDown] = useState(false);
    
    function handleScroll(direction) {
        const goods = scrollRef.current;
        const scrollAmount = 300;
    
        if(direction === "left") {
            goods.scrollBy({left: -scrollAmount, behavior: "smooth"});
        } else if(direction === "right") {
            goods.scrollBy({left: scrollAmount, behavior: "smooth"});
        }
    }
    
    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/shop/get`)
        .then(async result => {
            const service = await result.data.shopData.filter(goods => {
                return goods.type.toLowerCase() === "service"
            });
    
            setServicesData(service);
        });
    }, []);

    return (
        <div className="flex-grow py-10 lg:py-15 px-5 lg:px-25 bg-cover bg-center bg-blend-overlay bg-black/70" style={{backgroundImage: `url(${BookingImage})`}} >        
            <div className="flex items-center lg:px-5">
                <p className="w-full text-3xl lg:text-6xl font-Poiret text-[#d4af37] font-bold">Book our services</p>
                <ChevronDown className={`text-[#d4af37] w-10 lg:w-15 h-10 lg:h-15 cursor-pointer transition ${isDown && "rotate-180"}`} onClick={() => setIsDown(isDown ? false : true)} />
                <ChevronLeft className="text-[#d4af37] w-10 lg:w-15 h-10 lg:h-15 cursor-pointer" onClick={() => handleScroll("left")} />
                <ChevronRight className="text-[#d4af37] w-10 lg:w-15 h-10 lg:h-15 cursor-pointer" onClick={() => handleScroll("right")} />
            </div>
            <div ref={scrollRef} className={`flex w-full h-fit ${isDown ? "flex-wrap gap-5 justify-evenly" : "gap-10 overflow-x-scroll scroll-smooth whitespace-nowrap snap-x snap-mandatory scrollbar-hidden"} py-10 lg:px-5 `}>
                {servicesData.map(service => {
                    return <Card name={service.name} price={service.price} discount={service.discount} img={service.image} id={service._id} type={service.type} key={service._id} />
                })
                }
            </div>
        </div>
    )
}
