import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { dashboardItems } from "@/Pages/Dashboard/Models/DashboardItem";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ErrorLayout from "./ErrorLayout";
import { BackgroundContainerStyled, BackgroundStyled } from "./GuestLayout";
import styled from "styled-components";

export default function Authenticated({ user, header, children }) {
    return (
        <ErrorLayout>
            <BackgroundContainerStyled className="select-none">
                <BackgroundStyled />
                <NavigationStyled user={user} />
                <main>{children}</main>
            </BackgroundContainerStyled>
        </ErrorLayout>
    );
}

const NavigationStyled = ({ user }) => {
    return (
        <NavStickyStyled>
            <ColoredNavBgStyled />
            <BlurredNavBgStyled />
            <NavContentStyled>
                <ApplicationLogoStyled />
                <div className="hidden md:flex">
                    {dashboardItems.map((item, index) => (
                        <NavLink
                            key={index}
                            href={item.route ? route(item.route) : "#"}
                            active={
                                item.route ? route().current(item.route) : false
                            }
                        >
                            {item.title}
                        </NavLink>
                    ))}
                </div>
                <div className="hidden md:flex sm:items-center sm:ml-6">
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center  border-transparent text-sm leading-4 font-bold rounded-md text-white hover:scale-105 focus:outline-none transition ease-in-out duration-150 me-10"
                                    >
                                        {`${user.firstname} ${user.lastname}`}

                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content contentClasses="bg-white bg-opacity-25 backdrop backdrop-blur-lg z-50">
                                <Dropdown.Link
                                    href={route("profile.edit")}
                                    className="text-white hover:bg-opacity-5 hover:rounded-md font-bold"
                                >
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="text-white hover:bg-opacity-5 hover:rounded-md font-bold"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </NavContentStyled>
        </NavStickyStyled>
    );
};

const NavigationBar = ({ user }) => {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogoStyled />
                            </Link>
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState
                                )
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? "block" : "hidden") +
                    " sm:hidden"
                }
            >
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                </div>

                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="px-4">
                        <div className="font-medium text-base text-gray-800">
                            {user.name}
                        </div>
                        <div className="font-medium text-sm text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route("logout")}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const BlurredNavBgStyled = styled.div`
    filter: blur(10px);
    -webkit-filter: blur(10px);
    width: 100%;
    height: 100%;
`;

const ColoredNavBgStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.3);
    width: 100%;
    height: 100%;
    border-radius: inherit;
`;

const NavContentStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0px 20px 0px;
    border-radius: inherit;
`;

const NavStickyStyled = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: start;
    align-items: center;
`;

const ApplicationLogoStyled = styled(ApplicationLogo)`
    width: 80px;
    height: 80px;
`;
