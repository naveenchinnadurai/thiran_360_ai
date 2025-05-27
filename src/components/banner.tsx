import bannerImg from "@/assets/banner.jpg";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <section className="w-full py-20 pt-32 px-6 text-center text-gray-900">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Text Content */}
                <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Elevate Your Shopping Experience
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-6">
                        Trendy fashion, electronics, and everyday essentials — all at one place with seamless mobile shopping.
                    </p>

                    <Link
                        to="/product"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors duration-300"
                    >
                        Shop Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>

                {/* Image Section */}
                <div className="flex justify-center">
                    <img
                        src={bannerImg}
                        alt="Mobile Shopping Banner"
                        className="rounded-xl w-full h-auto max-w-md object-contain drop-shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
