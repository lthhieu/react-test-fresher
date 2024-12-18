import App from "@/App";
import BookManagePage from "@/pages/admin/book";
import DashboardPage from "@/pages/admin/dashboard";
import UserManagePage from "@/pages/admin/user";
import AdminWrapper from "@/pages/auth/admin.wrapper";
import PrivateWrapper from "@/pages/auth/private.wrapper";
import AboutPage from "@/pages/client/about";
import LoginPage from "@/pages/client/auth/login";
import RegisterPage from "@/pages/client/auth/register";
import BookPage from "@/pages/client/book";
import CheckoutPage from "@/pages/client/checkout";
import HomePage from "@/pages/client/home";
import LayoutAdmin from "@/pages/layout/layout.admin";
import LayoutClient from "@/pages/layout/layout.client";
import NotFound from "@/pages/not.found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: LayoutClient,
        ErrorBoundary: NotFound,
        children: [
            { index: true, Component: HomePage },
            { path: "books", Component: BookPage, },
            { path: "about", Component: AboutPage, },
            {
                Component: PrivateWrapper, children: [
                    { path: "checkout", Component: CheckoutPage, }
                ]
            }
        ],
    },
    {
        path: "/admin",
        Component: LayoutAdmin,
        ErrorBoundary: NotFound,
        children: [{
            Component: AdminWrapper, children: [
                { index: true, Component: DashboardPage },
                { path: "books", Component: BookManagePage, },
                { path: "users", Component: UserManagePage, },
            ]
        }],
    },
    { path: "/login", Component: LoginPage, },
    { path: "/register", Component: RegisterPage, },
]);