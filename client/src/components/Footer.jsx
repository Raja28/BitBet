
import { Mail, MapPin, Phone } from "lucide-react";

import BBLogoIcon from "../assets/BB_logo.png"

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/80 rounded-xl my-4">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Column 1: Brand & About */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {/* GAME<span className="text-blue-500">ZONE</span> */}
                            <img src={BBLogoIcon} alt="Brand Logo" className="md:w-20 md:h-18 h-12 w-12" />
                        </h2>
                        <p className="text-sm leading-relaxed opacity-80">
                            The ultimate destination for live sports tracking, match schedules, and fan favorites. Stay updated with your favorite teams anywhere, anytime.
                        </p>
                        {/* <div className="flex gap-4 pt-2">
                            <a href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-red-500 transition-colors"><YoutubeIcon size={20} /></a>
                        </div> */}
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 uppercase text-sm tracking-wider">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Live Matches</a></li>
                            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Schedules</a></li>
                            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Favorites</a></li>
                            <li><a href="#" className="hover:text-blue-500 hover:translate-x-1 transition-all inline-block">Top Leagues</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-6 uppercase text-sm tracking-wider">Support</h3>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Cookie Settings</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-white font-semibold mb-6 uppercase text-sm tracking-wider">Contact Us</h3>
                        <div className="flex items-start gap-3 text-sm">
                            <MapPin size={18} className="text-blue-500 shrink-0" />
                            <span>123 Sports Arena, Digital City, ST 54321</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone size={18} className="text-blue-500 shrink-0" />
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Mail size={18} className="text-blue-500 shrink-0" />
                            <span>support@bitbet.com</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
                    <p>© {currentYear} BitBet Media. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline">Security</a>
                        <a href="#" className="hover:underline">Sitemap</a>
                        <a href="#" className="hover:underline">Feedback</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;