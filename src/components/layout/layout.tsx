import { NavBar } from '@/components/navigation/navbar';
import { SideBar } from '@/components/navigation/sidebar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (
        <div className="flex">
            <SideBar />

            <div className="flex-grow">
                <NavBar />

                <main className="p-5">
                    <Outlet />{' '}
                </main>
            </div>
        </div>
    );
};
