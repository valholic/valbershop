import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import { useState, useEffect } from "react";
import { Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { AddCart, BookNow } from "..";
import axios from "axios";

export default function Card({ name, price, discount, img, id, type }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [index, setIndex] = useState(0);
    const [isClick, setIsClick] = useState(false);
    const [onCart, setOnCart] = useState(false);
    const [finished, setFinished] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    function toSlug(text) {
        return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/api/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            result.data.user.cart.forEach(cart => {
                if(cart.product_id === id) {
                    setOnCart(true);
                }
            });
            setIsLogin(true);
            setFinished(true);
        })
        .catch(() => {
            setIsLogin(false);
            setFinished(true);
        })
    }, [id, token])

    if(finished) {
        return (
            <div className="w-fit h-fit relative snap-center group">
                {isClick && type === 'product' && <AddCart handleOut={() => setIsClick(false)} pId={id} />}
                {isClick && type === 'service' && <BookNow handleOut={() => setIsClick(false)} sId={id} />}
                {discount > 0 &&
                    <div className="absolute w-fit h-fit p-1 lg:p-2 font-Poiret bg-[#d4af37] text-black rotate-30 z-10 -right-3 lg:-right-5 top-0 lg:group-hover:scale-105">
                        <p className="text-sm lg:text-xl text-center">Discount {discount}%</p>
                    </div>
                }
                <div className="relative w-40 lg:w-80 h-80 lg:h-120 transition bg-[#242424] rounded-lg lg:rounded-2xl border border-[#d4af37] flex flex-col text-[#d4af37] lg:shadow-[#d4af37] lg:hover:shadow-lg overflow-hidden lg:group-hover:scale-105">
                    <div className="h-60 lg:h-80 w-full relative overflow-hidden">
                        <img src={img[index]} className="h-full w-full object-contain" />
                        {img.length > 1 &&
                            <div className="absolute w-full h-fit bottom-0 flex flex-row gap-x-2 justify-center items-center">
                                <ChevronLeft className="text-white cursor-pointer h-4 lg:h-6 w-1/5" onClick={() => {
                                            index === 0 ? setIndex(0) : setIndex(index - 1);
                                }} />
                                <div className="w-3/5 flex flex-row gap-x-2 justify-center">
                                    {img.map((img, i) => {
                                        return <Circle key={i} className={`text-white cursor-pointer w-2 lg:w-4 h-2 lg:h-4 ${i === index ? "rounded-full bg-white" : ""}`} onClick={() => {
                                            setIndex(i);
                                        }}/>
                                    })}
                                </div>
                                <ChevronRight className="text-white cursor-pointer h-4 lg:h-6 w-1/5" onClick={() => {
                                    index + 1 === img.length ? setIndex(index) : setIndex(index + 1);
                                }}  />
                            </div>
                        }
                    </div>
                    <p className="text-lg lg:text-3xl font-extrabold font-Poiret p-2">{ name }</p>
                    <div className="flex flex-row gap-x-2 p-2">
                        <p className={`text-sm lg:text-xl font-semibold ${discount > 0 && "line-through"}`}>Rp{ price.toLocaleString('id-ID') }</p>
                        {discount > 0 && <p className="text-sm lg:text-lg font-semibold">Rp{ (price * ((100 - discount)/100)).toLocaleString('id-ID') }</p>}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 p-2">
                        <Button type={'button'} name={'Detail'} handleClick={() => navigate(type === 'product' ? `/product/detail/${id}/${toSlug(name)}` : `/booking/detail/${id}/${toSlug(name)}`)} width={`w-full ${!onCart ? 'lg:w-1/2' : ''}`} />
                        {!onCart && 
                            <Button type={'button'} name={type === 'product' ? 'Add cart' : 'Book now'} width={'w-full lg:w-1/2'} handleClick={isLogin? () => setIsClick(true) : () => navigate('/login')} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
