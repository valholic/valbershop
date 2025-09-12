import { useRef, useState, useEffect } from "react";
import { HomeImage } from "../../assets";
import { Button } from "../../components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const scrollRef = useRef(null);
    const navigate = useNavigate();
    const [gallery, setGallery] = useState([]);
    const [testimonies, setTestimonies] = useState([]);
    
    function scrollGallery(direction) {
        const gallery = scrollRef.current;
        const scrollAmount = 300;

        if(direction === "left") {
            gallery.scrollBy({left: -scrollAmount, behavior: "smooth"});
        } else if(direction === "right") {
            gallery.scrollBy({left: scrollAmount, behavior: "smooth"});
        }
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/gallery/get`)
        .then(result => {
            setGallery(result.data.gallery);
        });

        axios.get(`https://valbershop-api.vercel.app/v1/testimony/get`)
        .then(result => {
            setTestimonies(result.data.testimonies);
        });
    }, [])

    return (
        <div className="bg-[#0c0c0c]/80 bg-blend-overlay flex-grow font-Poiret bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${HomeImage})`}}>
            <section className="p-5 ">
                <p className="text-2xl md:text-4xl lg:text-6xl font-bold text-[#d4af37] text-center my-5">Elevate Your Style with Valbershop</p>
                <p className="text-sm md:text-base lg:text-2xl text-white text-center w-3/4 md:w-1/2 2xl:w-1/3 m-auto my-5">Find the best haircuts, professional grooming services, and a classy experience only at Valbershop.</p>
                <div className="flex gap-x-5 justify-center items-center w-full md:w-2/3 lg:w-1/2 2xl:w-1/3 m-auto my-5">
                    <Button name={'Book now!'} type={'button'} />
                    <Button name={'See our services!'} type={'button'} />
                </div>
            </section>
            <section className="p-10  flex-row">
                <p className="text-4xl lg:text-6xl font-bold text-[#d4af37] my-10 text-center">About us</p>
                <p className="text-xl text-white text-center lg:px-50 2xlpx-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, unde at. Non repellat consectetur ratione temporibus fuga vero nulla corrupti quos, natus quisquam pariatur illum fugiat tempora cum ad fugit. Labore debitis aliquid perferendis alias sunt et reiciendis! Illum nihil voluptatibus rerum numquam expedita architecto eius voluptas modi? Eius, quae!</p>
            </section>
            <section className="p-10 ">
                <h3 className="text-4xl lg:text-6xl text-center font-bold text-[#d4af37] my-10">Service</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
                    <div>
                        <h4 className="text-2xl font-semibold mb-2 text-center">✂️ Potong Rambut Premium</h4>
                        <p className="text-xl text-center">Gaya sesuai tren dan bentuk wajahmu.</p>
                    </div>
                    <div>
                        <h4 className="text-2xl font-semibold mb-2 text-center">🧖‍♂️ Facial & Grooming</h4>
                        <p className="text-xl text-center">Perawatan wajah menyegarkan & menenangkan.</p>
                    </div>
                    <div>
                        <h4 className="text-2xl font-semibold mb-2 text-center">💈 Shaving Tradisional</h4>
                        <p className="text-xl text-center">Rasakan teknik shaving klasik ala barber sejati.</p>
                    </div>
                    <div>
                        <h4 className="text-2xl font-semibold mb-2 text-center">🧴 Produk Perawatan</h4>
                        <p className="text-xl text-center">Pilih dari produk-produk terbaik kami.</p>
                    </div>
                </div>
            </section>
            {gallery.length !== 0 &&
                <section className="py-20 ">
                    <h3 className="text-4xl lg:text-6xl font-bold text-[#d4af37] text-center my-10">Galeri</h3>
                    <div ref={scrollRef} className="flex gap-10 overflow-x-scroll scroll-smooth whitespace-nowrap snap-x snap-mandatory p-5 scrollbar-hidden">
                        {
                            gallery.map((photo, i) => {
                                if(i < 6) {
                                    return <img src={`https://valbershop-api.vercel.app/${photo.photo}`} key={photo._id} className="rounded-lg object-cover shrink-0 w-120 h-90 snap-center" onClick={() => navigate('/gallery')}/>
                                } else {
                                    return
                                }
                            })
                        }
                    </div>
                    <div className="flex gap-10 justify-center items-center">
                        <ChevronLeft className="text-white w-10 h-10 cursor-pointer" onClick={() => scrollGallery("left")} />
                        <ChevronRight className="text-white w-10 h-10 cursor-pointer" onClick={() => scrollGallery("right")} />
                    </div>
                </section>
            }
            {testimonies.length !== 0 &&
                <section className="py-20 ">
                    <h3 className="text-4xl lg:text-6xl font-bold text-[#d4af37] text-center my-10 snap-x snap-center">Our testimony</h3>
                    <div className="w-full lg:w-3/4 flex flex-wrap justify-center p-5 m-auto gap-20">
                        {testimonies.map((test, i) => {
                            if(i < 3) {
                                return  <div className="w-full md:w-1/3 lg:w-1/4 text-center md:text-left flex flex-col font-bold" key={test._id}>
                                            <p className="text-white text-2xl">"{test.text}"</p>
                                            <p className="text-[#d4af37] text-xl">~ {test.source}</p>
                                        </div>
                            } else {
                                return
                            }
                            })
                        }
                    </div>
                </section>
            }
            <section className=" text-white text-center py-16">
                <div className="w-1/2 m-auto">
                    <h3 className="text-4xl lg:text-6xl font-bold my-10 text-[#d4af37]">Ready to Look Handsome?</h3>
                    <Button name={'Book now!'} type={'button'} />
                </div>
            </section>
        </div> 
    )
}
