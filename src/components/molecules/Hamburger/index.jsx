import axios from "axios";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ConfirmAlert from "../ConfirmAlert";

export default function Hamburger({ isHamburger, handleIsHamburger }) {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const token = localStorage.getItem("token");
    const [isLogin, setIsLogin] = useState(false);
    const [isLogOut, setIsLogOut] = useState(false);
    
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
        <nav className={`flex lg:hidden flex-col w-full md:w-1/2 text-end text-[#d4af37] font-Poiret bg-[#222222] p-4 h-screen fixed font-semibold text-3xl gap-y-5 md:gap-y-10 ${isHamburger ? "right-0" : "-right-full"} transition-all duration-1000`}>
            {isLogOut &&
                <ConfirmAlert title={'Confirm this action'} text={'Are you sure want to log out?'} handleNo={() => setIsLogOut(false)} handleYes={() => {
                    navigate('/login');
                    localStorage.removeItem('token');
                }} />
            }
            <X className="w-10 h-10 float-left cursor-pointer" onClick={() => handleIsHamburger(false)} />
            <Link to={'/profile'} className={`flex flex-col hover:text-white items-end gap-y-4 ${path === '/profile' ? "text-white" : ""}`} onClick={() => handleIsHamburger(false)}>
                <CgProfile className="text-7xl" />
                <p>Profile</p>
            </Link>
            <Link to={'/'} className={`hover:text-white ${path === '/' ? "text-white" : ""}`} onClick={() => handleIsHamburger(false)}>Home</Link>
            <Link to={'/product'} className={`hover:text-white ${path === '/product' ? "text-white" : ""}`} onClick={() => handleIsHamburger(false)}>Product</Link>
            <Link to={'/booking'} className={`hover:text-white ${path === '/booking' ? "text-white" : ""}`}>Booking</Link>
            <Link to={'/gallery'} className={`hover:text-white ${path === '/gallery' ? "text-white" : ""}`}>Gallery</Link>
            <Link to={'/testimony'} className={`hover:text-white ${path === '/testimony' ? "text-white" : ""}`}>Testimony</Link>
            <Link to={'/contact'} className={`hover:text-white ${path === '/contact' ? "text-white" : ""}`}>Contact</Link>
            <Link to={'/privacy-policy'} className={`hover:text-white ${path === '/privacy-policy' ? "text-white" : ""}`}>Privacy & Policy</Link>
            <Link to={'/terms-conditions'} className={`hover:text-white ${path === '/terms-condition' ? "text-white" : ""}`}>Terms & Conditions</Link>
            <Link to={'/cookies'} className={`hover:text-white ${path === '/cookies' ? "text-white" : ""}`}>Cookies</Link>
            <button type="button" onClick={() => setIsLogOut(true)} className={`hover:text-white`}>{isLogin ? 'Log out' : 'Log in'}</button>
        </nav>
    )
}
