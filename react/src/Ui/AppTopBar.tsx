import Container from "./Container";
import DateAndTime from "../Ui/DateAndTime";
import NotificationBar from "./NotificationBar";

function AppTopBar() {
    return (
        <div className="border-b border-b-disabledBorderGray border-opacity-25 relative w-full z-10">
            <Container>
                <div className="flex items-center justify-between py-3.5">
                    <DateAndTime />
                    <NotificationBar />
                </div>
            </Container>
        </div>
    );
}

export default AppTopBar;
