import { X } from "lucide-react";
import { Button } from "../../atoms";
import { PiPaypalLogo } from "react-icons/pi";
import { FaApplePay, FaGooglePay } from "react-icons/fa";
import { useState } from "react";

export default function Payment({ handleOut, handlePay }) {
    const [isClick, setIsClick] = useState('');

    return (
        <div className="fixed inset-0 bg-black/70 z-30 w-screen h-screen flex flex-col items-center justify-center p-10">
            <form className="w-[80%] lg:w-[30%] h-[25%] md:h-[30%] absolute flex flex-col gap-y-4 z-70 bg-[#363636] p-5 rounded-2xl items-center justify-center font-Poiret" onSubmit={handlePay}>
                <X className="w-6 md:w-8 h-6 md:h-8 absolute top-3 md:top-5 right-3 md:right-5 text-white cursor-pointer" onClick={handleOut} />
                <p className="text-xl md:text-3xl text-[#d4af37] font-bold text-center">Choose the payment method</p>
                <div className="flex flex-row gap-x-4">
                    <PiPaypalLogo className={`text-3xl md:text-6xl text-blue-400 hover:border hover:border-blue-400 rounded-md md:rounded-2xl cursor-pointer ${isClick === 'pp' ? 'border border-blue-400' : ''}`} onClick={() => setIsClick('pp')} />
                    <FaApplePay className={`text-3xl md:text-6xl text-black hover:border hover:border-black rounded-md md:rounded-2xl cursor-pointer ${isClick === 'ap' ? 'border border-black' : ''}`} onClick={() => setIsClick('ap')} />
                    <FaGooglePay className={`text-3xl md:text-6xl text-red-400 hover:border hover:border-red-400 rounded-md md:rounded-2xl cursor-pointer ${isClick === 'gp' ? 'border border-red-400' : ''}`} onClick={() => setIsClick('gp')}  />
                </div>
                <Button type={'submit'} name={'Pay'} />
            </form>
        </div>
    )
}
