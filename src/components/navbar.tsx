import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ViewCart from "./cart";

const navItems = [
    {
        name: "Home",
        to: "/"
    },
    {
        name: "Products",
        to: "/product"
    },
    {
        name: "About",
        to: "/about"
    }
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="absolute top-5 left-0 right-0 rounded-lg mx-auto w-11/12 bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] border-b border-gray-200 px-4 py-3 shadow-sm text-gray-900">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to='/' className="text-2xl font-extrabold text-primary">ShopMate</Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 ">
                    {
                        navItems.map((item) => (
                            <Link
                                to={item.to}
                                className="text-gray-600 hover:text-primary font-medium"
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                    <ViewCart />
                </div>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden mt-2 flex flex-col space-y-2">
                    {
                        navItems.map((item) => (
                            <Link
                                to={item.to}
                                className="text-gray-600 w-full text-left px-2 py-2 hover:text-primary"
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                </div>
            )}
        </nav>
    );
}
