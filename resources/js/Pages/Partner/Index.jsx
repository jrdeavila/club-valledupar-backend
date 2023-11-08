import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function Partner({ auth: { user }, partners }) {
    const { data, current_page, first_page_url, last_page_url, links } =
        partners;

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("name");

    const handleOnSearch = () => {
        if (search.length > 0) {
            router.replace(`/partner?search=${search}&filter=${filter}`);
        } else {
            router.replace("/partner");
        }
    };

    return (
        <Authenticated user={user}>
            <Head title="Socios" />
            <div className="mx-10 bg-white rounded-md">
                <div className="p-5">
                    <div className="flex flex-row items-center mb-5">
                        <div className="text-3xl font-bold">
                            Informacion sobre los socios
                        </div>
                        <div className="flex-grow"></div>

                        <div className="flex flex-row items-center gap-x-3">
                            <div className="text-2xl font-bold">
                                Buscar por:
                            </div>
                            <select
                                onChange={(e) => setFilter(e.target.value)}
                                className="text-xl bg-gray-300 border-none focus:outline-none focus:ring-0 rounded-lg text-white font-bold"
                            >
                                {Object.keys(filters).map((key, i) => (
                                    <option key={i} value={key}>
                                        {filters[key].label}
                                    </option>
                                ))}
                            </select>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                className="text-xl placeholder:text-xl focus:outline-none focus:ring-0 focus:border-gray-300 border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0"
                                placeholder={filters[filter].placeholder}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleOnSearch();
                                    }
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="cursor-pointer text-2xl"
                                onClick={handleOnSearch}
                            />
                        </div>
                    </div>
                    <table className="table table-auto w-full">
                        <thead className="bg-gray-300">
                            <tr>
                                <th className="border-2 border-white p-4 text-white text-xl pl-3 text-start">
                                    # Accion
                                </th>
                                <th
                                    className="border-2 border-white p-4 text-white text-xl text-start"
                                    colSpan={2}
                                >
                                    Nombre
                                </th>
                                <th
                                    className="border-2 border-white p-4 text-white text-xl text-start"
                                    colSpan={2}
                                >
                                    Email
                                </th>
                                <th className="border-2 border-white p-4 text-white text-xl text-start">
                                    Telefono Movil
                                </th>
                                <th className="border-2 border-white p-4 text-white text-xl text-start">
                                    Genero
                                </th>
                                <th className="border-2 border-white p-4 text-white text-xl text-start">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((partner, i) => (
                                <tr key={i}>
                                    <td className="py-2 pl-3 font-bold">
                                        {partner.action}
                                    </td>
                                    <td className="py-2" colSpan={2}>
                                        <div className="flex items-center justify-start gap-x-3">
                                            <div>
                                                {stateBeatifulStyle(
                                                    partner.state
                                                )}
                                            </div>
                                            <div>{partner.name}</div>
                                        </div>
                                    </td>
                                    <td className="py-2" colSpan={2}>
                                        {partner.email}
                                    </td>
                                    <td className="py-2">
                                        {partner.number_phone}
                                    </td>
                                    <td className="py-2">
                                        {genderBeatifulStyle(partner.gender)}
                                    </td>

                                    <td className="py-2">
                                        <div className="flex flex-row gap-x-3 justify-center">
                                            <EnabledDisabledButton
                                                toggle={partner.state === "A"}
                                                onClick={() => {
                                                    router.put(
                                                        route(
                                                            "partner.toggle",
                                                            {
                                                                partner:
                                                                    partner.id,
                                                            }
                                                        )
                                                    );
                                                }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="py-4">
                        <div className="flex flex-row gap-x-4 items-center w-full">
                            <TableButton
                                icon={faLongArrowAltLeft}
                                link={first_page_url}
                            />

                            {links.map((link, i) => {
                                if (
                                    link.label !== "pagination.previous" &&
                                    link.label !== "pagination.next"
                                ) {
                                    return (
                                        <TableButton
                                            key={i}
                                            link={link.url}
                                            label={link.label}
                                        />
                                    );
                                }
                                return null;
                            })}

                            <TableButton
                                icon={faLongArrowAltRight}
                                link={last_page_url}
                            />

                            <div className="flex-grow"></div>
                            <div className="flex flex-row gap-x-3 items-center">
                                <div className="text-2xl font-bold">
                                    Pagina {current_page}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

const EnabledDisabledButton = ({ toggle, onClick }) => (
    <div
        onClick={onClick}
        className={`${
            !toggle ? "bg-green-300" : "bg-red-300"
        } px-3 py-2 rounded-lg cursor-pointer font-bold`}
    >
        {toggle ? "Inabilitar Acceso" : "Habilitar Acceso"}
    </div>
);

const TableButton = ({ icon, link, label }) => (
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

const genderBeatifulStyle = (gender) =>
    ({
        M: "Masculino",
        F: "Femenino",
    }[gender]);

const stateBeatifulStyle = (state) =>
    ({
        A: <div className="rounded-full h-3 w-3 bg-green-500"></div>,
        I: <div className="rounded-full h-3 w-3 bg-red-500"></div>,
    }[state]);

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
