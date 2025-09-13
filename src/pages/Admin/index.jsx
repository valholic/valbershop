import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Dashboard, GalleryForm, ProductForm, TestimonyForm } from "../index";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const token = localStorage.getItem('token');
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        axios.get(`https://valbershop-api.vercel.app/v1/api/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(result => {
            if(result.data.user.role.toLowerCase() !== 'admin') {
                navigate('/');
            }
            setIsFinished(true);
        });
    }, [navigate, token])

    if(isFinished) {
        return (
            <div className="flex flex-grow font-Poiret bg-[#0c0c0c] flex-col lg:flex-row p-5 gap-5">
                <section className="flex text-center lg:text-start text-white lg:text-black w-full lg:w-1/5 bg-transparent lg:bg-[#d4af37] lg:border-r lg:border-white text-base md:text-xl lg:text-3xl md:p-1 lg:p-5 font-semibold flex-row lg:flex-col gap-x-2 lg:gap-y-10">
                    <Link to={'/admin/dashboard'} className={`p-2 w-full rounded-2xl border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-black/20 ${path === '/admin/dashboard' ? "bg-[#d4af37] lg:bg-black/20" : ""}`}>Dashboard</Link>
                    <Link to={'/admin/product'} className={`p-2 w-full rounded-2xl border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-black/20 ${path === '/admin/product' ? "bg-[#d4af37] lg:bg-black/20" : ""}`}>Products & Services</Link>
                    <Link to={'/admin/gallery'} className={`p-2 w-full rounded-2xl border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-black/20 ${path === '/admin/gallery' ? "bg-[#d4af37] lg:bg-black/20" : ""}`}>Gallery</Link>
                    <Link to={'/admin/testimony'} className={`p-2 w-full rounded-2xl border border-[#d4af37] hover:bg-[#d4af37] lg:hover:bg-black/20 ${path === '/admin/testimony' ? "bg-[#d4af37]lg:bg-black/20" : ""}`}>Testimony</Link>
                </section>
                <section className="flex flex-col w-full">
                    <Routes>
                        <Route path="/dashboard" Component={Dashboard} />
                        <Route path="/product" Component={ProductForm} />
                        <Route path="/gallery" Component={GalleryForm} />
                        <Route path="/testimony" Component={TestimonyForm} />
                    </Routes>
                </section>
            </div>
        )
    }
}
