import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import InitialDataPage from "../pages/private/InitialDataPage";

// Páginas públicas
import HomePage from "../pages/public/HomePage";
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";

// Páginas privadas
import DashboardPage from "../pages/private/DashboardPage";
import ProfilePage from "../pages/private/ProfilePage";
import EditProfileForm from "../pages/private/EditProfileForm";
import ActivityHistory from "../pages/private/ActivityHistory";
import HealthData from "../pages/private/HealthData";
import Comunidad from "../pages/private/Comunidad";

import MainLayout from "../components/layout/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* TODO descomentar esta parte */}
        {/* <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}

        {/* Rutas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfileForm />} />
          <Route path="/profile/activity" element={<ActivityHistory />} />
          <Route path="/profile/health" element={<HealthData />} />
          <Route path="/comunidad" element={<Comunidad />} />
          <Route path="/initial-data" element={<InitialDataPage />} />
        </Route>

        {/* Ruta para manejar URLs no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
