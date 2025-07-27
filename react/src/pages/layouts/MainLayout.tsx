import { Outlet } from "react-router-dom";

import GrediantBg from "../../Ui/GrediantBg";
import AppTopBar from "../../Ui/AppTopBar";
import Content from "../../Ui/Content";
import Container from "../../Ui/Container";
import Footer from "../../Ui/Footer";
import Sidebar from "../../features/Sidebar/Slidebar";

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
