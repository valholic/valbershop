import { X } from "lucide-react";
import { Button, InputFile, Textarea } from "../../atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbStar, TbStarFilled } from "react-icons/tb";
import ConfirmAlert from "../ConfirmAlert";

export default function ReviewForm({ handleOut, uName, uId, gId }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [img, setImg] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [rId, setRId] = useState('');
    const star = [1, 2, 3, 4, 5];

    function OnUploadImage(e) {
        const uploadedImage = e.target.files[0];
        setImg(uploadedImage);
    }

    function OnSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('name', uName);
        data.append('user_id', uId);
        data.append('comment', comment);
        data.append('review_img', img);
        data.append('star', rating);

        axios.patch(`https://valbershop-api.vercel.app/v1/shop/review/${gId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(handleOut);
    }

    function OnDeleteReview() {
        axios.delete(`https://valbershop-api.vercel.app/v1/shop/review/delete/${gId}/${rId}`)
        .then(handleOut);
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/shop/get/${gId}`)
        .then(result => {
            result.data.goodsData.review.forEach(rev => {
                if(rev.user_id === uId) {
                    console.log(rev)
                    setHasReviewed(true);
                    setComment(rev.comment);
                    setRating(rev.star);
                    if(rev.review_img) {
                        setImg(rev.review_img);
                    }
                    setRId(rev._id);
                }
            })
            setIsFinished(true);
        })
    }, [gId, uId]);

    return (
        <div className="fixed inset-0 bg-black/70 z-30 w-screen h-screen flex flex-col items-center justify-center p-10">
            <form className="w-[90%] md:w-[60%] h-fit absolute flex flex-col gap-y-4 z-70 bg-[#363636] p-5 rounded-2xl font-Poiret" onSubmit={OnSubmit}>
            {isDelete && 
                <ConfirmAlert title={'Confirm this action'} text={'Are you sure to delete your review?'} handleNo={() => {
                    setIsDelete(false);
                }} handleYes={OnDeleteReview} />
            }
                <X className="w-8 h-8 absolute top-2 right-2 text-white cursor-pointer" onClick={handleOut} />
                <Textarea name={'comment'} label={'Comment'} value={comment} handleChange={e => setComment(e.target.value)} required={true} />
                <p className="text-2xl text-[#d4af37] font-bold">Rate the product</p>
                <div className="flex flex-row gap-x-2 items-center">
                    {star.map((star, i) => {
                        if(rating >= star) {
                            return <TbStarFilled key={i} className="text-2xl text-[#d4af37] cursor-pointer" onClick={() => setRating(star)} />
                        } else {
                            return <TbStar key={i} className="text-2xl text-[#d4af37] cursor-pointer" onClick={() => setRating(star)} />
                        }
                    })}
                </div>
                {img !== null && 
                    <div className="flex flex-col w-fit h-fit gap-y-4">
                        <img src={`https://valbershop-api.vercel.app/${img}`} className="w-1/5 h-1/4 rounded-2xl" loading="lazy" />
                        <Button type={'button'} name={'Delete image'} handleClick={() => setImg(null)} width={'w-1/5'} />
                    </div>
                }
                {img === null && 
                    <InputFile name={'review-img'} label={'You can also add image!'} required={false} handleChange={e => OnUploadImage(e)} />
                }
                {isFinished && !hasReviewed && <Button type={'submit'} name={'Add review'} />}
                {isFinished && hasReviewed && <Button type={'button'} name={'Delete review'} handleClick={() => setIsDelete(true)} />}
            </form>
        </div>
    )
}
