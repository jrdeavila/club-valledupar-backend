import AppDialog from "@/Components/AppDialog";
import { FloatingButton } from "@/Components/FloatingButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { AlertDeleting } from "./components/Alerts";
import FormHorario from "./components/FormHorario";
import InsumeItem from "./components/InsumeItem";

export default function Horarios({ auth, areas: { data: areas } }) {
    const [showForm, setShowForm] = useState(false);
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [currentHorario, setCurrentHorario] = useState(null);

    const handleOpenForm = ({ item }) => {
        setCurrentHorario(item);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setCurrentHorario(null);
        setShowForm(false);
    };

    const handleOnDelete = ({ item }) => {
        setShowAlertDelete(true);
        setCurrentHorario(item);
    };

    const handleOnCancelDelete = () => {
        setShowAlertDelete(false);
        setCurrentHorario(null);
    };

    const handleOnRequestDelete = () => {
        router.delete(route("horarios.destroy", { horario: currentHorario }), {
            onSuccess: () => {
                handleOnCancelDelete();
            },
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Insumos" />
            <div
                style={{
                    minHeight: "calc(100vh - 8rem)",
                }}
                className="p-5"
            >
                <div className="flex flex-row items-center justify-center gap-5 flex-wrap">
                    {areas.map((e, index) => (
                        <InsumeItem
                            key={index}
                            insume={e}
                            // TODO? : Implementara un metodo para actualizar el horario y para eliminarlo?
                            // onUpdate={() => handleOpenForm({ item: e })}
                            // onDelete={() => handleOnDelete({ item: e })}
                        />
                    ))}
                    {showForm ? (
                        <HorarioFormDialog
                            horario={currentHorario}
                            handleClose={handleCloseForm}
                        />
                    ) : undefined}
                    {showAlertDelete ? (
                        <AlertDeleting
                            onClose={handleOnCancelDelete}
                            onConfirm={handleOnRequestDelete}
                            title={buildTitle(currentHorario)}
                        />
                    ) : undefined}
                </div>
            </div>
        </Authenticated>
    );
}

const HorarioFormDialog = ({ handleClose, horario }) => {
    const handleOnClose = () => {
        handleClose();
    };
    return (
        <AppDialog
            onClose={handleOnClose}
            title={horario ? "Editar Insumo" : "Nuevo Insumo"}
        >
            <FormHorario onClose={handleOnClose} horario={horario} />
        </AppDialog>
    );
};
