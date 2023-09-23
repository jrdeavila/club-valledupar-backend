import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import PlatoItem from "./PlatoItem";
import { CartasContext } from "../contexts/Carta";

export default function CartaItem({ carta }) {
    const { onEditCarta, onDeleteCarta, isEditing, isDeleting, onEditPlato } =
        useContext(CartasContext);

    const handleOpenForm = () => {
        onEditPlato({
            carta,
        });
    };
    const handleOnUpdate = () => {
        onEditCarta(carta);
    };

    const handleOnDelete = () => {
        onDeleteCarta(carta);
    };

    const handleAction = () => {
        if (isEditing) handleOnUpdate();
        if (isDeleting) handleOnDelete();
        return;
    };

    return (
        <>
            <div
                onClick={handleAction}
                className="w-full p-4 bg-white mb-3 select-none"
            >
                <div className="flex justify-between  items-center">
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl">{carta.nombre}</p>
                        <p className="text-md text-gray-400 hidden lg:block">
                            {carta.descripcion}
                        </p>
                    </div>
                    {!isDeleting && !isEditing && (
                        <div className="flex gap-3">
                            <button
                                onClick={handleOpenForm}
                                className="btn bg-indigo-500 flex  rounded-lg text-white w-10 h-10 justify-center items-center"
                            >
                                <FontAwesomeIcon icon={faUtensils} />
                            </button>
                        </div>
                    )}
                </div>
            </div>{" "}
            <div className="px-5 flex gap-4 py-5 overflow-x-scroll scroll-m-0">
                {carta.platos &&
                    carta.platos.map((plato) => (
                        <PlatoItem plato={plato} carta={carta} key={plato.id} />
                    ))}
            </div>
        </>
    );
}
