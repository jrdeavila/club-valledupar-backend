import { FormatTimeAgo } from "@/Utils/TimeFormat";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export default function Index({ auth: { user }, orders: { data } }) {
    const [finished, setFinished] = useState([]);
    const [commanded, setCommanded] = useState([]);
    const [order, setOrder] = useState(null);
    // -------------------------------------------------------
    useEffect(() => {
        let interval = setInterval(() => {
            router.get(route("chef.orders.index"));
        }, 10000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        let finished = data.filter((e) => e.estado === "entregado");
        setFinished(finished);
    }, [data]);

    useEffect(() => {
        let commanded = data.filter(
            (e) => e.estado === "comandado" || e.estado === "enviado"
        );
        setCommanded(commanded);
        let audio = new Audio("/sounds/notification.mp3");

        if (
            commanded.length > 0 &&
            commanded.length >
                (parseInt(localStorage.getItem("orders-length")) ?? 0)
        ) {
            audio.play();
        }

        localStorage.setItem("orders-length", commanded.length);
    }, [data]);

    // -------------------------------------------------------
    const orderList = (
        <div className="w-full bg-blue-300 px-3 flex flex-col items-start py-4">
            <p className="text-2xl text-white uppercase font-bold mb-3">
                Comanda de pedidos
            </p>
            {commanded.length > 0 && (
                <div className="flex-1 flex flex-row gap-x-3 flex-nowrap">
                    {commanded.map((e, i) => (
                        <div
                            onClick={() => setOrder(e)}
                            key={i}
                            className="bg-blue-400 px-6 py-3 rounded-md flex flex-col justify-center h-full cursor-pointer hover:bg-blue-500 transition duration-300 ease-in-out"
                        >
                            <p className="text-white font-bold">Orden</p>
                            <p className="text-white text-3xl font-bold">
                                {i + 1}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const orderViewList =
        commanded.length > 0 ? (
            <div className="flex-1 py-10 flex flex-row gap-x-3 px-10">
                {commanded.map((e, i) => (
                    <OrderItem
                        key={i}
                        order={e}
                        selected={e.id === order?.id}
                    />
                ))}
            </div>
        ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-3xl font-bold text-gray-500">
                    No hay pedidos
                </p>
            </div>
        );
    return (
        <div className="min-h-screen select-none">
            <Head title="Comanda de Chef" />

            <div className="flex flex-row min-h-screen text-center">
                <div className="w-96 flex flex-col p-3 shadow-xl">
                    <p className="text-3xl font-bold mb-4">Finalizados</p>
                    {finished.map((e, i) => (
                        <div
                            key={i}
                            className="bg-emerald-300 p-5 rounded-lg mb-3"
                        >
                            <p className="text-white text-start font-bold pb-3">
                                {e.usuario}
                            </p>
                            <p className="text-white text-sm text-end">
                                {FormatTimeAgo(e.fecha_actualizacion)}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="bg-gray-50">
                        <div className="w-full">
                            <div className="lg:text-center flex flex-col">
                                {orderList}
                            </div>
                        </div>
                    </div>
                    {orderViewList}
                </div>
            </div>
        </div>
    );
}

const OrderItem = ({ order, selected }) => {
    const color = {
        enviado: {
            bg: "bg-blue-200",
            hover: "hover:bg-blue-300",
            text: "text-white",
            button: "bg-blue-600",
            items: "bg-blue-500",
        },
        comandado: {
            bg: "bg-orange-200",
            hover: "hover:bg-orange-300 transition duration-300 ease-in-out",
            text: "text-black",
            button: "bg-orange-400",
            items: "bg-orange-300",
        },
    }[order.estado];
    // -------------------------------------------------

    const handleFinishOrder = () => {
        router.put(route("chef.orders.finishOrder", order.id));
    };
    return (
        <div
            className={`relative ${color.bg} h-auto rounded-md ${color.hover} ${
                selected ? "shadow-xl scale-105" : ""
            }`}
        >
            <div className="pt-5">
                <div className="flex flex-col">
                    <div className="px-5 pb-3">
                        <p className={`text-xl font-bold ${color.text}`}>
                            {order.usuario}
                        </p>
                        <p className={`${color.text}`}>
                            {FormatTimeAgo(order.fecha_creacion)}
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-y-2">
                        {order.detalle.map((e, i) => (
                            <div
                                key={i}
                                className={`${color.items} flex flex-col`}
                            >
                                <div className="flex flex-row px-4">
                                    <p className={`${color.text} text-xl`}>
                                        {e.plato}
                                    </p>
                                    <div className="flex-grow"></div>
                                    <p className={`${color.text} text-xl`}>
                                        {e.cantidad}
                                    </p>
                                </div>
                                <div className={`px-4 ${color.observation}`}>
                                    <p className={`${color.text}`}>
                                        {e.observation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-2 right-2">
                        <div
                            onClick={handleFinishOrder}
                            className={`${color.button} px-3 py-1 rounded-lg cursor-pointer hover:scale-105 transform transition-transform duration-300`}
                        >
                            <p className={`${color.text} uppercase font-bold`}>
                                {order.estado === "comandado"
                                    ? "Entregar a mecero"
                                    : "Pedido entregado"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
