import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    faUtensils,
    faCalendar,
    faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Head } from "@inertiajs/react";
import { DashboardCardItem } from "./components/DashboardCardItem";

export default function Dashboard({ auth }) {
    let cards = [
        {
            title: "Cartas",
            desc: "Administra los platos y bebidas del menu del restaurante",
            image: "/img/cartas.webp",
            color: "red",
            onClick: () => {
                window.location.href = route("cartas.index");
            },
        },
        {
            title: "Reservaciones",
            desc: "Administra las reservaciones de los clientes y socios",
            color: "gray",
            image: "/img/reservaciones.jpg",
            onClick: () => {
                console.log("click");
            },
        },
        {
            title: "Horarios",
            desc: "Administra los horarios de apertura y cierre",
            color: "red",
            image: "/img/horarios.jpeg",
            onClick: () => {
                console.log("click");
            },
        },
        {
            title: "Pedidos",
            desc: "Administra los pedidos de los clientes",
            color: "green",
            image: "/img/pedidos.jpg",
            onClick: () => {
                console.log("click");
            },
        },
    ];
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-wrap row-container gap-5 justify-center">
                    {cards.map((card, index) => (
                        <div
                            className=" w-full px-5 lg:px-0 lg:w-1/3"
                            key={index}
                        >
                            <DashboardCardItem {...card} />
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
