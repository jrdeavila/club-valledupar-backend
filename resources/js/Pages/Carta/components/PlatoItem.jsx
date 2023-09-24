import TextCurrency from "@/Components/TextCurrency";
import { useContext } from "react";
import { styled } from "styled-components";
import { CartasContext } from "../contexts/Carta";

const PlatoItem = ({ plato, carta }) => {
    const formatedURL = plato.imagen.replace(" ", "%20");
    // 16 rem = SM, 20 rem = MD, 24 rem = LG
    const { onEditPlato, onDeletePlato, isDeleting, isEditing } =
        useContext(CartasContext);

    const handleOnUpdate = () => {
        onEditPlato({
            carta: carta,
            plato: plato,
        });
    };

    const handleOnDelete = () => {
        onDeletePlato({
            carta: carta,
            plato: plato,
        });
    };

    const handleOnAction = () => {
        if (isEditing) return handleOnUpdate();
        if (isDeleting) return handleOnDelete();
        window.location = route("platos.show", {
            carta: carta,
            plato: plato,
        });
    };
    return (
        <DivResponsiveStyled
            onClick={handleOnAction}
            className="bg-white shadow-lg rounded-lg w-full h-full select-none transition duration-500 transform hover:scale-105"
        >
            <div
                style={{
                    backgroundImage: `url(${formatedURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "12rem",
                }}
                className="rounded-t-lg"
            ></div>

            <div
                style={{
                    minHeight: "10rem",
                }}
                className="p-4 flex flex-col h justify-between"
            >
                <div>
                    <p className="text-xl">{plato.nombre}</p>
                </div>
                <div>
                    <p className="text-sm">{plato.descripcion}</p>
                </div>
                <div className="flex justify-between">
                    <TextCurrency value={plato.precio} readOnly />
                    <div
                        className={`${
                            plato.disponibilidad
                                ? "bg-green-300"
                                : "bg-red-300 text-white"
                        } px-3 items-center flex rounded-lg`}
                    >
                        <div className="text">
                            {plato.disponibilidad
                                ? "Disponible"
                                : "No Disponible"}
                        </div>
                    </div>
                </div>
            </div>
        </DivResponsiveStyled>
    );
};

const DivResponsiveStyled = styled.div`
    min-width: 20rem;
    max-width: 20rem;
    min-height: 22rem;
    max-height: 22rem;

    @media (min-width: 768px) {
        min-width: 24rem;
        max-width: 24rem;
    }
`;

export default PlatoItem;
