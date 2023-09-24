import {
    faPencil,
    faTrash,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CartasContext } from "../contexts/Carta";
import PlatoItem from "./PlatoItem";

export default function CartaItem({ carta }) {
    const { onEditCarta, onDeleteCarta, isEditing, isDeleting, onEditPlato } =
        useContext(CartasContext);

    const handleOpenForm = () => {
        onEditPlato({
            carta,
        });
    };
    const handleOnUpdate = () => {
        onEditCarta({
            carta,
        });
    };

    const handleOnDelete = () => {
        onDeleteCarta({
            carta,
        });
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
                    <div className="flex gap-3">
                        <button
                            onClick={(() => {
                                if (isEditing) return;
                                if (isDeleting) return;
                                return handleOpenForm;
                            })()}
                            className="btn bg-primary flex  rounded-lg text-white w-10 h-10 justify-center items-center"
                        >
                            <FontAwesomeIcon
                                icon={(() => {
                                    if (isEditing) return faPencil;
                                    if (isDeleting) return faTrash;
                                    return faUtensils;
                                })()}
                            />
                        </button>
                    </div>
                </div>
            </div>{" "}
            <div className="px-5 gap-4 py-5 overflow-x-scroll no-scrollbar flex">
                {carta.platos &&
                    carta.platos.map((plato) => (
                        <PlatoItem plato={plato} carta={carta} key={plato.id} />
                    ))}
            </div>
        </>
    );
}
