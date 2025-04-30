import { Outlet } from "react-router-dom";

import Footer from "./Footer.js";
import BackgroundImage from "../components/BackgroundImage.js";

function AppLayout() {
    return (
        <div className="font-inter bg-gray-100 dark:bg-[#161722] min-h-screen">
            <BackgroundImage />

            <main className="mx-auto px-5 sm:px-0">
                <Outlet /> {/* This is where child routes will be rendered */}
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
// bg-gray-100
