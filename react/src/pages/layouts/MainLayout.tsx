import { Outlet } from "react-router-dom";
import GrediantBg from "../../Ui/GrediantBg";
import Content from "../../Ui/Content";
import Container from "../../Ui/Container";

import Sidebar from "../../features/Sidebar/Slidebar";
import AppTopBar from "../../features/AppTopBar/AppTopBar";
import Footer from "../../features/Footer/Footer";

function MainLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-[320px] w-full bg-white flex flex-col min-h-screen relative">
                <GrediantBg />
                <AppTopBar />

                <main className="relative z-10 p-6 flex-1 overflow-y-auto">
                    <Container>
                        <Content>
                            <Outlet />
                        </Content>
                    </Container>
                </main>

                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
