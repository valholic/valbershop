import { Link, useLocation, useNavigate } from "react-router-dom";
import { Valbershop } from "../../../assets";
import Hamburger from "../Hamburger";
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import ConfirmAlert from "../ConfirmAlert";
import axios from "axios";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const token = localStorage.getItem('token');
    const [isHamburger, setIsHamburger] = useState(false);
    const [isLogOut, setIsLogOut] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    
    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/api/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            setIsLogin(true);
        });
    }, [token])

    return (
        <header className="w-full h-fit bg-black/70 flex flex-row justify-between px-3 lg:p-5 sticky top-0 z-30">
            {isLogOut &&
                <ConfirmAlert title={'Confirm this action'} text={'Are you sure want to log out?'} handleNo={() => setIsLogOut(false)} handleYes={() => {
                    navigate('/login');
                    localStorage.removeItem('token');
                }} />
            }
            <div className="flex gap-x-2 items-center h-full">
                <img src={Valbershop} className="w-30 h-15 md:w-40 md:h-20" />
                <p className="font-Poiret text-2xl md:text-3xl 2xl:text-5xl text-[#d4af37] font-bold">Valbershop</p>
            </div>
            <nav className="hidden lg:flex gap-x-10 font-Poiret font-semibold text-[#d4af37] lg:text-xl 2xl:text-3xl items-center">
                <Link to={'/'} className={`hover:text-white ${path === '/' ? "text-white" : ""}`}>Home</Link>
                <Link to={'/product'} className={`hover:text-white ${path === '/product' ? "text-white" : ""}`}>Product</Link>
                <Link to={'/booking'} className={`hover:text-white ${path === '/booking' ? "text-white" : ""}`}>Booking</Link>
                <Link to={'/gallery'} className={`hover:text-white ${path === '/gallery' ? "text-white" : ""}`}>Gallery</Link>
                <Link to={'/testimony'} className={`hover:text-white ${path === '/testimony' ? "text-white" : ""}`}>Testimony</Link>
                <Link to={'/contact'} className={`hover:text-white ${path === '/contact' ? "text-white" : ""}`}>Contact</Link>
            </nav>
            <Hamburger isHamburger={isHamburger} handleIsHamburger={setIsHamburger} />
            <div className="hidden lg:flex flex-row gap-x-4 font-Poiret items-center font-semibold">
                <Link to={'/profile'} className={`text-[#d4af37] text-5xl hover:text-white ${path === '/profile' ? "text-white" : ""}`}><CgProfile /></Link>
                <button type="button" className="p-2 w-fit h-fit rounded-full bg-[#d4af37] lg:text-lg 2xl:text-2xl cursor-pointer" onClick={isLogin ? () => setIsLogOut(true) : () => navigate('/login')}>{isLogin ? 'Log Out' : 'Log in'}</button>
            </div>
            <Menu className="lg:hidden w-10 h-10 flex self-center cursor-pointer text-[#d4af37]" onClick={() => setIsHamburger(true)} />
        </header>
    )
}
