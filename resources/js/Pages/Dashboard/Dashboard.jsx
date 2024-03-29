import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head } from "@inertiajs/react";
import { DashboardCardItem } from "./components/DashboardCardItem";
import { dashboardItems, xor } from "./Models/DashboardItem";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            roles={auth.roles}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-wrap row-container gap-5 justify-center">
                    {dashboardItems
                        .filter((e) =>
                            e.roles?.some((role) => auth.roles.includes(role))
                        )
                        .filter((e) => !e.onlyNav)
                        .map((card, index) => (
                            <div
                                className=" w-full px-5 lg:px-0 lg:w-1/4 md:w-2/3"
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
