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
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import PublicProfilePage from "../pages/public_profile/PublicProfilePage.jsx";
import EditProfilePage from "../pages/edit_profil/EditProfilPage.jsx";
import SettingsPage from "../pages/settings/SettingsPage.jsx";
import MyEquipmentPage from "../pages/my_equipment/MyEquipmentPage.jsx";
import MyPlacesPage from "../pages/my_places/MyPlacesPage.jsx";
import NewPlacePage from "../pages/new_place/NewPlacePage.jsx";
import NewEquipmentPage from "../pages/new_equipment/NewEquipmentPage.jsx";
import SetPage from "../pages/set_page/SetPage.jsx";
import ReviewReportPage from "../pages/review_report/ReviewReportPage.jsx";
import ReportsQueuePage from "../pages/reports_queue/ReportsQueuePage.jsx";

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
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:username" element={<PublicProfilePage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/my-equipment" element={<MyEquipmentPage />} />
                <Route path="/my-equipment/new" element={<NewEquipmentPage />} />
                <Route path="/my-equipment/:id/edit" element={<NewEquipmentPage />} />
                <Route path="/my-equipment/sets/new" element={<SetPage />} />
                <Route path="/my-equipment/sets/:id/edit" element={<SetPage />} />
                <Route path="/my-places" element={<MyPlacesPage />} />
                <Route path="/my-places/new" element={<NewPlacePage />} />
                <Route path="/my-places/:id/edit" element={<NewPlacePage />} />
                <Route path="/moderation" element={<ReportsQueuePage />} />
                <Route path="/moderation/:id" element={<ReviewReportPage />} />
            </Route>
        </Routes>
    )
}
export default Router;