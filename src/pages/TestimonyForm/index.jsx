import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { Button, ConfirmAlert, InputTPENT, Textarea } from "../../components";
import { ChevronDown, Trash } from "lucide-react";

export default function TestimonyForm() {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [source, setSource] = useState('');
    const [testimoniesData, setTestimoniesData] = useState([]);
    const [isClick, setIsClick] = useState("");
    const [isConfirmDelete, setIsConfirmDelete] = useState(false);

    function OnSubmit(e) {
        e.preventDefault();
        
        const data = new FormData();
        data.append('text', text);
        data.append('source', source);

        axios.post(`https://valbershop-api.vercel.app/v1/testimony/add`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            navigate('/testimony')
        })
    }

    function OnDelete() {
        axios.delete(`https://valbershop-api.vercel.app/v1/testimony/delete/${isClick}`)
        .then(() => {
            setIsClick("");
            setIsConfirmDelete(false);
        });
    }

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/testimony/get`)
        .then(result => {
            setTestimoniesData(result.data.testimonies);
        });
    }, [testimoniesData])

    return (
        <form className="flex flex-grow flex-col md:flex-row p-5 lg:p-10 gap-5" onSubmit={OnSubmit}>
            {isConfirmDelete &&
                <ConfirmAlert title={'Confirm this action'} text={'Are you sure want to delete this testimony?'} handleYes={OnDelete} handleNo={() => setIsConfirmDelete(false)} />
                
            }
            <div className="w-full md:w-1/2 flex flex-col gap-y-2">
                <Textarea name={'testimony'} label={'Add testimony'} value={text} handleChange={e => setText(e.target.value)} required={true} />
                <InputTPENT type={'text'} name={'source'} label={'Add identity'} value={source} handleChange={e => setSource(e.target.value)} required={true} />
                <Button type={'submit'} name={'Add'} />
            </div>
            {testimoniesData.length !== 0 &&
                <div className="w-full md:w-1/2 h-[80vh] flex flex-col items-end my-10 overflow-y-scroll scrollbar-hidden">
                    {testimoniesData.map(test => {
                        return  <>
                            <div className="flex flex-nowrap w-full md:w-4/5 h-14 text-[#d4af37] justify-between cursor-pointer rounded-md p-2" onClick={() => setIsClick(isClick === test._id ? "" : test._id)}>
                                <p className="w-3/4 h-3/4 text-xl md:text-2xl font-semibold">{test.source}</p>
                                <Trash className="w-1/8 h-6 md:h-8" onClick={() => setIsConfirmDelete(true)} />
                                <ChevronDown className={`w-1/8 h-6 md:h-8 transition ${isClick === test._id? "rotate-180" : ""}`}/>
                            </div>
                            <p className={`w-full md:w-4/5 text-lg md:text-xl bg-[#1f1e1e] text-white p-3 text-justify ${isClick === test._id ? "block" : "hidden"}`}>{test.text}</p>
                        </>
                        })
                    }    
                </div>
            }
        </form>
    )
}
