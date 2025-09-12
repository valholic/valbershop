import { Link, useNavigate } from "react-router-dom";
import { Valbershop } from "../../assets";
import { Button, InputTPENT } from "../../components";
import axios from "axios";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passsword, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    function OnSubmit(e) {
        e.preventDefault();

        const dataLogin = new FormData();
        dataLogin.append('email', email);
        dataLogin.append('password', passsword);

        axios.post(`https://valbershop-api.vercel.app/v1/auth/login`, dataLogin, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            localStorage.setItem("token", result.data.token);
    
            if(!result.data.token) {
                return;
            } else {
                axios.get(`https://valbershop-api.vercel.app/v1/api/me`, {
                    headers: {
                        "Authorization": `Bearer ${result.data.token}`
                    }
                })
                .then(result => {
                    console.log(result.data.user)
                    if(result.data.user.role === "customer") {
                        navigate('/');
                    } else if(result.data.user.role === "admin") {
                        navigate('/admin/dashboard');
                    }
                })
            }
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
                    <p className="font-Poiret text-2xl lg:text-4xl text-red-700 text-center w-full font-semibold">Email or Password is Invalid!</p>
                }
                <InputTPENT type={'email'} name={'email'} label={'Email'} value={email} handleChange={e => setEmail(e.target.value)} width={"w-full md:w-3/5"} required={true} />
                <InputTPENT type={'password'} name={'password'} label={'Password'} value={passsword} handleChange={e => setPassword(e.target.value)} width={"w-full md:w-3/5"} required={true} />
                <Button type={'submit'} name={'Login'} width={"w-full md:w-3/5"} />
                <Link to={'/register'} className="text-[#d4af37] text-lg md:text-xl w-full text-center">Don't have account? Register!</Link>
            </form>
        </div>
    )
}
