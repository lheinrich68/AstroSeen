import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage.jsx';
import CGU_Page from "../pages/cgu/CGUPage.jsx";
import Confidentiality from "../pages/confidencialite/ConfidencialitePage.jsx";
import Contact from "../pages/contact/ContactPage.jsx";
import LoginPage from '../pages/login/LoginPage.jsx';
import RegisterPage from '../pages/register/RegisterPage.jsx';
import VerifyEmailPage from "../pages/verify_mail/VerifyEmailPage.jsx";
import ForgotPasswordPage from "../pages/forgot_password/ForgotPasswordPage.jsx";
import VerifResetPage from "../pages/verif_reset/VerifResetPage.jsx";
import NewPasswordPage from "../pages/new_password/NewPasswordPage.jsx";
import VerifAccountPage from "../pages/activation_compte/VerifAccountPage.jsx";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage /> }/>
            <Route path="/cgu" element={ <CGU_Page /> }/>
            <Route path="/confidentialite" element={ <Confidentiality /> }/>
            <Route path="/contact" element={ <Contact /> }/>
            <Route path="/login" element={ <LoginPage /> }/>
            <Route path="/register" element={ <RegisterPage /> }/>
            <Route path="/verification-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verification-reset" element={<VerifResetPage />} />
            <Route path="/reset-password" element={<NewPasswordPage />} />
            <Route path="/enable-account" element={<VerifAccountPage />} />
        </Routes>
    )
}
export default Router;