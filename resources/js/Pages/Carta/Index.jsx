import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    faClose,
    faPencil,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import FormCarta from "./components/FormCarta";
import CartaItem from "./components/CartaItem";
import { CartasContext } from "./contexts/Carta";
import FormPlato from "./components/FormPlato";

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

    const handleOpenFormCarta = (carta) => {
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

    const ActionButton = ({ icon, onClick }) => {
        return (
            <button
                onClick={onClick}
                className="btn bg-indigo-500 px-3 py-2 text-white rounded-lg text-xl"
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <CartasContext.Provider
                value={{
                    isEditing: isEditing,
                    isDeleting: isDeleting,

                    onEditCarta: handleOpenFormCarta,
                    onEditPlato: handleOpenFormPlato,
                }}
            >
                <Head title="Cartas" />
                <div className="w-full h-20 bg-white flex items-center justify-between px-5">
                    <div className="text-2xl">Control de Cartas</div>
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
            </CartasContext.Provider>
        </AuthenticatedLayout>
    );
}
