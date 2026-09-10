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
import FeedPage from "../pages/feed/FeedPage.jsx";
import AppLayout from "../layouts/AppLayout.jsx";
import PostDetailPage from "../pages/post_detail/PostDetailPage.jsx";
import CreatePostPage from "../pages/create_post/CreatePostPage.jsx";

const Router = () => {
    return (
        <Routes>
            {/* Routes publiques */}
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

            {/* Routes authentifié */}
            <Route element={<AppLayout />}>
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/post/:id" element={<PostDetailPage />} />
                <Route path="/new-post" element={<CreatePostPage />} />
            </Route>
        </Routes>
    )
}
export default Router;