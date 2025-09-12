import { TbMinus, TbPlus } from "react-icons/tb";
import { Button, InputTPENT } from "../../atoms";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function AddCart({ handleOut, pId }) {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [goodsData, setGoodsData] = useState({});

    function OnSubmit(e) {
        e.preventDefault();
    
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("product_name", goodsData.name);
        data.append("product_id", goodsData._id);
        data.append("amount", amount);
        data.append("product_type", goodsData.type);
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
        axios.get(`https://valbershop-api.vercel.app/v1/shop/get/${pId}`)
        .then(result => {
            setGoodsData(result.data.goodsData);
        });
    }, [pId])

    return (
        <div className="fixed inset-0 bg-black/70 z-30 w-screen h-screen flex flex-col items-center justify-center p-10">
            <form className="w-[80%] md:w-[30%] h-[25%] md:h-[30%] absolute flex flex-col gap-y-4 z-70 bg-[#363636] p-5 rounded-2xl items-center justify-center font-Poiret" onSubmit={OnSubmit}>
                <X className="w-8 h-8 absolute top-5 right-5 text-white cursor-pointer" onClick={handleOut} />
                <p className="font-semibold text-xl lg:text-2xl text-[#d4af37]">Amount</p>
                <div className="flex flex-row gap-x-5 items-center">
                    <TbPlus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === goodsData.stock ? prev : prev + 1)} />
                    <InputTPENT type={'number'} name={'amount'} value={amount} handleChange={e => setAmount(e.target.value)} min={0} max={goodsData.stock ?? goodsData.stock} width={'w-fit'} />
                    <TbMinus className="text-[#d4af37] text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === 0 ? prev : prev - 1)} />
                </div>
                <Button type={'submit'} name={'Add to cart'} />
            </form>
        </div>
    )
}
