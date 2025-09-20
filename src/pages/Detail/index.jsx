import axios from "axios";
import { ChevronRight, Circle, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { TbChevronCompactDown, TbMinus, TbPlus, TbStar, TbStarFilled, TbStarHalfFilled } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { Button, InputTPENT, ZoomImage } from "../../components";

export default function Detail() {
    const params = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [goodsData, setGoodsData] = useState({});
    const [index, setIndex] = useState(0);
    const [review, setReview] = useState([]);
    const [rating, setRating] = useState(0);
    const [amount, setAmount] = useState(0);
    const [day, setDay] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [gId, setGId] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const [isUp, setIsUp] = useState(false);
    const [onCart, setOnCart] = useState(false);
    const [finished, setFinished] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const star = [1, 2, 3, 4, 5];

    function OnSubmit(e) {
        e.preventDefault();
        
        const data = new FormData();
        data.append("product_name", goodsData.name);
        data.append("product_id", goodsData._id);
        data.append("amount", amount);
        data.append("product_type", goodsData.type);
        if(goodsData.type.toLowerCase() === "service") {
            data.append('date', date);
            data.append('hour', time);
        }
        data.append("price", goodsData.price);
        data.append("cart_image", goodsData.image[0]);

        axios.patch(`https://valbershop-api.vercel.app/v1/api/cart`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => {
            navigate('/profile/cart');
        })
    }

    function getDay() {
        const today = new Date().toLocaleDateString();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const bigTomorrow = new Date(today);
        bigTomorrow.setDate(tomorrow.getDate() + 1);
        setDay([today, tomorrow.toLocaleDateString(), bigTomorrow.toLocaleDateString()]);
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/api/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            result.data.user.cart.forEach(cart => {
                if(cart.product_id === gId) {
                    setOnCart(true);
                }
            });
            setIsLogin(true);
            setFinished(true);
        })
        .catch(() => {
            setIsLogin(false);
            setFinished(true);
        });
    }, [gId, token])

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/shop/get/${params.id}`)
        .then(result => {
            const ratingData = result.data.goodsData.review.map(rev => rev.star);
            setGoodsData(result.data.goodsData);
            setRating(ratingData.reduce((prev, curr) => {
                return prev + curr;
            }, 0)/ratingData.length);
            setReview(result.data.goodsData.review.map(rev => rev));
            setGId(result.data.goodsData._id);
        });

        getDay();

        const handleKey = (e) => {
            if(e.key === "ArrowRight") {
                index + 1 === goodsData.image.length ? setIndex(index) : setIndex(index + 1);
            } else if(e.key === "ArrowLeft") {
                index === 0 ? setIndex(0) : setIndex(index - 1);
            } else if(!isNaN(e.key)) {
                const numberKey = parseInt(e.key);

                if(numberKey >= 1 && numberKey <= goodsData.image.length) {
                    setIndex(numberKey - 1);
                }
            } else if(e.key === "Escape") {
                setIsPreview(false);
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, [params, goodsData, index, token])

    if(finished) {
        return (
            <div className="flex-grow flex flex-col lg:flex-row">
                {isPreview && 
                    <ZoomImage handleClick={() => setIsPreview(false)} handleIndex={setIndex} index={index} images={goodsData.image.map(img => {
                        return img;
                    })} />
                }
                {Object.keys(goodsData).length !== 0 &&
                    <>    
                        <div className="w-full lg:w-1/2 h-[40vh] md:h-[50vh] lg:h-[80vh] flex flex-col p-5 relative">
                            <div className="w-full h-4/5 flex flex-row gap-x-2 justify-center items-center">
                                <ChevronLeft className="text-white cursor-pointer h-4 lg:h-6 w-1/5" onClick={() => {
                                            index === 0 ? setIndex(0) : setIndex(index - 1);
                                }} />
                                <img src={goodsData.image[index]} className="w-3/5 h-full object-contain cursor-pointer" onClick={() => setIsPreview(true)} />
                                <ChevronRight className="text-white cursor-pointer h-4 lg:h-6 w-1/5" onClick={() => {
                                    index + 1 === goodsData.image.length ? setIndex(index) : setIndex(index + 1);
                                }}  />
                            </div>
                            {goodsData.image.length > 1 &&
                                <div className="w-full h-fit flex flex-row gap-x-2 justify-center items-center absolute bottom-0 inset-x-0">
                                    <div className="w-3/5 flex flex-row gap-x-2 justify-center">
                                        {goodsData.image.map((img, i) => {
                                            return <Circle key={i} className={`text-white cursor-pointer w-2 lg:w-4 h-2 lg:h-4 ${i === index ? "rounded-full bg-white" : ""}`} onClick={() => {
                                                setIndex(i);
                                            }}/>
                                        })}
                                    </div>
                                </div>
                                }
                        </div>
                        <div className="w-full lg:w-1/2 h-full lg:h-[80vh] flex flex-col px-5 lg:px-8 pt-8 text-[#d4af37] font-Poiret gap-y-8 overflow-y-scroll scrollbar-thin relative">
                            <p className="text-4xl lg:text-6xl font-bold">{goodsData.name}</p>
                            <div className="flex flex-col gap-y-5 h-full lg:h-1/2">
                                <p className="text-2xl lg:text-3xl font-semibold lg:h-1/5">Description</p>
                                <p className="text-base lg:text-2xl font-semibold text-white text-justify lg:h-4/5 lg:overflow-y-scroll scrollbar-hidden">{goodsData.description}</p>
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <p className="text-2xl lg:text-3xl font-semibold">Price</p>
                                <p className="text-base lg:text-xl font-semibold text-white">Rp{goodsData.price.toLocaleString()}</p>
                            </div>
                            {goodsData.stock && 
                                <div className="flex flex-col gap-y-5">
                                    <p className="text-2xl lg:text-3xl font-semibold">Stock</p>
                                    <p className="text-base lg:text-xl font-semibold text-white">{goodsData.stock.toLocaleString()} pcs</p>
                                </div>
                            }
                            <div className="flex flex-col gap-y-5">
                                <p className="text-2xl lg:text-3xl font-semibold">Rating</p>
                                <div className="w-fit h-fit flex flex-row gap-x-1 items-center">
                                    <p className="text-white text-xl lg:text-3xl font-semibold mr-3">{rating.toFixed(1)}</p>
                                    { 
                                        star.map(star => {
                                            if(star <= rating) {
                                                return <TbStarFilled className="text-xl lg:text-3xl text-white" key={star} />
                                            } else if(star > rating && Math.ceil(rating) === star) {
                                                return <TbStarHalfFilled className="text-xl lg:text-3xl text-white" key={star} />
                                            } else if(star > rating) {
                                                return <TbStar className="text-xl lg:text-3xl text-white" key={star} />
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-5">
                                <p className="text-2xl lg:text-3xl font-semibold">Comments</p>
                                {review.length !== 0 &&
                                    review.map((rev, i) => {
                                        return  <div className="w-full h-fit flex flex-col px-5 gap-y-1" key={i}>
                                                    <p className="text-2xl lg:text-3xl font-bold text-[#d4af37]">{rev.name}</p>
                                                    {rev.review_img &&
                                                        <img src={rev.review_img} className="w-40 md:w-80 h-30 md:h-60" />
                                                    }
                                                    <p className="text-base lg:text-xl font-semibold text-white break-words">{rev.comment}</p>
                                                    <div className="flex flex-row gap-x-2">
                                                        {star.map(star => {
                                                            if(star <= rev.star) {
                                                                return <TbStarFilled className="text-xl lg:text-2xl text-[#d4af37]" key={star} />
                                                            } else if(star > rev.star) {
                                                                return <TbStar className="text-xl lg:text-2xl text-[#d4af37]" key={star} />
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                    })
                                }
                            </div>
                            {!onCart && goodsData.type.toLowerCase() === "product" && 
                                <form className={`fixed lg:sticky bottom-0 inset-x-0 flex flex-col bg-[#232323] p-5 rounded-t-xl font-Poiret text-[#d4af37] items-center gap-y-5 justify-center cursor-pointer transition duration-500 ${isUp? "translate-y-0": "translate-y-[60%]"}`} onSubmit={isLogin ? OnSubmit : e => {
                                        e.preventDefault();
                                        navigate('/login');
                                    }}>
                                    <TbChevronCompactDown className={`text-white text-2xl text-center w-full transition duration-500 ${isUp ? "" : "rotate-180"}`} onClick={() => setIsUp(isUp ? false : true)} />
                                    <div className="flex flex-row gap-x-5 items-center">
                                        <TbPlus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === goodsData.stock ? prev : prev + 1)} />
                                        <InputTPENT type={'number'} name={'amount'} value={amount} handleChange={e => setAmount(e.target.value)} min={0} max={goodsData.stock} />
                                        <TbMinus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === 0 ? prev : prev - 1)} />
                                        <Button type={'submit'} name={'Add to cart'} />
                                    </div>
                                </form>
                            }
                            {!onCart && goodsData.type.toLowerCase() === "service" &&
                                <form className={`fixed lg:sticky bottom-0 inset-x-0 flex flex-col bg-[#232323] p-5 rounded-t-xl font-Poiret text-[#d4af37] justify-start gap-y-3 transition duration-500 cursor-pointer ${isUp? "translate-y-0": "translate-y-[90%]"}`} onSubmit={isLogin ? OnSubmit : e => {
                                        e.preventDefault();
                                        navigate('/login');
                                    }}>
                                    <TbChevronCompactDown className={`text-white text-2xl text-center w-full transition dura50 ${isUp ? "" : "rotate-180"}`} onClick={() => setIsUp(isUp ? false : true)} />
                                    <p className="font-semibold text-xl lg:text-2xl">Choose the date</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {day.map((data, i) => {
                                            return <p key={i} className={`p-2 w-full border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-[#d4af37] font-semibold text-base lg:text-xl text-white rounded-lg cursor-pointer text-center ${data === date ? "bg-[#d4af37]" : ""}`} onClick={() => setDate(data)}>{data}</p>
                                        })
                                        }
                                    </div>
                                    <p className="font-semibold text-xl lg:text-2xl">Choose the time</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {goodsData.time.map((data, i) => {
                                            return <p key={i} className={`p-2 w-full border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-[#d4af37] font-semibold text-base md:text-xl text-white rounded-lg cursor-pointer ${data === time ? "bg-[#d4af37]" : ""}`} onClick={() => setTime(data)}>{data}</p>
                                        })
                                        }
                                    </div>
                                    <p className="font-semibold text-xl lg:text-2xl">For {amount} people</p>
                                    <div className="flex flex-row gap-x-5 items-center">
                                        <TbPlus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === goodsData.stock ? prev : prev + 1)} />
                                        <InputTPENT type={'number'} name={'amount'} value={amount} handleChange={e => setAmount(e.target.value)} min={0} max={goodsData.stock} width={'w-fit'} />
                                        <TbMinus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === 0 ? prev : prev - 1)} />
                                    </div>
                                    <Button type={'submit'} name={'Book'} />
                                </form>
                            }
                            {onCart &&
                                <div className={`fixed lg:sticky bottom-0 inset-x-0 flex flex-col bg-[#232323] p-5 rounded-t-xl font-Poiret text-[#d4af37] justify-start gap-y-3 transition duration-500 cursor-pointer ${isUp? "translate-y-0": "translate-y-[55%]"}`}>
                                    <TbChevronCompactDown className={`text-white text-2xl text-center w-full transition dura50 ${isUp ? "" : "rotate-180"}`} onClick={() => setIsUp(isUp ? false : true)} />
                                    <Button type={'button'} name={'Go to cart'} handleClick={() => navigate('/profile/cart')} />
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        )
    }
}
