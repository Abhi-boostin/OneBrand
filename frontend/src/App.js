import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Popup from "./Components/PopupBanner/Popup";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/Authentication/ProtectedRoute";
import CartSync from "./Components/ShoppingCart/CartSync";
import CartHydration from "./Components/ShoppingCart/CartHydration";
import { AuthProvider } from "./Components/Authentication/AuthContext";

const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Shop = lazy(() => import("./Pages/Shop"));
const Contact = lazy(() => import("./Pages/Contact"));
const Blog = lazy(() => import("./Pages/Blog"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Authentication = lazy(() => import("./Pages/Authentication"));
const ResetPass = lazy(() => import("./Components/Authentication/Reset/ResetPass"));
const BlogDetails = lazy(() => import("./Components/Blog/BlogDetails/BlogDetails"));
const TermsConditions = lazy(() => import("./Pages/TermsConditions"));
const ShoppingCart = lazy(() => import("./Components/ShoppingCart/ShoppingCart"));
const Profile = lazy(() => import("./Components/Authentication/Profile"));

const App = () => {
  return (
    <AuthProvider>
      <Popup />
      <CartHydration />
      <CartSync />
      <ScrollToTop />
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
          <Routes>
            <Route
              path="/loginSignUp"
              element={<Authentication />}
            />
            <Route path="/resetPassword" element={<ResetPass />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/BlogDetails" element={<BlogDetails />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shop"
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/terms"
              element={
                <ProtectedRoute>
                  <TermsConditions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <ShoppingCart />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
