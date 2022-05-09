import Menu from './Menu';
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";


function Layout() {
    return (
        <>
            <Menu></Menu>
            <Container>
                <Outlet></Outlet>
            </Container>
        </>);
}

export default Layout;