import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    faChevronLeft,
    faChevronRight,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import OrderItem from "./components/OrderItem";

export default function ({ auth: { user }, pedidos }) {
    console.log(pedidos);
    const {
        data,
        meta: { links },
        links: { first, last },
    } = pedidos;

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("name");

    const handleOnSearch = () => {
        if (search.length > 0) {
            router.replace(
                route("pedidos.index", {
                    filter: filter,
                    search: search,
                })
            );
        } else {
            router.replace(route("pedidos.index"));
        }
    };

    return (
        <Authenticated
            user={user}
            header={<div className="text-2xl">Pedidos</div>}
        >
            <Head title="Pedidos" />

            <div className="flex flex-row gap-x-3 items-center justify-center mx-20">
                <TableButton icon={faChevronLeft} link={first} />
                {links.map((e, i) => {
                    if (
                        e.label !== "pagination.previous" &&
                        e.label !== "pagination.next"
                    ) {
                        return (
                            <TableButton key={i} link={e.url} label={e.label} />
                        );
                    }
                })}
                <TableButton icon={faChevronRight} link={last} />
                <div className="flex-grow"></div>
                <div className="text-2xl font-bold text-white">Buscar por:</div>
                <select
                    onChange={(e) => setFilter(e.target.value)}
                    className="text-xl bg-white bg-opacity-40 border-none focus:outline-none focus:ring-0 rounded-lg text-white font-bold"
                >
                    {Object.keys(filters).map((key, i) => (
                        <option key={i} value={key} className="text-black">
                            {filters[key].label}
                        </option>
                    ))}
                </select>
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-xl placeholder:text-xl focus:outline-none focus:ring-0 focus:border-gray-300 border-none rounded-lg"
                    placeholder={filters[filter].placeholder}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleOnSearch();
                        }
                    }}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="cursor-pointer text-2xl bg-white bg-opacity-40 rounded-lg p-2 text-white"
                    onClick={handleOnSearch}
                />
            </div>

            <div className="flex flex-col gap-y-5 p-5 justify-center items-center">
                {data.map((e, i) => (
                    <OrderItem key={i} pedido={e} />
                ))}
            </div>
        </Authenticated>
    );
}

const TableButton = ({ icon, link, label }) => (
    <div
        onClick={() => {
            link && router.replace(link);
        }}
        className={`px-5 py-4 rounded-lg cursor-pointer ${
            link ? "bg-white bg-opacity-40" : "bg-gray-100 bg-opacity-20"
        }`}
    >
        {label ? (
            <div className="text-white font-bold">{label}</div>
        ) : (
            <FontAwesomeIcon icon={icon} className="text-white" />
        )}
    </div>
);

const filters = {
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
