import App from "@/App";
import AboutPage from "@/pages/client/about";
import LoginPage from "@/pages/client/auth/login";
import RegisterPage from "@/pages/client/auth/register";
import BookPage from "@/pages/client/book";
import HomePage from "@/pages/client/home";
import NotFound from "@/pages/not.found";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        ErrorBoundary: NotFound,
        children: [
            { index: true, Component: HomePage },
            { path: "books", Component: BookPage, },
            { path: "about", Component: AboutPage, },],
    },
    { path: "/login", Component: LoginPage, },
    { path: "/register", Component: RegisterPage, },
]);