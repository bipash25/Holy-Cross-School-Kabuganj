import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import CustomLoadingScreen from "@/components/layout/CustomLoadingScreen";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import NotFoundPage from "@/components/layout/NotFoundPage";

// Lazy-loaded components
const Home = lazy(() => import("@/components/home"));

// Placeholder for future pages
const About = lazy(() => import("@/pages/about"));
const Academics = lazy(() => import("@/pages/academics"));
const Admissions = lazy(() => import("@/pages/admissions"));
const Contact = lazy(() => import("@/pages/contact"));
const News = lazy(() => import("@/pages/news"));

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<CustomLoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* These routes will be implemented later */}
          <Route path="/about/*" element={<About />} />
          <Route path="/academics/*" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news-events/*" element={<News />} />

          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
