
function Footer() {
    return (
        <footer className="text-gray-700 py-2 px-6">
            {/* <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                <div>
                    <h4 className="text-xl font-bold mb-2">ShopMate</h4>
                    <p className="text-sm text-muted-foreground">
                        Your trusted platform for premium shopping experiences. Fashion, tech, and lifestyle, all in one place.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" className="hover:text-primary">Home</a></li>
                        <li><a href="#" className="hover:text-primary">Product</a></li>
                        <li><a href="#" className="hover:text-primary">About</a></li>
                    </ul>
                </div>
                <div className="flex flex-col space-y-1">
                    <h4 className="text-lg font-semibold mb-2">Contact</h4>
                    <p className="text-sm text-muted-foreground">Email: support@shopmate.com</p>
                    <p className="text-sm text-muted-foreground">Phone: +91 98765 43210</p>
                </div>
            </div> */}
            <div className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
