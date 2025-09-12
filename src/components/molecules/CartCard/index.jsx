import { TbMinus, TbPlus } from "react-icons/tb";
import { Button, InputTPENT } from "../../atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChangeTime, Payment, ConfirmAlert } from "..";
import { useNavigate } from "react-router-dom";

export default function CartCard({ img, name, price, pId, cId, time, oldAmount}) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [goodsData, setGoodsData] = useState({});
    const [amount, setAmount] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [isPay, setIsPay] = useState(false);
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    
    function toSlug(text) {
        return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }

    function OnDelete() {
        axios.delete(`https://valbershop-api.vercel.app/v1/api/cart/delete/${cId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => {
            setIsDelete(false);
        })
    }

    function OnPay(e) {
        e.preventDefault();

        console.log(time)
        const token = localStorage.getItem('token');
        const data = new FormData();
        data.append('name', goodsData.name);
        data.append('goods_id', goodsData._id);
        data.append('type', goodsData.type);
        data.append('amount', oldAmount);
        data.append('receive_status', false);
        data.append('price', goodsData.price);
        if(time) {
            data.append('date', time.date);
            data.append('hour', time.hour);
        }
        axios.patch(`https://valbershop-api.vercel.app/v1/api/history`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            axios.delete(`https://valbershop-api.vercel.app/v1/api/cart/delete/${cId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        })
        .then(() => {
            navigate('/profile');
        });
    }

    function OnEdit() {
        const data = new FormData();
        data.append("date", date);
        data.append("hour", hour);
        data.append("amount", amount);

        axios.patch(`https://valbershop-api.vercel.app/v1/api/cart/edit/${cId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => {
            setIsEdit(false);
            setAmount(0);
            setDate('');
            setHour('');
        })
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/shop/get/${pId}`)
        .then(result => {
            setGoodsData(result.data.goodsData);
        });

    }, [pId, goodsData])

    return (
        <div className="flex flex-col md:flex-row w-full h-fit md:h-105 md:bg-[#353535] rounded-4xl font-Poiret p-5 relative">
            <img src={img} className="md:hidden absolute w-full h-full -m-5 rounded-2xl opacity-20 z-0" />
            {isChange && <ChangeTime handleOut={() => setIsChange(false)} handleTime={setHour} handleDate={setDate} hour={hour} date={date} goodsData={goodsData} />}
            {isPay && <Payment handleOut={() => setIsPay(false)} handlePay={OnPay} />}
            {isDelete && <ConfirmAlert title={'Confirm this action'} text={'Are you sure to delete this from your cart?'} handleNo={() => setIsDelete(false)} handleYes={OnDelete} />}
            <img src={img} className="w-1/2 h-full object-contain hidden md:flex z-10" />
            <div className="w-full md:w-1/2 flex flex-col gap-y-2 justify-between z-10">
                <p className="text-3xl md:text-4xl 2xl:text-5xl text-[#d4af37] font-extrabold line-clamp-1">{ name }</p>
                <p className="text-xl md:text-2xl lg:text-3xl text-[#d4af37] font-bold">Amount</p>
                {!isEdit && <p className="text-lg md:text-xl 2xl:text-2xl text-white font-semibold">{ oldAmount }</p>}
                {isEdit && 
                    <div className="flex flex-row gap-x-5 items-center">
                        <TbPlus className="text-[#d4af37] text-2xl md:text-xl 2xl:text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === goodsData.stock ? prev : prev + 1)} />
                        <InputTPENT type={'number'} name={'amount'} value={amount} handleChange={e => setAmount(e.target.value)} min={0} max={goodsData.stock} width={'w-fit'} />
                        <TbMinus className="text-[#d4af37] text-2xl md:text-xl 2xl:text-2xl cursor-pointer" onClick={() => setAmount(prev => prev === 0 ? prev : prev - 1)} />
                    </div>
                }
                {goodsData.type && goodsData.type.toLowerCase() === "service" &&
                    <>                
                        <p className="text-xl md:text-2xl 2xl:text-3xl text-[#d4af37] font-bold">Booked time</p>
                        {time && !isEdit && 
                            <p className="text-2xl md:text-xl 2xl:text-2xl text-white font-semibold">On { time.date } at { time.hour }</p>
                        }
                        {isEdit &&
                            <Button type={'button'} name={'Change time'} handleClick={() => setIsChange(true)} width={'w-1/2'} />
                        }
                    </>
                }
                <p className="text-xl md:text-2xl 2xl:text-3xl text-[#d4af37] font-bold">Price</p>
                <p className="text-2xl md:text-xl 2xl:text-2xl text-white font-semibold">Rp{ isEdit ? (price * amount).toLocaleString() : (price * oldAmount).toLocaleString() }</p>
                <div className="grid 2xl:flex grid-cols-2 2xl:flex-row gap-2">
                    {isEdit && <Button name={"Cancel"} handleClick={() => setIsEdit(false)} />}
                    {isEdit && <Button name={"Change"} handleClick={OnEdit} />}
                    {!isEdit && <Button name={"Delete"} handleClick={() => setIsDelete(true)} />}
                    {!isEdit && <Button name={"Edit"} handleClick={() => setIsEdit(true)} />}
                    {!isEdit && <Button name={"Pay"} handleClick={() => setIsPay(true)} />}
                    {!isEdit && <Button name={"Detail"} handleClick={() => navigate(goodsData.type === 'product' ? `/product/detail/${pId}/${toSlug(name)}` : `/booking/detail/${pId}/${toSlug(name)}`)} />}
                </div>
            </div>
        </div>
    )
}
