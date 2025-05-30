import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/store";
import { productsData } from "@/lib/products";
import { useState } from "react";
import Toast from "@/components/toast"; // ✅ Import your custom Toast
import { count } from "console";

const ITEMS_PER_PAGE = 8;

type cartItems = {
    id: number;
    name: string;
    price: string;
    image: string;
    count?: number
}

export default function Product() {
    const { addToCart, cartItems } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [toastMessage, setToastMessage] = useState<string | null>(null); // ✅ state for toast

    const filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleAddToCart = (item: cartItems) => {
        const newCartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            count: 1
        };
        addToCart(newCartItem);
        setToastMessage(`"${newCartItem.name}" added to cart.`);

    };

    return (
        <section className="py-16 pt-32 px-6 text-gray-900 bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold mb-6 text-center">Explore Our Products</h2>

                <div className="mb-10 flex justify-center">
                    <Input
                        type="text"
                        placeholder="Search for a product..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full max-w-xl rounded-full px-6 py-6 text-lg shadow-sm"
                    />
                </div>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => {
                            const isInCart = cartItems.some((item) => item.id === product.id);

                            return (
                                <div
                                    key={product.id}
                                    className="bg-white rounded-2xl shadow-lg p-4 flex flex-col justify-between"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover bg-slate-200 rounded-lg"
                                    />
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-xl mb-1 truncate">{product.name}</h3>
                                        <p className="text-primary text-lg font-bold mb-4">{product.price}</p>
                                        <div className="flex gap-2">
                                            <Button
                                                className={isInCart ? "w-full" : "w-1/2"}
                                                variant="outline"
                                                disabled={isInCart}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                {isInCart ? "Added to cart" : "Add to Cart"}
                                            </Button>
                                            {
                                                !isInCart && (
                                                    <Button className="w-1/2" variant="default">
                                                        Buy
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center col-span-full text-muted-foreground text-lg">No products found.</p>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                className="px-4 py-2 text-sm"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* ✅ Show Toast if message exists */}
            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            )}
        </section>
    );
}
