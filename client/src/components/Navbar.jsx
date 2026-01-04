
import { Link } from "react-router-dom"
import BBIcon from "../assets/BB_Icon.png"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { MessageCircleHeart } from 'lucide-react';


const navLinks = [
    { name: "Login", url: "/login", },
]
export default function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function logoutHandler() {
        dispatch(logout());
    }

    return (
        <nav className="bg-white/80 rounded-xl mx-auto px-2 md:px-4 py-2 my-2 flex justify-between items-center transition-all duration-200">
            <Link to="/">
                <img src={BBIcon} className="w-7 h-7 md:w-9 md:h-[30.57px] text-sm md:text-xl" alt="logo" />
            </Link>
            <div className="flex gap-6">
                {
                    !isAuthenticated ? navLinks.map((link) => (
                        <Link key={link.url} to={link.url} className="text-sm md:text-base">
                            {link.name}
                        </Link>
                    )) :
                        (
                            <div className="flex gap-4 items-center">
                                <Link to={"/favorites"}>
                                    <MessageCircleHeart
                                        className="w-7 h-7 md:w-9 md:h-[28.57px] text-slate-400 hover:text-pink-500 transition-all duration-200 hover:scale-110"
                                    />
                                </Link>
                                <button onClick={logoutHandler} className="text-xs md:text-sm px-2 md:px-4 py-1 bg-red-600 text-white rounded-4xl cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        )
                }
            </div>
        </nav>
    )
}