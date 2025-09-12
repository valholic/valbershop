import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ZoomImage } from "../../components";

export default function Gallery() {
    const [galleryData, setGalleryData] = useState([]);
    const [index, setIndex] = useState([]);
    const [isZoom, setIsZoom] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasmore] = useState(true);
    const [previewIndex, setPreviewIndex] = useState(0);
    const limit = 7;

    useEffect(() => {
        if(hasMore) {
            axios.get(`https://valbershop-api.vercel.app/v1/gallery/get?page=${page}&limit=${limit}`)
            .then(async result => {
                const data = await result.data.gallery;
                if(data.length === 0) {
                    setHasmore(false);
                } else {
                    setGalleryData(galleryData.concat(data));
                    setPage(page + 1);
                }
            });
        }

        let sum = 0;
        let index = []
        for (let i = 3; i < galleryData.length; i += sum) {
            index.push(i)
            sum = sum === 4 ? 10 : 4;
        }
        setIndex(index);

        const handleKey = (e) => {
            if(e.key === "ArrowRight") {
                previewIndex + 1 === galleryData.length ? setPreviewIndex(previewIndex) : setPreviewIndex(previewIndex + 1);
            } else if(e.key === "ArrowLeft") {
                previewIndex === 0 ? setPreviewIndex(0) : setPreviewIndex(previewIndex - 1);
            } else if(!isNaN(e.key)) {
                const numberKey = parseInt(e.key);

                if(numberKey >= 1 && numberKey <= galleryData.length) {
                    setPreviewIndex(numberKey - 1);
                }
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, [galleryData, page, hasMore, previewIndex])

    return (
        <div className="flex-grow">
            {isZoom && <ZoomImage handleClick={() => setIsZoom(false)} index={previewIndex} handleIndex={setPreviewIndex} images={galleryData.map(photo => `https://valbershop-api.vercel.app/${photo.photo}`)} />}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 auto-rows-[150px] lg:auto-rows-[300px] p-5 lg:p-10">
                {galleryData.map((photo, i) => {
                    return <img src={`https://valbershop-api.vercel.app/${photo.photo}`} key={photo._id} loading="lazy" className={`w-full h-full object-cover hover:scale-105 cursor-pointer hover:border hover:border-white ${index.includes(i) && "row-span-2"}`} onClick={() => setIsZoom(true)} />
                })
                }
            </div>
            {hasMore ? <LoaderCircle className="text-[#d4af37] text-center w-full animate-spin" /> : <p className="text-[#d4af37] text-center w-full">No more photos</p>}
        </div>
    )
}
