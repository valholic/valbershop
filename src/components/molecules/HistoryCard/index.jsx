import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { ReviewForm } from "..";
import { Link } from "react-router-dom";

export default function HistoryCard({ time, pName, amount, price, gId, uId, uName, type }) {
    const [isClick, setIsClick] = useState(false);
    const [isReview, setIsReview] = useState(false);

    function toSlug(text) {
        return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
    }

    return (
        <div className="flex flex-col md:grid md:grid-cols-3 gap-2 p-4 bg-[#353535] rounded-lg w-full h-fit relative">
            {isReview && <ReviewForm handleOut={() => setIsReview(false)} gId={gId} uId={uId} uName={uName} />}
            <Ellipsis className="text-[#d4af37] text-3xl absolute right-2 top-1 cursor-pointer" onClick={() => setIsClick(isClick ? false : true)} />
            <div className={`${isClick ? "flex" : "hidden"} flex-col w-fit h-fit absolute right-3 top-7 font-bold`}>
                <p className="text-black text-xl cursor-pointer py-1 px-4 bg-[#d4af37] hover:bg-[#d4af37]/90 rounded-md" onClick={() => setIsReview(true)}>Review</p>
            </div>
            <div className="flex flex-col gap-y-2 font-bold">
                <Link to={type === 'product' ? `/product/detail/${gId}/${toSlug(pName)}` : `/booking/detail/${gId}/${toSlug(pName)}`} className="text-2xl text-[#d4af37]">{pName}</Link>
                <p className="text-lg text-white">On {time}</p>
            </div>
            <div className="flex flex-col gap-y-2 font-bold">
                <p className="text-2xl text-[#d4af37]">Amount</p>
                <p className="text-lg text-white">{amount}</p>
            </div>
            <div className="flex flex-col gap-y-2 font-bold">
                <p className="text-2xl text-[#d4af37]">Price</p>
                <p className="text-lg text-white">Rp{(price * amount).toLocaleString()}</p>
            </div>
        </div>
    )
}
