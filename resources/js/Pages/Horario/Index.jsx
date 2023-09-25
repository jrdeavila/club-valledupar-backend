import AppDialog from "@/Components/AppDialog";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import FormHorario from "./components/FormHorario";
import { router } from "@inertiajs/react";

export default function Horarios({ auth, horarios: { data } }) {
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
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <div className="font-semibold text-xl text-gray-800 leading-tight">
                        Horarios
                    </div>
                    <button
                        onClick={handleOpenForm}
                        className="bg-primary px-3 py-2 rounded-lg text-white font-semibold transition duration-300 transform hover:scale-105 select-none"
                    >
                        Agregar Horario
                    </button>
                </div>
            }
        >
            <Head title="Horarios" />
            <div className="m-5">
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    {data.map((e, index) => (
                        <HorarioItem
                            key={index}
                            horario={e}
                            onUpdate={() => handleOpenForm({ item: e })}
                            onDelete={() => handleOnDelete({ item: e })}
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
            title={horario ? "Editar Horario" : "Nuevo Horario"}
        >
            <FormHorario onClose={handleOnClose} horario={horario} />
        </AppDialog>
    );
};
const buildTitle = (horario) => {
    return `De ${horario.fecha_apertura} hasta ${horario.fecha_cierre}`;
};

const HorarioItem = ({ horario, onUpdate, onDelete }) => {
    return (
        <div
            style={{
                minHeight: "15rem",
            }}
            className="relative group bg-white rounded-lg shadow-lg p-5 w-full md:w-1/3 lg:w-1/4 select-none transition duration-300 transform hover:scale-105"
        >
            <div onClick={onUpdate}>
                <div className="flex flex-col gap-y-3">
                    <div className="text-2xl">{buildTitle(horario)}</div>
                    <div className="flex flex-row flex-wrap gap-1">
                        <div className="text text-gray-400">
                            {"Días de atención: "}
                        </div>
                        {Object.keys(horario.dias)
                            .filter((e) => !!horario.dias[e])
                            .map((e, index) => {
                                return (
                                    <div
                                        className="text"
                                        key={index}
                                    >{`${TextCapitalize(e)},`}</div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div
                onClick={onDelete}
                className="absolute z-0 bottom-5 right-5 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-primary text-2xl"
                />
            </div>
        </div>
    );
};

const AlertDeleting = ({ onClose, onConfirm, title }) => {
    return (
        <AppDialog onClose={onClose} title={`Eliminar Horario ${title}`}>
            <div className="flex flex-col">
                <div className="text-xl">
                    {"¿Deseas eliminar este horario?"}
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="btn bg-white text-primary border-2 border-primary px-4 py-2 rounded-lg text-xl w-full"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn bg-primary text-white px-4 py-2 rounded-lg text-xl ml-3 w-full"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </AppDialog>
    );
};
