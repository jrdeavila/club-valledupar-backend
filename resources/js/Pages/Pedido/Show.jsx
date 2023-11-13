import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import OrderItem from "./components/OrderItem";

export default function ({ auth: { user }, order: { data } }) {
    return (
        <Authenticated user={user}>
            <Head title="Detalle de pedido" />
            <div className="flex flex-row justify-center">
                <OrderItem pedido={data} />
            </div>
        </Authenticated>
    );
}
