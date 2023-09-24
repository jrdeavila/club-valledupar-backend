import TextCurrency from "@/Components/TextCurrency";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { faEye, faEyeSlash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function PlatoDetails({ auth, plato: { data }, carta }) {
    const [plato, setPlato] = useState(data);
    const formatedURL = plato.imagen.replace(" ", "%20");

    const handleToggleDisp = () => {
        let routeName = route("platos.toggle-disp", {
            carta: carta,
            plato: plato,
        });
        router.put(
            routeName,
            {
                disponibilidad: !plato.disponibilidad,
            },
            {
                onSuccess: () => {
                    setPlato({
                        ...plato,
                        disponibilidad: !plato.disponibilidad,
                    });
                },
                onError: (err) => console.error(err),
            }
        );
    };

    const handleOnEdit = () => {};

    const ActionButton = ({ title, icon, onClick }) => {
        return (
            <button
                onClick={onClick}
                className={`btn bg-primary px-3 py-2 rounded-lg text-white w-full md:w-auto`}
            >
                <div className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={icon} />
                    <div>{title}</div>
                </div>
            </button>
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row gap-3">
                    <div
                        style={{
                            backgroundImage: `url(${formatedURL})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        className="rounded-lg w-full h-64 md:w-48 md:h-48"
                    ></div>
                    <div className="flex flex-col">
                        <div className="font-semibold text-3xl text-gray-800 leading-tight">
                            {plato.nombre}
                        </div>
                        <div className="text text-gray-500">
                            {plato.descripcion}
                        </div>

                        <div className="mt-3 flex gap-3 items-center justify-between md:justify-normal">
                            <div className="text-gray-500">Precio:</div>
                            <TextCurrency value={plato.precio} readOnly />
                        </div>
                        <div className="mt-3 flex gap-3 items-center justify-between md:justify-normal">
                            <div className="text-gray-500">Disponibilidad:</div>
                            <div
                                className={`${
                                    plato.disponibilidad
                                        ? "bg-green-300"
                                        : "bg-red-300 text-white"
                                } px-4 py-1 items-center flex rounded-lg`}
                            >
                                <div className="text">
                                    {plato.disponibilidad
                                        ? "Disponible"
                                        : "No Disponible"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={plato.nombre} />
            <div className="p-4  bg-white mt-2 flex flex-col">
                <div className="text-xl mb-3 text-gray-400">ACCIONES</div>
                <div className="flex flex-wrap gap-3">
                    {plato.disponibilidad ? (
                        <ActionButton
                            title="Marcar como no disponible"
                            icon={faEyeSlash}
                            onClick={handleToggleDisp}
                        />
                    ) : (
                        <ActionButton
                            title="Marcar como disponible"
                            icon={faEye}
                            onClick={handleToggleDisp}
                        />
                    )}
                    <ActionButton
                        title="Editar Plato"
                        icon={faPencil}
                        onClick={handleOnEdit}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
