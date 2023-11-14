import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TextCurrencyFormat } from "@/Utils/TextCurrency";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import OrderMenuSettings from "./components/OrderMenuSettings";
import { filters, statusMapLabel, typeMapLabel } from "./utils/maps";
import { useEffect } from "react";

export default function ({ auth: { user, roles }, pedidos }) {
    const { data } = pedidos;

    // ------------------------------------------------

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("name");

    // ------------------------------------------------

    useEffect(() => {
        const query = window.location.search;
        const params = new URLSearchParams(query);
        setSearch(params.get("search") || "");
        setFilter(params.get("filter") || "name");
    }, []);

    // ------------------------------------------------

    const handleOnSearch = useCallback(() => {
        if (search.length > 0) {
            router.get(
                route("pedidos.index", {
                    filter: filter,
                    search: search,
                })
            );
        } else {
            router.get(route("pedidos.index"));
        }
    }, [search, filter]);

    return (
        <Authenticated
            user={user}
            roles={roles}
            header={<div className="text-2xl">Pedidos</div>}
        >
            <Head title="Pedidos" />
            <div className="flex flex-col gap-y-5 bg-white rounded-lg mx-20 p-5">
                <div className="flex flex-row gap-x-3 items-center justify-center mx-10">
                    <div className="text-3xl font-bold">Pedidos</div>
                    <div className="flex-grow"></div>
                    <div className="text-2xl font-bold">Buscar por:</div>
                    <select
                        value={filter}
                        onChange={(e) => {
                            setSearch("");
                            setFilter(e.target.value);
                        }}
                        className="text-xl bg-gray-400 bg-opacity-40 border-none focus:outline-none focus:ring-0 rounded-lg text-white font-bold"
                    >
                        {Object.keys(filters).map((key, i) => (
                            <option key={i} value={key} className="text-black">
                                {filters[key].label}
                            </option>
                        ))}
                    </select>
                    {filter === "status" ? (
                        <select
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="text-xl bg-gray-400 bg-opacity-40 border-none focus:outline-none focus:ring-0 rounded-lg text-white font-bold"
                        >
                            {Object.keys(filters[filter].options).map(
                                (key, i) => (
                                    <option
                                        key={i}
                                        value={key}
                                        className="text-black"
                                    >
                                        {filters[filter].options[key]}
                                    </option>
                                )
                            )}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={search}
                            placeholder={filters[filter].placeholder}
                            className="text-xl bg-gray-400 bg-opacity-40 border-none focus:outline-none focus:ring-0 rounded-lg text-white font-bold"
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleOnSearch();
                                }
                            }}
                        />
                    )}
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="cursor-pointer text-2xl p-2"
                        onClick={handleOnSearch}
                    />
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
                                Tipo
                            </th>
                            <th className="border-2 border-white p-4 text-white text-xl text-start">
                                Total
                            </th>
                            <th className="border-2 border-white p-4 text-white text-xl text-start">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order, i) => (
                            <tr
                                key={i}
                                className="hover:bg-gray-100 cursor-pointer"
                            >
                                <td className="py-2 pl-3">{order.accion}</td>
                                <td className="py-2" colSpan={2}>
                                    <div className="flex items-center justify-start gap-x-3">
                                        <div>{order.usuario}</div>
                                    </div>
                                </td>
                                <td className="py-2" colSpan={2}>
                                    {typeMapLabel(order.tipo)}
                                    {order.direccion}
                                </td>

                                <td className="py-2">
                                    {TextCurrencyFormat(order.total)}
                                </td>
                                <td className="py-2 pe-3">
                                    <div className="relative flex flex-row gap-x-2 items-center">
                                        {statusMapLabel(order.estado).icon}
                                        <strong>
                                            {statusMapLabel(order.estado).label}
                                        </strong>
                                        <div className="flex-grow"></div>
                                        <OrderMenuSettings order={order} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Authenticated>
    );
}
