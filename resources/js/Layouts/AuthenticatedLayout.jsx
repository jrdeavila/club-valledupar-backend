import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { dashboardItems } from "@/Pages/Dashboard/Models/DashboardItem";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ErrorLayout from "./ErrorLayout";
import { BackgroundContainerStyled, BackgroundStyled } from "./GuestLayout";

export default function Authenticated({ user, children }) {
    return (
        <ErrorLayout>
            <BackgroundContainerStyled className="select-none">
                <BackgroundStyled />
                <NavigationStyled user={user} />
                <ContentStyled>{children}</ContentStyled>
            </BackgroundContainerStyled>
        </ErrorLayout>
    );
}

const NavigationStyled = ({ user }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const styles = `transform trasition-transform duration-300 ${
        isScrolled ? "bg-white bg-opacity-30 backdrop backdrop-blur-lg" : ""
    }`;
    return (
        <NavStickyStyled className={styles}>
            <NavContentStyled>
                <div className="flex items-center">
                    <ApplicationLogoStyled />
                    <div className="md:hidden flex flex-col">
                        <div className=" text-white text-3xl font-bold">
                            Club Social Valledupar
                        </div>
                        <div className="text-white">{user.email}</div>
                    </div>
                </div>
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

const ContentStyled = styled.div`
    min-height: calc(100vh - 150px);
    width: 100%;
    position: relative;
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

const NavStickyStyled = styled.nav`
    position: sticky;
    top: 0;
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: start;
    align-items: center;
    z-index: 100;
`;

const ApplicationLogoStyled = styled(ApplicationLogo)`
    width: 80px;
    height: 80px;
`;
