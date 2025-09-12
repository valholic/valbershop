import axios from "axios";
import { useEffect, useState } from "react";
import { CartCard } from "../../components";

export default function Cart() {
    const token = localStorage.getItem('token');
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/api/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(result => {
            setCartData(result.data.user.cart);
        });
    }, [token, cartData])
    return (
        <div className="flex-grow p-2 lg:p-5 relative">
            {cartData.length !== 0 && 
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-8 items-center">
                    {cartData.map(cart => {
                        return <CartCard key={cart._id} img={`https://valbershop-api.vercel.app/${cart.cart_image}`} name={cart.product_name} price={cart.amount * cart.price} pId={cart.product_id} cId={cart._id} time={cart.time} oldAmount={cart.amount} />
                    })}
                </div>
            }
            {cartData.length === 0 &&
                <p className="text-3xl lg:text-5xl text-[#d4af37] font-Poiret absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">You haven't added anything to your cart</p>
            }
        </div>
    )
}
