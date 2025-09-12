import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full h-fit bg-transparent p-10 flex md:flex-row text-base md:text-xl text-[#d4af37] font-Poiret font-semibold flex-wrap gap-y-4">
            <div className="w-1/2 md:w-full flex flex-col md:flex-row md:gap-x-10 md:justify-center md:items-center">
                <Link to={'/privacy-policy'}>Privacy & Policy</Link>
                <Link to={'/terms-conditions'}>Terms & Conditions</Link>
                <Link to={'/cookies'}>Cookies</Link>
            </div>
            <p className="w-1/2 md:w-full text-end md:text-center">© Copyright 2025</p>
        </footer>
    )
}