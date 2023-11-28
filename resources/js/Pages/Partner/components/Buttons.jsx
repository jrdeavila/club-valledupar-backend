import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";

export const TableButton = ({ icon, link, label }) => (
    <div
        onClick={() => {
            link && router.replace(link);
        }}
        className={`px-5 py-4 rounded-lg cursor-pointer ${
            link ? "bg-gray-300" : "bg-gray-100"
        }`}
    >
        {label ? (
            <div>{label}</div>
        ) : (
            <FontAwesomeIcon icon={icon} className="text-white" />
        )}
    </div>
);

export const EnabledDisabledButton = ({ toggle, onClick }) => (
    <div
        onClick={onClick}
        className={`${
            !toggle ? "bg-green-300" : "bg-red-300"
        } px-3 py-2 rounded-lg cursor-pointer font-bold`}
    >
        {toggle ? "Inabilitar Acceso" : "Habilitar Acceso"}
    </div>
);

export const stateBeatifulStyle = (state) =>
    ({
        A: <div className="rounded-full h-3 w-3 bg-green-500"></div>,
        I: <div className="rounded-full h-3 w-3 bg-red-500"></div>,
    }[state]);

export const filters = {
    name: {
        label: "Nombre",
        placeholder: "Juan Camilo Perez...",
    },
    email: {
        label: "Correo",
        placeholder: "example@mail.com",
    },
    number_phone: {
        label: "Telefono Movil",
        placeholder: "300 000 0000",
    },
    action: {
        label: "Accion",
        placeholder: "0000",
    },
};
