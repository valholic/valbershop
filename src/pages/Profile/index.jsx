import axios from "axios";
import { useEffect, useState } from "react"
import { Button, HistoryCard, StatusCard } from "../../components";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/api/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            setUserData(result.data.user);
        });
    }, [token, userData])

    return (
        <div className="flex-grow flex flex-col lg:flex-row p-5 lg:p-10 gap-4 font-Poiret w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-y-5">
                <p className="text-5xl md:text-6xl text-[#d4af37] font-bold">Hello, <span className="text-white">{userData.name}!</span></p>
                <p className="text-2xl md:text-3xl text-[#d4af37] font-semibold">How are you?</p>
                <Button type={'button'} name={'Check your cart!'} handleClick={() => navigate('/profile/cart')} width={'w-3/4 md:w-2/5 lg:w-1/2'} />
                <p className="text-2xl md:text-3xl lg:text-4xl text-[#d4af37] font-bold my-5 bg-[#353535] w-fit h-fit p-5 rounded-3xl">Awaiting service</p>
                <div className="flex flex-col gap-y-4 p-2 w-full">
                    {"history" in userData && userData.history.length !== 0 &&
                        userData.history.map(his => {
                            const now = new Date();
                            if(his.type === "service") {
                                const serviceTime = [his.service_time.date, his.service_time.hour];
                                if(now < new Date(serviceTime.join(' '))) {
                                    return <StatusCard key={his._id} name={his.name} serviceTime={serviceTime.join(' ')} />;
                                }
                            }
                        })  
                    }
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-y-5">
                <p className="text-2xl md:text-3xl lg:text-4xl text-[#d4af37] font-bold my-5 bg-[#353535] w-fit h-fit p-5 rounded-3xl">Your history</p>
                {"history" in userData && userData.history.length !== 0 &&
                    userData.history.map(his => {
                        return <HistoryCard key={his._id} time={his.check_out_time} pName={his.name} amount={his.amount} price={his.price} gId={his.goods_id} uId={userData._id} uName={userData.name} type={his.type}  />
                    })
                }
            </div>
        </div>
    )
}
