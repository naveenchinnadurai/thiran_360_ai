import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/store";
import { productsData } from "@/lib/products";
import { useState } from "react";

const ITEMS_PER_PAGE = 8;

export default function Product() {

    const { addToCart } = useCart();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

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
                        className="w-full max-w-xl rounded-full px-6 py-6 text-lg shadow-sm focus:ring-2 focus:ring-primary"
                    />
                </div>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover bg-slate-200 rounded-lg"
                                    />
                                    <div className="mt-4">
                                        <h3 className="font-semibold text-xl mb-1 truncate" title={product.name}>{product.name}</h3>
                                        <p className="text-primary text-lg font-bold mb-4">{product.price}</p>
                                        <div className="flex gap-2">
                                            <Button className="w-1/2" variant="outline" onClick={() => addToCart(product.id)}>
                                                Add to Cart
                                            </Button>
                                            <Button className="w-1/2" variant="default">
                                                Buy
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-full text-muted-foreground text-lg">No products found.</p>
                        )
                    }
                </div>
                {
                    totalPages > 1 && (
                        <div className="mt-12 flex justify-center space-x-2">
                            {
                                Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === currentPage ? "default" : "outline"}
                                        className="px-4 py-2 text-sm"
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Button>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </section>
    );
}
