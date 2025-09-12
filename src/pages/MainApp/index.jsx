import { Route, Routes } from "react-router-dom";
import { Footer, Header } from "../../components";
import { Booking, Home, Admin, Product, Contact, Gallery, Testimony, Profile, Cart } from "../index";
import Detail from "../Detail";

export default function MainApp() { 
    return (
        <div className="flex flex-col w-full min-h-screen bg-[#0c0c0c]">
            <Header />
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/admin/*" Component={Admin} />
                <Route path="/booking" Component={Booking} />
                <Route path="/booking/detail/:id/:slug" Component={Detail} />
                <Route path="/product" Component={Product} />
                <Route path="/product/detail/:id/:slug" Component={Detail} />
                <Route path="/contact" Component={Contact} />
                <Route path="/gallery" Component={Gallery} />
                <Route path="/testimony" Component={Testimony} />
                <Route path="/profile" Component={Profile} />
                <Route path="/profile/cart" Component={Cart} />
            </Routes>
            <Footer />
        </div>
    )
}
