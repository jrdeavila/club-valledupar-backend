import ApplicationLogo from "@/Components/ApplicationLogo";
import styled from "styled-components";
import ErrorLayout from "./ErrorLayout";

export default function Guest({ children }) {
    return (
        <ErrorLayout>
            <BackgroundContainerStyled className="select-none">
                <BackgroundStyled />
                <BlurredBackgroundStyled />
                <CenteredContainerStyled>{children}</CenteredContainerStyled>
                <AppLogoStyled />
                <BrandContainerStyled>
                    <p className="text-white font-bold text-4xl">
                        Club Social Valledupar
                    </p>
                    <p className="text-white text-xl">
                        Plataforma Administrativa
                    </p>
                </BrandContainerStyled>
            </BackgroundContainerStyled>
        </ErrorLayout>
    );
}

const BrandContainerStyled = styled.div`
    position: absolute;
    left: 140px;
    top: 20px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
`;

const AppLogoStyled = styled(ApplicationLogo)`
    position: absolute;
    width: 120px;
    height: 120px;

    top: 20px;
    left: 20px;
`;

export const BackgroundStyled = styled.div`
    background-image: url("/img/backgrounds/background-welcome.jpg");
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    position: absolute;
    filter: blur(5px);
    -webkit-filter: blur(5px);
`;

export const BlurredBackgroundStyled = styled.div`
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.15);
    position: absolute;
    width: 100%;
    height: 100%;
`;

export const BackgroundContainerStyled = styled.div`
    min-height: 100vh;
    position: relative;
`;

const CenteredContainerStyled = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;

    @media (max-width: 768px) {
        width: 90%;
    }

    & > * {
        margin: 0 auto;
    }
`;
