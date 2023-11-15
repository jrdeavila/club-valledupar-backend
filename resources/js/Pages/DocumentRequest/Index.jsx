import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    faCancel,
    faCheck,
    faClock,
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

export default function DocumentRequest({ auth: { user, roles }, documents }) {
    const [filter, setFilter] = useState("name");
    const [search, setSearch] = useState("");

    const { data, current_page, first_page_url, last_page_url, links } =
        documents;

    console.log(data[0]);

    const handleOnSearch = () => {
        if (search.length > 0) {
            router.replace(
                route("document-request.index", {
                    filter: filter,
                    search: search,
                })
            );
        } else {
            router.replace(route("document-request.index"));
        }
    };

    const handleOnChangeStatus = ({ document, status }) => {
        router.put(
            route("document-request.change-status", {
                document: document,
            }),
            {
                status: status,
            }
        );
    };
    return (
        <Authenticated user={user} roles={roles}>
            <Head title="Solicitudes de documentos" />
            <div className="mx-10 bg-white rounded-md">
                <div className="p-5">
                    <div className="flex flex-row items-center mb-5">
                        <div className="text-3xl font-bold">
                            Solicitudes Recibidas
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
                                    Estado
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
                                    Tipo de solicitud
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((document, i) => (
                                <tr key={i}>
                                    <td className="py-2 px-3 font-bold">
                                        <div className="flex flex-row gap-x-3 items-center">
                                            {
                                                statusBeatifulStyle[
                                                    document.status
                                                ].icon
                                            }
                                            <select
                                                value={document.status}
                                                onChange={(e) =>
                                                    handleOnChangeStatus({
                                                        document,
                                                        status: e.target.value,
                                                    })
                                                }
                                                className="text-xl w-full border-none focus:outline-none focus:ring-0 rounded-lg font-bold"
                                            >
                                                {Object.keys(
                                                    statusBeatifulStyle
                                                ).map((e, i) => (
                                                    <option key={i} value={e}>
                                                        {
                                                            statusBeatifulStyle[
                                                                e
                                                            ].label
                                                        }
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className="py-2" colSpan={2}>
                                        <div>{document.user.name}</div>
                                    </td>
                                    <td className="py-2" colSpan={2}>
                                        {document.user.email}
                                    </td>
                                    <td className="py-2">
                                        {document.document_request_type.name}
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

const statusBeatifulStyle = {
    pending: {
        label: "Pendiente",
        icon: (
            <div className="h-7 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                <FontAwesomeIcon icon={faClock} />
            </div>
        ),
    },
    approved: {
        label: "Aprobado",
        icon: (
            <div className="h-7 w-8 rounded-full bg-green-300 flex items-center justify-center">
                <FontAwesomeIcon icon={faCheck} />
            </div>
        ),
    },
    rejected: {
        label: "Rechazado",
        icon: (
            <div className="h-7 w-8 rounded-full bg-red-300 flex items-center justify-center">
                <FontAwesomeIcon icon={faCancel} />
            </div>
        ),
    },
};

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
