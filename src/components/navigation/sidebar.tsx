import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export const SideBar = () => {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? 'font-semibold bg-white text-gray-700 rounded-md'
            : 'text-white font-semibold';

    return (
        <div className="bg-slate-900 w-64 h-screen p-5">
            <nav className="flex flex-col space-y-4">
                <NavLink to={'/'}>
                    <ShoppingCart size={40} className="text-white mb-10 " />
                </NavLink>
                <NavLink to="/" className={linkClasses}>
                    <Button variant="ghost" className="w-full justify-start">
                        Dashboard
                    </Button>
                </NavLink>
                <NavLink to="/categories" className={linkClasses}>
                    <Button variant="ghost" className="w-full justify-start">
                        Categories
                    </Button>
                </NavLink>
                <NavLink to="/products" className={linkClasses}>
                    <Button variant="ghost" className="w-full justify-start">
                        Products
                    </Button>
                </NavLink>
                <NavLink to="/orders" className={linkClasses}>
                    <Button variant="ghost" className="w-full justify-start">
                        Orders
                    </Button>
                </NavLink>
                <NavLink to="/settings" className={linkClasses}>
                    <Button variant="ghost" className="w-full justify-start">
                        Settings
                    </Button>
                </NavLink>
            </nav>
        </div>
    );
};
