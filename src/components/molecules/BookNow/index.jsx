import axios from "axios";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { TbMinus, TbPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Button, InputTPENT } from "../../atoms";

export default function BookNow({ handleOut, sId}) {
    const navigate = useNavigate();
    const [day, setDay] = useState([]);
    const [goodsData, setGoodsData] = useState({});
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
        
    function getDay() {
        const today = new Date().toLocaleDateString();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const bigTomorrow = new Date(today);
        bigTomorrow.setDate(tomorrow.getDate() + 1);
        setDay([today, tomorrow.toLocaleDateString(), bigTomorrow.toLocaleDateString()]);
    }
    
    function OnSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("product_name", goodsData.name);
        data.append("product_id", goodsData._id);
        data.append("amount", amount);
        data.append("product_type", goodsData.type);
        data.append('date', date);
        data.append('hour', hour);
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

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/shop/get/${sId}`)
        .then(result => {
            setGoodsData(result.data.goodsData);
        });
        getDay();
    }, [sId])
    
    return (
        <div className="fixed inset-0 bg-black/70 z-30 w-screen h-screen flex flex-col items-center justify-center p-10">
            <form className="w-[80%] md:w-[30%] h-[45%] md:h-[50%] absolute flex flex-col gap-y-4 z-70 bg-[#363636] p-5 rounded-2xl items-center justify-center font-Poiret" onSubmit={OnSubmit}>
                <X className="w-8 h-8 absolute top-5 right-5 text-white cursor-pointer" onClick={handleOut} />
                <p className="font-semibold text-xl lg:text-2xl text-[#d4af37]">Choose the date</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {day.map((data, i) => {
                        return <p key={i} className={`p-2 w-full border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-[#d4af37] font-semibold text-base lg:text-xl text-white rounded-lg cursor-pointer text-center ${data === date ? "bg-[#d4af37]" : ""}`} onClick={() => setDate(data)}>{data}</p>
                    })
                    }
                </div>
                <p className="font-semibold text-xl lg:text-2xl text-[#d4af37]">Choose the time</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center">
                    {goodsData.time && goodsData.time.map((data, i) => {
                        return <p key={i} className={`p-2 w-full border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-[#d4af37] font-semibold text-base md:text-xl text-white rounded-lg cursor-pointer ${data === hour ? "bg-[#d4af37]" : ""}`} onClick={() => setHour(data)}>{data}</p>
                    })
                    }
                </div>
                <p className="font-semibold text-xl lg:text-2xl text-[#d4af37]">For {amount} people</p>
                <div className="flex flex-row gap-x-5 items-center">
                    <TbPlus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === goodsData.stock ? prev : prev + 1)} />
                    <InputTPENT type={'number'} name={'amount'} value={amount} handleChange={e => setAmount(e.target.value)} min={0} max={goodsData.stock} width={'w-fit'} />
                    <TbMinus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === 0 ? prev : prev - 1)} />
                </div>
                <Button type={'submit'} name={'Book'} />
            </form>
        </div>
    )
}
