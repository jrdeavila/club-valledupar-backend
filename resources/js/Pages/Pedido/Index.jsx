import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TextCurrencyFormat } from "@/Utils/TextCurrency";
import { Head, router } from "@inertiajs/react";
import { colorByEstado } from "./utils/stateColors";
import moment from "moment";

export default function ({ auth: { user }, pedidos: { data: pedidos } }) {
    return (
        <Authenticated
            user={user}
            header={<div className="text-2xl">Pedidos</div>}
        >
            <Head title="Pedidos" />

            <div className="flex flex-col gap-y-5 p-5 justify-center items-center">
                {pedidos.map((e, i) => (
                    <PedidoItem key={i} pedido={e} />
                ))}
            </div>
        </Authenticated>
    );
}

const PedidoItem = ({ pedido }) => {
    const handleActionByEstado = (estado) => {
        const onChangeEstado = (estado) => {
            router.patch(route("pedidos.estado", pedido), {
                estado: estado,
            });
        };
        return {
            pendiente: () => {
                onChangeEstado("enviado");
            },
            enviado: () => {
                onChangeEstado("entregado");
            },
            cancelado: () => {
                onChangeEstado("cancelado");
            },
            entregado: undefined,
        }[estado];
    };

    const Table = () => {
        return (
            <table className="table table-fixed w-full">
                <thead className="mb-2">
                    <tr className="text-gray-400">
                        <th>
                            <div className="bg-gray-50 text-start px-3 py-2">
                                DESCRIPCION
                            </div>
                        </th>
                        <th>
                            <div className="bg-gray-50 text-start px-3 py-2">
                                CANTIDAD
                            </div>
                        </th>
                        <th>
                            <div className="bg-gray-50 text-start px-3 py-2">
                                PRECIO
                            </div>
                        </th>
                        <th>
                            <div className="bg-gray-50 text-start px-3 py-2">
                                TOTAL
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pedido.detalle.map((e, i) => (
                        <tr key={i}>
                            <td className="px-3 py-2 text-gray-500">
                                {e.plato}
                            </td>
                            <td className="px-3 py-2 text-gray-500">
                                {e.cantidad}
                            </td>
                            <td className="px-3 py-2 text-gray-500">
                                {TextCurrencyFormat(e.precio)}
                            </td>
                            <td className="px-3 py-2 text-gray-500">
                                {TextCurrencyFormat(e.total)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const Actions = () => {
        const SendActions = ({ estado }) =>
            ({
                pendiente: (
                    <button
                        onClick={handleActionByEstado(estado)}
                        style={{
                            backgroundColor: colorByEstado("pendiente"),
                        }}
                        className=" px-5 py-2 text-white rounded-lg font-semibold"
                    >
                        ENVIAR
                    </button>
                ),
                enviado: (
                    <button
                        onClick={handleActionByEstado(estado)}
                        style={{
                            backgroundColor: colorByEstado("entregado"),
                        }}
                        className=" px-5 py-2 text-white rounded-lg font-semibold"
                    >
                        ENTREGADO
                    </button>
                ),

                entregado: undefined,
                cancelado: undefined,
            }[estado]);

        const CancelActions = ({ estado }) =>
            ({
                pendiente: (
                    <button
                        onClick={handleActionByEstado("cancelado")}
                        className="bg-red-400 px-5 py-2 text-white rounded-lg font-semibold"
                    >
                        CANCELAR
                    </button>
                ),
                enviado: undefined,
                entregado: undefined,
                cancelado: undefined,
            }[estado]);
        return (
            <div className="flex flex-col gap-y-4">
                <SendActions estado={pedido.estado} />
                <CancelActions estado={pedido.estado} />
            </div>
        );
    };
    let createdAt = moment(pedido.fecha_creacion).format("Y-m-dddd, H:m A");
    return (
        <div className="bg-white shadow-lg rounded-lg w-1/2 flex flex-col gap-y-5 select-none">
            <div className="px-8 py-3 flex flex-row justify-between bg-gray-50 rounded-t-lg">
                <div className="flex flex-col">
                    <div className=" text-gray-400 font-semibold">USUARIO</div>
                    <div>{pedido.usuario}</div>
                </div>

                <div className="flex flex-col">
                    <div className=" text-gray-400 font-semibold">
                        SOLICITADO
                    </div>
                    <div>{createdAt}</div>
                </div>

                <div
                    style={{
                        backgroundColor: colorByEstado(pedido.estado),
                    }}
                    className="text-white rounded-lg px-5 py-1 flex items-center font-bold"
                >
                    {pedido.estado.toUpperCase()}
                </div>
            </div>
            <div className="px-8">
                <div className="text-gray-500 font-semibold mb-4">
                    DETALLE DE PEDIDO
                </div>
                <div className="flex gap-x-5">
                    <div className="flex-auto">
                        <Table />
                    </div>
                    <div className="w-1/4">
                        <Actions />
                    </div>
                </div>
            </div>
            <div className="px-8 py-3 flex flex-row justify-between bg-gray-50 rounded-b-lg">
                <div className="flex flex-col">
                    <div className=" text-gray-400 font-semibold">
                        DIRECCION
                    </div>
                    <div className="text-ellipsis">{pedido.direccion}</div>
                </div>
                <div className="flex flex-col">
                    <div className=" text-gray-400 font-semibold">TOTAL</div>
                    <div>{TextCurrencyFormat(pedido.total)}</div>
                </div>
            </div>
        </div>
    );
};
