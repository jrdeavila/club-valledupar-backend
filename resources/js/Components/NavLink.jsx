import { Link } from "@inertiajs/react";
import styled from "styled-components";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <div className="flex flex-col justify-start items-center">
            <LinkStyled {...props}>{children}</LinkStyled>
            {active && <ActiveDot />}
        </div>
    );
}

const ActiveDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 0.5rem;
`;

const LinkStyled = styled(Link)`
    margin-right: 0.75rem;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
`;
