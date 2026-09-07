import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home_page/HomePage.jsx';
import CGU_Page from "../pages/cgu/CGU.jsx";
import Confidenciality from "../pages/confidencialite/Confidencialite.jsx";
import Contact from "../pages/contact/Contact.jsx";
import LoginPage from '../pages/login/LoginPage.jsx';
import RegisterPage from '../pages/register/RegisterPage.jsx';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage /> }/>
            <Route path="/cgu" element={ <CGU_Page /> }/>
            <Route path="/confidentialite" element={ <Confidenciality /> }/>
            <Route path="/contact" element={ <Contact /> }/>
            <Route path="/login" element={ <LoginPage /> }/>
            <Route path="/register" element={ <RegisterPage /> }/>
        </Routes>
    )
}
export default Router;