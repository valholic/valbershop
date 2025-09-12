import { Link, useNavigate } from "react-router-dom";
import { Valbershop } from "../../assets";
import { Button, InputTPENT } from "../../components";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    function OnSubmit(e) {
        e.preventDefault()
        const userData = new FormData();
        userData.append('name', name);
        userData.append('email', email);
        userData.append('password', password);

        axios.post(`https://valbershop-api.vercel.app/v1/user/register`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            navigate('/login');
        })
        .catch(() => {
            setIsError(true);
        })
    }

    return (
        <div className="h-screen w-screen bg-[#0c0c0c] p-5 flex flex-col lg:flex-row items-center justify-center">
            <img src={ Valbershop } className="w-60 h-40 md:w-100 md:h-80"/>
            <p className="text-6xl md:text-8xl lg:text-7xl text-[#d4af37] font-Poiret font-bold text-center">Valbershop</p>
            <form className="w-full my-5 flex flex-wrap gap-4 justify-center" onSubmit={OnSubmit}>
                {isError && 
                    <p className="font-Poiret text-4xl text-red-700 text-center w-full font-semibold">User email has registered!</p>
                }
                <InputTPENT type={'text'} name={'name'} label={'Name'} value={name} handleChange={e => setName(e.target.value)} width={"w-full md:w-3/5"} required={true} />
                <InputTPENT type={'email'} name={'email'} label={'Email'} value={email} handleChange={e => setEmail(e.target.value)} width={"w-full md:w-3/5"} required={true} />
                <InputTPENT type={'password'} name={'password'} label={'Password'} value={password} handleChange={e => setPassword(e.target.value)} width={"w-full md:w-3/5"} required={true} />
                <Button type={'submit'} name={'Register'} width={"w-full md:w-3/5"} />
                <Link to={'/login'} className="text-[#d4af37] text-lg md:text-xl w-full text-center">Already have account? Login!</Link>
            </form>
        </div>
    )
}
