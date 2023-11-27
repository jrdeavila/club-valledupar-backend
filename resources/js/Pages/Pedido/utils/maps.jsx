import {
    faCheck,
    faClock,
    faLocationArrow,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const typeMapLabel = (type) => {
    return {
        club: "En restaurante (Club)",
        domicilio: "Domicilio",
        reservacion: "Reservacion",
    }[type];
};

export const statusMapLabel = (status) => {
    return {
        pendiente: {
            label: "Pendiente",
            icon: (
                <div className="h-7 w-8 rounded-full bg-red-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faClock} />
                </div>
            ),
        },
        enviado: {
            label: "Entregado a mecero",
            icon: (
                <div className="h-7 w-8 rounded-full bg-blue-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faLocationArrow} />
                </div>
            ),
        },
        comandado: {
            label: "En Preparacion",
            icon: (
                <div className="h-7 w-8 rounded-full bg-yellow-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUtensils} />
                </div>
            ),
        },
        entregado: {
            label: "Entregado a mecero",
            icon: (
                <div className="h-7 w-8 rounded-full bg-green-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            ),
        },
        cancelado: {
            label: "Cancelado",
            icon: (
                <div className="h-7 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCheck} />
                </div>
            ),
        },
    }[status];
};

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
    status: {
        label: "Estado",
        options: {
            pendiente: "Pendiente",
            comandado: "Comandado",
            entregado: "Entregado",
            cancelado: "Cancelado",
        },
    },
};
