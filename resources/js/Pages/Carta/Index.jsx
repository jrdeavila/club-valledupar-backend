import AppDialog from "@/Components/AppDialog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    faClose,
    faPencil,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import CartaItem from "./components/CartaItem";
import FormCarta from "./components/FormCarta";
import FormPlato from "./components/FormPlato";
import { CartasContext } from "./contexts/Carta";

export default function Carta({ auth, cartas: { data } }) {
    const [currentCarta, setCurrentCarta] = useState(null);
    const [currentPlato, setCurrentPlato] = useState(null);
    const [showFormCarta, setShowFormCarta] = useState(false);
    const [showFormPlato, setShowFormPlato] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isEditing) setIsDeleting(false);
        if (isDeleting) setIsEditing(false);
    }, [isEditing, isDeleting]);

    const handleOpenFormCarta = ({ carta }) => {
        setCurrentCarta(carta);
        setShowFormCarta(true);
    };

    const handleCloseFormCarta = () => {
        setCurrentCarta(null);
        setShowFormCarta(false);
    };

    const handleOpenFormPlato = ({ carta, plato }) => {
        setCurrentCarta(carta);
        setCurrentPlato(plato);
        setShowFormPlato(true);
    };

    const handleCloseFormPlato = () => {
        setCurrentCarta(null);
        setCurrentPlato(null);
        setShowFormPlato(false);
    };

    const handleOnEditing = () => {
        setIsEditing(true);
    };

    const handleOnDeleting = () => {
        setIsDeleting(true);
    };
    const handleOnCancel = () => {
        if (isEditing) setIsEditing(false);
        if (isDeleting) setIsDeleting(false);
    };

    const handleOnDelete = ({ carta, plato }) => {
        setCurrentCarta(carta);
        setCurrentPlato(plato);
    };

    const handleCloseDelete = () => {
        setCurrentCarta(null);
        setCurrentPlato(null);
    };

    const handleOnRequestDelete = () => {
        if (currentCarta && currentPlato) {
            router.delete(
                route("platos.destroy", {
                    carta: currentCarta,
                    plato: currentPlato,
                }),
                {
                    onSuccess: () => {
                        console.log("Plato Eliminado");
                    },
                }
            );
        } else {
            router.delete(
                route("cartas.destroy", {
                    carta: currentCarta,
                }),
                {
                    onSuccess: () => {
                        console.log("Carta Eliminada");
                    },
                }
            );
        }
        setCurrentCarta(null);
        setCurrentPlato(null);
    };
    const ActionButton = ({ icon, onClick }) => {
        return (
            <button
                onClick={onClick}
                className="btn bg-primary px-3 py-2 text-white rounded-lg text-xl"
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user} roles={auth.roles}>
            <CartasContext.Provider
                value={{
                    isEditing: isEditing,
                    isDeleting: isDeleting,

                    onEditCarta: handleOpenFormCarta,
                    onEditPlato: handleOpenFormPlato,

                    onDeleteCarta: handleOnDelete,
                    onDeletePlato: handleOnDelete,
                }}
            >
                <Head title="Cartas" />
                <div className="w-full h-20 bg-white bg-opacity-30 backdrop-blur-lg flex items-center justify-between px-5">
                    <div className="text-2xl text-white font-bold">
                        Control de Cartas
                    </div>
                    <div className="  flex items-center gap-2">
                        {isEditing || isDeleting ? (
                            <ActionButton
                                icon={faClose}
                                onClick={handleOnCancel}
                            />
                        ) : (
                            <>
                                <ActionButton
                                    icon={faPlus}
                                    onClick={handleOpenFormCarta}
                                />
                                <ActionButton
                                    icon={faPencil}
                                    onClick={handleOnEditing}
                                />
                                <ActionButton
                                    icon={faTrash}
                                    onClick={handleOnDeleting}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className="py-12">
                    <div className="flex flex-col">
                        {data.map((carta) => (
                            <CartaItem key={carta.id} carta={carta} />
                        ))}
                    </div>
                </div>

                {showFormCarta && (
                    <FormCarta
                        onClose={handleCloseFormCarta}
                        carta={currentCarta}
                    />
                )}

                {showFormPlato && (
                    <FormPlato
                        onClose={handleCloseFormPlato}
                        to={currentCarta}
                        plato={currentPlato}
                    />
                )}

                {isDeleting && currentCarta && !currentPlato && (
                    <AlertDeleting
                        onClose={handleCloseDelete}
                        onConfirm={handleOnRequestDelete}
                        title={currentCarta.nombre}
                        isDeletingCarta
                    />
                )}
                {isDeleting && currentCarta && currentPlato && (
                    <AlertDeleting
                        onClose={handleCloseDelete}
                        onConfirm={handleOnRequestDelete}
                        title={currentPlato.nombre}
                    />
                )}
            </CartasContext.Provider>
        </AuthenticatedLayout>
    );
}

const AlertDeleting = ({
    onClose,
    onConfirm,
    title,
    isDeletingCarta = false,
}) => {
    return (
        <AppDialog onClose={onClose} title={`Eliminar ${title}`}>
            <div className="flex flex-col">
                <div className="text-xl">
                    {isDeletingCarta
                        ? "¿Deseas eliminar esta carta del menu?"
                        : "¿Deseas eliminar este plato de la carta?"}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="btn bg-white text-indigo-500 border-2 border-indigo-500 px-4 py-2 rounded-lg text-xl w-full"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn bg-indigo-500 text-white px-4 py-2 rounded-lg text-xl ml-3 w-full"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </AppDialog>
    );
};
