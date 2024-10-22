export const NavBar = () => {
    return (
        <div className="bg-slate-800 p-5 border-b">
            <div className="flex justify-between items-center">
                <h2 className="text-white font-bold text-3xl">ECOMMERCE</h2>

                <nav className="hidden md:flex space-x-4 text-lg">
                    <span className="text-white text-lg font-semibold">
                        Welcome Admin!
                    </span>
                </nav>
            </div>
        </div>
    );
};
