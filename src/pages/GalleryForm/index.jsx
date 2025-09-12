import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ConfirmAlert, InputFile, WarnAlert, ZoomImage } from "../../components";
import { ChevronLeft, ChevronRight, Trash, ZoomIn, Circle, Edit, CheckSquare, X, Square } from "lucide-react";

export default function GalleryForm() {
    const navigate = useNavigate();
    const [previewPhoto, setPreviewPhoto] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [galleryData, setGalleryData] = useState([]);
    const [index, setIndex] = useState(0);
    const [isPreviewClicked, setIsPreviewClicked] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [selected, setSelected] = useState([]);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    function OnUploadImage(e) {
        const uploadedPhoto = Object.values(e.target.files).map(img => {
            return img;
        });

        const uploadedPreviewPhoto = uploadedPhoto.map(img => {
            return URL.createObjectURL(img);
        });

        if(photo.length !== 0 && previewPhoto.length !== 0) {
            const newPhoto = photo.concat(uploadedPhoto);
            const newPreviewPhoto = previewPhoto.concat(uploadedPreviewPhoto);

            setPhoto(newPhoto);
            setPreviewPhoto(newPreviewPhoto);
            return;
        } if(photo.length === 0 && previewPhoto.length === 0) {
            setIndex(0);
            setPhoto(uploadedPhoto);
            setPreviewPhoto(uploadedPreviewPhoto);
            return;
        }
    }
    
    function OnSubmit(e) {
        e.preventDefault();
        
        const data = new FormData();
        photo.map(pht => {
            return data.append('photo', pht);
        });

        axios.post(`https://valbershop-api.vercel.app/v1/gallery/add`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(() => {
            navigate('/gallery');
        });
    }

    function OnDelete() {
        const newPhoto = photo.filter((img, i) => {
            return i !== index;
        });

        const newPreviewPhoto = previewPhoto.filter((img, i) => {
            return i !== index;
        });

        setPhoto(newPhoto);
        setPreviewPhoto(newPreviewPhoto);

        if(index >= newPreviewPhoto.length) {
            setIndex(index - 1);
        }

        if(isPreviewClicked && newPreviewPhoto.length === 0) {
            setIsPreviewClicked(false);
        }
    }

    function OnDeleteExistingImage() {
        const data = new FormData();
        selected.map(id => {
            return data.append('photo_id', id);
        });

        axios.post(`https://valbershop-api.vercel.app/v1/gallery/delete`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            setIsSelect(false);
            setIsConfirmDelete(false);
        })
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/gallery/get`)
        .then(result => {
            setGalleryData(result.data.gallery);
        })

        const handleKey = (e) => {
            if(e.key === "ArrowRight") {
                index + 1 === previewPhoto.length ? setIndex(index) : setIndex(index + 1);
            } else if(e.key === "ArrowLeft") {
                index === 0 ? setIndex(0) : setIndex(index - 1);
            } else if(!isNaN(e.key)) {
                const numberKey = parseInt(e.key);

                if(numberKey >= 1 && numberKey <= previewPhoto.length) {
                    setIndex(numberKey - 1);
                }
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, [previewPhoto, index, galleryData])

    return (
        <form className="flex flex-grow flex-col md:flex-row p-5 lg:p-10 gap-5" onSubmit={OnSubmit}>
            {isPreviewClicked && 
                <ZoomImage handleClick={() => setIsPreviewClicked(false)} index={index} handleIndex={setIndex} images={previewPhoto} />
            }
            {isPreview &&
                <ZoomImage handleClick={() => setIsPreview(false)} index={galleryIndex} handleIndex={setGalleryIndex} images={galleryData.map(photo => {
                    return `https://valbershop-api.vercel.app/${photo.photo}`;
                })} />
            }
            {isConfirmDelete &&
                <ConfirmAlert title={'Confirm this action'} text={'Are you sure want to delete selected image?'} handleYes={OnDeleteExistingImage} handleNo={() => setIsConfirmDelete(false)} />
            }
            {isAlert &&
                <WarnAlert title={'Something went wrong'} text={"You haven't selected any photo to delete"} handleOut={() => setIsAlert(false)} />
            }   
            <div className="w-full md:w-1/2 flex flex-col gap-y-2">
                {previewPhoto.length !== 0 &&
                    <>    
                        <div className="w-full h-fit flex flex-nowrap items-center justify-evenly">
                            <ChevronLeft className="text-white cursor-pointer max-w-1/12" onClick={() => {
                                index === 0 ? setIndex(0) : setIndex(index - 1);
                            }} />
                            <img src={previewPhoto[index]} className="max-w-10/12 h-100 rounded-2xl object-contain cursor-pointer hover:opacity-60" onClick={() => setIsPreviewClicked(true)} />
                            <ChevronRight className="text-white cursor-pointer max-w-1/12" onClick={() => {
                                index + 1 === previewPhoto.length ? setIndex(index) : setIndex(index + 1);
                            }}  />
                        </div>
                        <div className="flex gap-x-3 justify-center items-center">
                            <Trash className="text-white cursor-pointer" onClick={OnDelete} />
                            <ZoomIn className="text-white cursor-pointer" onClick={() => setIsPreviewClicked(true)} />
                        </div>
                        <div className="flex gap-x-2 justify-center">
                            {previewPhoto.map((img, i) => {
                                return <Circle key={i} className={`text-[#d4af37] cursor-pointer ${i === index ? "rounded-full bg-[#d4af37]" : ""}`} onClick={() => {
                                        setIndex(i);
                                        }}/>
                                })
                            }
                    </div>
                    </>
                }
                <InputFile name={'photo'} label={'Add photo to Gallery'} required={true} multiple={true} handleChange={e => OnUploadImage(e)} />
                <Button type={'submit'} name={'Add'} />
            </div>
            {galleryData.length !== 0 &&
                <div className="w-full md:w-1/2 h-[80vh]">
                    <div className="flex flex-nowrap gap-4">
                        <Edit className="text-[#d4af37] w-8 h-8 my-5 cursor-pointer" onClick={() => setIsSelect(true)} />
                        {isSelect &&
                            <>
                                <Trash className="text-[#d4af37] w-8 h-8 my-5 cursor-pointer" onClick={selected.length !== 0 ? () => setIsConfirmDelete(true) : () => setIsAlert(true)} />
                                <X className="text-[#d4af37] w-8 h-8 my-5 cursor-pointer" onClick={() => {
                                    setIsSelect(false);
                                    setSelected([]);
                                }} />
                            </>
                        }
                    </div>
                    <div className="w-full h-full flex flex-col overflow-y-scroll scrollbar-hidden gap-y-10 scroll-smooth snap-mandatory snap-y whitespace-nowrap">
                        { 
                            galleryData.map(photo => {
                                if(isSelect) {
                                    return <div className="w-full flex flex-nowrap gap-5" key={photo._id}>
                                        {selected.includes(photo._id) ? <CheckSquare className="text-[#d4af37] w-1/8 h-8 cursor-pointer" onClick={() => setSelected(selected.filter(id => id !== photo._id))} /> : <Square className="text-[#d4af37] w-1/8 h-8 cursor-pointer" onClick={() => setSelected([photo._id, ...selected])} />}
                                        <img src={`https://valbershop-api.vercel.app/${photo.photo}`} className="w-7/8 h-4/5 object-contain rounded-2xl snap-center hover:opacity-80 cursor-pointer" onClick={() => setIsPreview(true)} />
                                    </div>
                                } else {
                                    return <img src={`https://valbershop-api.vercel.app/${photo.photo}`} className="w-full h-4/5 object-contain rounded-2xl snap-center hover:opacity-80 cursor-pointer" key={photo._id} onClick={() => setIsPreview(true)} />
                                }
                            })
                        }
                    </div>
                </div>
            }
        </form>
    )
}
