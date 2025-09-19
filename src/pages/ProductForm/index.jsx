import { useState, useEffect } from "react";
import { Button, ConfirmAlert, InputFile, InputSelect, InputTPENT, Textarea, ZoomImage } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Circle, Trash, ZoomIn } from "lucide-react";
import { TbPlus, TbX } from "react-icons/tb";

export default function ProductForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState();
    const [stock, setStock] = useState(0);
    const [time, setTime] = useState([""]);
    const [productsData, setProductsData] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [isProduct, setIsProduct] = useState(true);
    const [isPreviewClicked, setIsPreviewClicked] = useState(false);
    const [index, setIndex] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setID] = useState('');
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);

    function OnUploadImage(e) {
        const uploadedImages = Object.values(e.target.files).map(img => {
            return img;
        });

        const uploadedPreviewImages = uploadedImages.map(img => {
            return URL.createObjectURL(img);
        });

        if(images.length !== 0 && previewImages.length !== 0) {
            const newImages = images.concat(uploadedImages);
            const newPreviewImages = previewImages.concat(uploadedPreviewImages);

            setImages(newImages);
            setPreviewImages(newPreviewImages);
            return;
        } if(images.length === 0 && previewImages.length === 0) {
            setIndex(0);
            setImages(uploadedImages);
            setPreviewImages(uploadedPreviewImages);
            return;
        }
    }

    function OnReset() {
        setName('');
        setDescription('');
        setDiscount(0);
        setPrice(0);
        setType('');
        setImages([]);
        setPreviewImages([]);
        setIsEdit(false);
        setID('');
    }
    
    function OnSubmit(e) {
        e.preventDefault();
        
        if(!isEdit) {
            const data = new FormData();
            data.append('name', name);
            data.append('type', type.toLowerCase());
            data.append('description', description);
            data.append('price', price);
            data.append('discount', discount);
            if(type.toLowerCase() === "product") {
                data.append('stock', stock);
            } else if(type.toLowerCase() === "service") {
                time.map(tim => {
                    return data.append('time', tim);
                })
            }
            images.map(img => {
                return data.append('image', img);
            })

            axios.post(`https://valbershop-api.vercel.app/v1/shop/add`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(() => {
                if(type.toLowerCase() === "product") {
                    navigate('/product');
                } else if(type.toLowerCase() === "service") {
                    navigate('/booking');
                }
            })
        } else {
            const data = new FormData();
            data.append('name', name);
            data.append('type', type.toLowerCase());
            data.append('description', description);
            data.append('price', price);
            data.append('discount', discount);
            if(type.toLowerCase() === "product") {
                data.append('stock', stock);
            } else if(type.toLowerCase() === "service") {
                time.map(tim => {
                    return data.append('time', tim);
                })
            }
            images.map(img => {
                return data.append('image', img);
            });

            axios.put(`https://valbershop-api.vercel.app/v1/shop/edit/${id}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                setID('');
                if(type.toLowerCase() === "product") {
                    navigate('/product');
                } else if(type.toLowerCase() === "service") {
                    navigate('/booking');
                }
            });
        }
    }

    function OnDeleteImage() {
        const newImages = images.filter((img, i) => {
            return i !== index;
        });

        const newPreviewImages = previewImages.filter((img, i) => {
            return i !== index;
        });

        setImages(newImages);
        setPreviewImages(newPreviewImages);

        if(index >= newPreviewImages.length) {
            setIndex(index - 1);
        }

        if(isPreviewClicked && newPreviewImages.length === 0) {
            setIsPreviewClicked(false);
        }
    }

    function OnDeleteProduct() {
        axios.delete(`https://valbershop-api.vercel.app/v1/shop/delete/${id}`)
        .then(() => {
            setIsConfirmDelete(false);
            setName('');
            setDescription('');
            setDiscount(0);
            setPrice(0);
            setType('');
            setImages([]);
            setPreviewImages([]);
            setIsEdit(false);
            setID('');
        })
    }

    function OnClick(id) {
        setName('');
        setDescription('');
        setDiscount(0);
        setPrice(0);
        setType('');
        setImages([]);
        setPreviewImages([]);
        setIsEdit(true);

        axios.get(`https://valbershop-api.vercel.app/v1/shop/get/${id}`)
        .then(result => {
            setName(result.data.goodsData.name);
            setDescription(result.data.goodsData.description);
            setDiscount(result.data.goodsData.discount);
            setPrice(result.data.goodsData.price);
            setType(result.data.goodsData.type);
            setImages(result.data.goodsData.image.map(img => {
                return img;
            }));
            if(result.data.goodsData.stock) {
                setStock(result.data.goodsData.stock);
            } else if(result.data.goodsData.time) {
                setTime(result.data.goodsData.time.map(tim => tim));
            }
            setID(result.data.goodsData._id);
            setPreviewImages(result.data.goodsData.image.map(img => {
                return `https://valbershop-api.vercel.app/${img}`;
            }));
        });
    }

    function OnChangeTime(index, e) {
        const newArray = time.map((tim, i) => {
            if(i === index) {
                return tim = e.target.value;
            } else {
                return tim;
            }
        })

        setTime(newArray);
    }

    function OnDeleteInput(index) {
        if(time.length === 1) {
            return;
        } else {
            const newArray = time.filter((tim, i) => {
                return i !== index;
            });
    
            setTime(newArray);
        }
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/shop/get`)
        .then(async result => {
            const product = await result.data.shopData.filter(goods => {
                return goods.type.toLowerCase() === "product"
            });

            const service = await result.data.shopData.filter(goods => {
                return goods.type.toLowerCase() === "service"
            });

            setProductsData(product);
            setServicesData(service);
        });

        const handleKey = (e) => {
            if(e.key === "ArrowRight") {
                index + 1 === previewImages.length ? setIndex(index) : setIndex(index + 1);
            } else if(e.key === "ArrowLeft") {
                index === 0 ? setIndex(0) : setIndex(index - 1);
            } else if(!isNaN(e.key)) {
                const numberKey = parseInt(e.key);

                if(numberKey >= 1 && numberKey <= previewImages.length) {
                    setIndex(numberKey - 1);
                }
            } else if(e.key === "Escape") {
                setIsPreviewClicked(false);
            }
        }

        window.addEventListener("keydown", handleKey);
        return () => {
            window.removeEventListener("keydown", handleKey);
        }
    }, [index, previewImages, productsData, servicesData, time]);

    return (
        <form className="flex flex-grow flex-col-reverse lg:flex-row p-2 lg:p-10 gap-5" onSubmit={OnSubmit}>
            {isPreviewClicked && 
                <ZoomImage handleClick={() => setIsPreviewClicked(false)} index={index} handleIndex={setIndex} images={previewImages} />
            }
            {isConfirmDelete &&
                <ConfirmAlert title={'Confirm this action'} text={'Are you sure want to delete this product?'} handleYes={OnDeleteProduct} handleNo={() => setIsConfirmDelete(false)} />
            }
            <div className="w-full lg:w-1/2 flex flex-col gap-y-3">
                <InputTPENT type={'text'} name={'goods-name'} label={'Name'} value={name} handleChange={e => setName(e.target.value)} required={true} />
                <Textarea name={'goods-description'} label={'Description'} value={description} handleChange={e => setDescription(e.target.value)} required={true} />
                <InputSelect name={'goods-type'} label={'Type'} options={["Product", "Service"]} value={type} handleChange={e => setType(e.target.value)} required={true} />
                <InputTPENT type={'number'} name={'goods-price'} label={'Price'} value={price} handleChange={e => setPrice(e.target.value)} required={true} min={1} />
                {type.toLowerCase() === "product" && <InputTPENT type={'number'} name={'goods-stock'} label={'Stock'} value={stock} handleChange={e => setStock(e.target.value)} required={true} min={1} />}
                {type.toLowerCase() === "service" && 
                <div className="flex flex-col gap-y-4">
                    {time.length !== 0 &&
                        time.map((tim, i) => {
                            return  <div className="flex flex-row gap-x-2" key={i}>
                                        <InputTPENT type={'time'} name={'service-time'} label={'Add service time'} value={tim} handleChange={e => OnChangeTime(i, e)} width={"[color-scheme:dark]"} />
                                        <TbX className="text-4xl text-[#d4af37] self-end cursor-pointer" onClick={() => OnDeleteInput(i)} />
                                    </div>
                        })
                    }
                    <div className="flex flex-row items-center gap-x-2 cursor-pointer" onClick={() => {
                            setTime(prev => [...prev, ""])
                        }}>
                        <p className="text-lg lg:text-2xl text-[#d4af37] font-semibold">Add more time</p>
                        <TbPlus className="text-xl lg:text-3xl text-[#d4af37]" />
                    </div>
                </div>
                }
                <InputTPENT type={'number'} name={'goods-discount'} label={'Discount'} value={discount} handleChange={e => setDiscount(e.target.value)} required={false} min={1} max={99} />
                {previewImages.length !== 0 &&
                    <>
                    <div className="w-full h-fit flex flex-nowrap items-center justify-evenly">
                        <ChevronLeft className="text-white cursor-pointer max-w-1/12" onClick={() => {
                            index === 0 ? setIndex(0) : setIndex(index - 1);
                        }} />
                        <img src={previewImages[index]} className="max-w-10/12 h-100 rounded-2xl object-contain cursor-pointer hover:opacity-60" onClick={() => setIsPreviewClicked(true)} />
                        <ChevronRight className="text-white cursor-pointer max-w-1/12" onClick={() => {
                            index + 1 === previewImages.length ? setIndex(index) : setIndex(index + 1);
                        }}  />
                    </div>
                    <div className="flex gap-x-3 justify-center items-center">
                        <Trash className="text-white cursor-pointer" onClick={OnDeleteImage} />
                        <ZoomIn className="text-white cursor-pointer" onClick={() => setIsPreviewClicked(true)} />
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        {previewImages.map((img, i) => {
                            return <Circle key={i} className={`text-[#d4af37] cursor-pointer ${i === index ? "rounded-full bg-[#d4af37]" : ""}`} onClick={() => {
                                setIndex(i);
                                }}/>
                        })
                        }
                    </div>
                    </>
                }
                <InputFile name={'goods-file'} label={'Add image'} multiple={true} required={isEdit && images.length !== 0 ? false : true} handleChange={e => OnUploadImage(e)} />
                {!isEdit &&
                    <div className="w-full flex flex-row gap-x-4">
                        <Button type={'submit'} name={'Add'} width={'w-1/2'} />
                        <Button type={'button'} name={'Reset'} width={'w-1/2'} handleClick={OnReset} />
                    </div>
                }
                {isEdit &&
                    <>
                        <div className="w-full flex flex-row gap-x-4">
                            <Button type={'submit'} name={'Edit'} width={'w-1/2'} />
                            <Button type={'button'} name={'Cancel'} width={'w-1/2'} handleClick={OnReset} />
                        </div>
                        <Button type={'button'} name={'Delete'} width={'w-full'} handleClick={() => setIsConfirmDelete(true)} />
                    </>
                }
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-y-2">
                <div className="flex flex-row gap-5">
                    <Button type={'button'} name={'Products'} handleClick={() => setIsProduct(true)} />
                    <Button type={'button'} name={'Services'} handleClick={() => setIsProduct(false)} />
                </div>
                <table className="table-auto w-full text-2xl border-white border-separate text-center text-white">
                    <thead>
                        <tr className="bg-[#d4af37]/90 font-bold">
                            <th className="p-1">No.</th>
                            <th className="p-1">Name</th>
                            <th className="p-1">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isProduct && 
                            productsData.map((product, i) => {
                                return  <tr key={product._id} onClick={() => OnClick(product._id)} className="bg-[#323232] text-lg cursor-pointer font-semibold">
                                            <td className="p-1">{i + 1}.</td>
                                            <td className="p-1">{product.name}</td>
                                            <td className="p-1">Rp{product.price.toLocaleString('id-ID')}</td>
                                        </tr>
                                })
                        }
                        {!isProduct && 
                            servicesData.map((service, i) => {
                                return  <tr key={service._id} onClick={() => OnClick(service._id)} className="bg-[#323232] text-lg cursor-pointer font-semibold">
                                            <td className="p-1">{i + 1}.</td>
                                            <td className="p-1">{service.name}</td>
                                            <td className="p-1">Rp{service.price.toLocaleString('id-ID')}</td>
                                        </tr>
                                })
                        }
                    </tbody>
                </table>
            </div>
        </form>
    )
}
