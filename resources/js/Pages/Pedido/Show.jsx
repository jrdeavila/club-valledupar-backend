import Authenticated from "@/Layouts/AuthenticatedLayout";
import OrderItem from "./components/OrderItem";
import { Head } from "@inertiajs/react";

export default function ShowDetails({ auth, order: { data } }) {
    return (
        <Authenticated user={auth.user} roles={auth.roles}>
            <Head title="Detalle de pedido" />
            <div className="flex flex-row justify-center">
                <OrderItem pedido={data} />
            </div>
        </Authenticated>
    );
}
