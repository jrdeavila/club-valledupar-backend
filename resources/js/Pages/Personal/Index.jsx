import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    faLock,
    faLongArrowAltLeft,
    faLongArrowAltRight,
    faPlus,
    faTrash,
    faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import { Head, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    EnabledDisabledButton,
    TableButton,
} from "../Partner/components/Buttons";
import PrimaryButton from "@/Components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { NumberFormatBase } from "react-number-format";
export default function Index({ auth, personal, roles }) {
    const { data, current_page, first_page_url, last_page_url, links } =
        personal;
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        let employees = data.map((e) => ({
            ...e,
            roles: e.roles.map((e) => roleMapBeautifulLabel(e.name)).join(", "),
        }));

        setEmployees(employees);
    }, []);

    const personalTable = (
        <div className="h-full bg-white rounded-md">
            <div className="p-5 flex flex-col h-full">
                <div className="flex flex-row items-center mb-5">
                    <div className="text-3xl font-bold">
                        Informacion sobre los empleados
                    </div>
                    <div className="flex-grow"></div>
                </div>
                <table className="table table-auto w-full">
                    <thead className="bg-gray-300">
                        <tr>
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
                                Roles
                            </th>
                            <th className="border-2 border-white p-4 text-white text-xl text-start">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, i) => (
                            <tr key={i}>
                                <td className="py-2 pl-2" colSpan={2}>
                                    {employee.name}
                                </td>
                                <td className="py-2" colSpan={2}>
                                    {employee.email}
                                </td>
                                <td className="py-2">{employee.roles}</td>

                                <td className="py-2">
                                    <div className="flex flex-row gap-x-3 justify-center">
                                        <ActionButton
                                            label={
                                                employee.active
                                                    ? "Desactivar"
                                                    : "Activar"
                                            }
                                            color={
                                                employee.active
                                                    ? "bg-red-300"
                                                    : "bg-green-300"
                                            }
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={
                                                        employee.active
                                                            ? faLock
                                                            : faUnlock
                                                    }
                                                />
                                            }
                                            onClick={() => {
                                                router.put(
                                                    route("personal.toggle", {
                                                        employee: employee.id,
                                                    }),
                                                    {
                                                        onSuccess: () => {
                                                            router.get(
                                                                route(
                                                                    "personal.index"
                                                                )
                                                            );
                                                        },
                                                    }
                                                );
                                            }}
                                        />
                                        <ActionButton
                                            label="Eliminar"
                                            color="bg-gray-300"
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            }
                                            onClick={() => {
                                                router.delete(
                                                    route("personal.destroy", {
                                                        employee: employee.id,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex-grow"></div>
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
    );

    const requestPartnerUpdateSection = (
        <div className="bg-white rounded-md p-5">
            <div>
                <p className="text-xl font-bold">Solicitar actualizacion</p>
                <p className="text-sm ">
                    Solicita una actualizacion de la informacion personal
                    (obligatoria) en la aplicacion de socios
                </p>
            </div>
            <div className="pt-5">
                <GrayButton label="Solicitar" onClick={() => {}} />
            </div>
        </div>
    );

    return (
        <Authenticated user={auth.user} roles={auth.roles}>
            <Head title="Administrar Personal" />
            <div className="w-full flex flex-row gap-x-3 p-3">
                <div className="flex-1">{personalTable}</div>
                <div className="w-1/3 flex flex-col gap-y-3">
                    <EmployeeForm roles={roles} />
                    {requestPartnerUpdateSection}
                </div>
            </div>
        </Authenticated>
    );
}

const EmployeeForm = ({ roles }) => {
    const { data, errors, setData, post } = useForm({
        name: "",
        email: "",
        address: "",
        role: roles[0].name,
        phone: "",
        dni: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("personal.store"), {
            onSuccess: () => {
                router.get(route("personal.index"));
            },
        });
    };
    return (
        <div className="bg-white rounded-md p-5">
            <p className="text-2xl font-bold">Regitrar nuevo empleado</p>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <InputLabel>Nombre del empleado</InputLabel>
                    <TextInput
                        name="employee-name"
                        id="nombre"
                        type="text"
                        value={data.name}
                        className="mt-1 block w-full text-3xl font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        placeholder="Juan Carlos Sierra ..."
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel>Correo electronico</InputLabel>
                    <TextInput
                        name="employee-email"
                        id="correo"
                        type="email"
                        value={data.email}
                        className="mt-1 block w-full text-3xl font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        placeholder="example@mail..."
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel>Telefono</InputLabel>
                    <NumberFormatBase
                        type="tel"
                        className="mt-1 block w-full text-3xl font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        name="employee-phone"
                        id="telefono"
                        placeholder="(300) 123 - 3456"
                        format={(value) => {
                            if (!value) return "";
                            return `(${value.slice(0, 3)}) ${value.slice(
                                3,
                                6
                            )} - ${value.slice(6, 10)}`;
                        }}
                        value={data.phone}
                        onValueChange={(value) =>
                            setData("phone", value.formattedValue)
                        }
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel>Direccion</InputLabel>
                    <TextInput
                        name="employee-address"
                        id="address"
                        type="text"
                        value={data.address}
                        className="mt-1 block w-full text-3xl font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        placeholder="Calle 123 # 123 - 123"
                        onChange={(e) => setData("address", e.target.value)}
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel>Numero de documento</InputLabel>
                    <NumberFormatBase
                        name="employee-dni"
                        id="dni"
                        type="text"
                        value={data.dni}
                        className="mt-1 block w-full text-3xl font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        format={(value) => {
                            if (!value) return "";
                            if (value.length < 9) {
                                return `${value.slice(0, 2)} ${value.slice(
                                    2,
                                    5
                                )} ${value.slice(5, 8)}
                                `;
                            }
                            return `${value.slice(0, 4)} ${value.slice(
                                4,
                                7
                            )} ${value.slice(7, 10)}`;
                        }}
                        placeholder="1000 123 123"
                        onValueChange={(e) => setData("dni", e.value)}
                    />
                    <InputError message={errors.dni} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel>Roles</InputLabel>
                    <select
                        name="role"
                        id="role"
                        value={data.role}
                        className="bg-gray-300 rounded-md outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none caret-gray-200 caret-thin px-4 py-3 w-full text-3xl font-bold"
                        onChange={(e) => setData("role", e.target.value)}
                    >
                        {roles.map((role, i) => (
                            <option key={i} value={role.name}>
                                {roleMapBeautifulLabel(role.name)}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-10">
                    <GrayButton label="Registrar Empleado" onClick={() => {}} />
                </div>
            </form>
        </div>
    );
};

const ActionButton = ({ label, onClick, icon, color }) => {
    return (
        <button
            onClick={onClick}
            className={`${color} px-4 py-3 rounded-md flex justify-center cursor-pointer scale-95 hover:scale-100 transition-all w-full`}
        >
            <div className="flex flex-row gap-x-3 items-center justify-center">
                {icon}
                <p className="text uppercase font-bold">{label}</p>
            </div>
        </button>
    );
};

const GrayButton = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="bg-gray-300 px-4 py-3 rounded-md flex justify-center cursor-pointer hover:bg-gray-400 scale-95 hover:scale-100 transition-all w-full"
    >
        <p className="text-2xl uppercase font-bold">{label}</p>
    </button>
);

const roleMapBeautifulLabel = (role) =>
    ({
        admin: "Administrador",
        mesero: "Mesero",
        recepcionista: "Recepsionista",
        chef: "Chef",
        domiciliario: "Domiciliario",
        atencion: "Atencion a socios",
        eventos: "Gestion de eventos",
        callcenter: "Call Center",
        barman: "Bar Man",
    }[role]);
