import axios from "axios";
import { useEffect, useState } from "react";
import { DashboardCard } from "../../components";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [products, setProduct] = useState([]);
    const [services, setServices] = useState([]);
    const [testimonies, setTestimonies] = useState([]);
    const [gallery, setGallery] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            return;
        } else {
            axios.get(`https://valbershop-api.vercel.app/v1/api/users`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(result => {
                setUserData(result.data.users);
            });
        }

        axios.get(`https://valbershop-api.vercel.app/v1/shop/get`)
        .then(async result => {
            const product = await result.data.shopData.filter(goods => {
                return goods.type.toLowerCase() === "product"
            });

            const service = await result.data.shopData.filter(goods => {
                return goods.type.toLowerCase() === "service"
            });

            setProduct(product);
            setServices(service);
        });

        axios.get(`https://valbershop-api.vercel.app/v1/gallery/get`)
        .then(async result => {
            const gallery = await result.data.gallery.map(galData => {
                return galData.photo;
            });

            setGallery(gallery.reduce((prev, curr) => {
                return prev.concat(curr);
            }, []));
        });

        axios.get(`https://valbershop-api.vercel.app/v1/testimony/get`)
        .then(result => {
            setTestimonies(result.data.testimonies);
        });
    }, [])

    return (
        <div className="flex flex-grow flex-col gap-5 lg:flex-row lg:p-10 text-white font-mono overflow-x-scroll lg:overflow-auto">
            <div className="w-full lg:w-2/3 2xl:w-1/2 h-[55vh] overflow-y-scroll">
                <table className="table-auto w-full text-2xl border-white border-separate text-center">
                    <thead>
                        <tr className="bg-[#d4af37]/90">
                            <th className="p-1">No.</th>
                            <th className="p-1">Name</th>
                            <th className="p-1">Email</th>
                            <th className="p-1">ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, i) => {
                            return  <tr key={user._id} className="bg-[#323232] text-lg">
                                        <td className="p-1">{i + 1}.</td>
                                        <td className="p-1">{user.name}</td>
                                        <td className="p-1">{user.email}</td>
                                        <td className="p-1">{user._id}</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="w-full lg:w-1/3 2xl:w-1/2 h-[55vh] flex flex-col md:grid md:grid-cols-2 gap-5">
                <DashboardCard name={"Products"} amount={products.length} handleClick={() => navigate('/admin/product')} />
                <DashboardCard name={"Services"} amount={services.length} handleClick={() => navigate('/admin/product')} />
                <DashboardCard name={"Gallery"} amount={gallery.length} handleClick={() => navigate('/admin/gallery')} />
                <DashboardCard name={"Testimonies"} amount={testimonies.length} handleClick={() => navigate('/admin/testimony')} />
            </div>
        </div>
    )
}
