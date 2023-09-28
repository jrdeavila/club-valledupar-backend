import AppDialog from "@/Components/AppDialog";
import DatePicker from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Searcheable, { SearcheableItem } from "@/Components/Sercheable";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { FormatHiAtoHHmm } from "@/Utils/TimeFormat";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CreateReservacion({
    auth: { user },
    usuarios: { data: usuarios },
    horarios: { data: horarios },
    tipos,
}) {
    console.log(tipos);
    return (
        <Authenticated user={user}>
            <Head title="Reservaciones" />
            <div
                style={{
                    height: "80vh",
                }}
            >
                <div className="m-5 flex justify-center items-center h-full">
                    <FormReservacion
                        usuarios={usuarios}
                        horarios={horarios}
                        tipos={tipos}
                    />
                </div>
            </div>
        </Authenticated>
    );
}

const FormReservacion = ({ usuarios, horarios = [], tipos = [] }) => {
    const { data, setData, errors, post } = useForm({
        fecha_reservacion: null,
        hora_reservacion: null,
        usuario_id: 0,
        id_horario: 0,
        estado: "pendiente",
    });

    const [showForm, setShowForm] = useState(false);

    // Search the correct horario
    useEffect(() => {
        const getDate = (time) => {
            const [hours, minutes] = time.split(":");
            let date = new Date();

            date.setHours(hours);
            date.setMinutes(minutes);
            return date;
        };
        if (
            data.hora_reservacion != null ||
            data.hora_reservacion != undefined
        ) {
            let horario = horarios.find((horario) => {
                let beginDate = getDate(
                    FormatHiAtoHHmm(horario.fecha_apertura)
                );
                let endDate = getDate(FormatHiAtoHHmm(horario.fecha_cierre));
                let date = getDate(data.hora_reservacion);

                return (
                    beginDate.getTime() <= date.getTime() &&
                    endDate.getTime() >= date.getTime()
                );
            });

            if (horario) setData("id_horario", horario?.id);
        }
    }, [data.hora_reservacion]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("reservaciones.store"));
    };

    const handleOpenForm = (e) => {
        e.preventDefault();
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div className="w-full lg:w-2/3 bg-white rounded-lg p-5 select-none">
            <div className="flex flex-col gap-y-3">
                <div className="text-xl text-gray-400 font-semibold">
                    Informacion de la reservacion
                </div>
                <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
                    <div>
                        <DatePicker
                            onDateChange={({ date, time }) => {
                                setData({
                                    ...data,
                                    fecha_reservacion: date,
                                    hora_reservacion: time,
                                });
                            }}
                        />
                        <div className="flex flex-row gap-x-3">
                            <InputError
                                className="flex-1"
                                message={errors.fecha_reservacion}
                            />
                            <InputError
                                className="flex-1"
                                message={errors.hora_reservacion}
                            />
                            <InputError
                                className="flex-1"
                                message={errors.unique_reservacion}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-row gap-3 items-end">
                            <div className="w-full">
                                <InputLabel value="Usuario destinatario" />
                                <Searcheable
                                    value={data.usuario_id}
                                    placeholder="Selecionar un usuario"
                                    datalist={usuarios.map((e, i) => (
                                        <SearcheableItem
                                            value={e.id}
                                            text={`${e.nombre} ${e.apellido}`}
                                            index={i}
                                            key={i}
                                        >
                                            <div className="text-gray-600">
                                                <div className="flex flex-row  justify-between items-center">
                                                    <div className="flex-1 flex flex-col">
                                                        <div>
                                                            {`${e.nombre} ${e.apellido}`}
                                                        </div>
                                                        <div className="text-xs">
                                                            {e.email}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-semibold">
                                                        {TextCapitalize(e.tipo)}
                                                    </div>
                                                </div>
                                            </div>
                                        </SearcheableItem>
                                    ))}
                                    onChange={(value) =>
                                        setData("usuario_id", value)
                                    }
                                />
                            </div>
                            <button
                                onClick={handleOpenForm}
                                className="bg-gray-400 h-10 w-10 rounded-lg flex justify-center items-center"
                            >
                                <FontAwesomeIcon
                                    icon={faPerson}
                                    className="text-2xl text-white"
                                />
                            </button>
                        </div>
                        <InputError message={errors.usuario_id} />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div>Horarios</div>

                        <div className="flex gap-3 px-5 py-3 overflow-x-scroll no-scrollbar">
                            {horarios.map((e, i) => (
                                <div
                                    key={i}
                                    onClick={() => setData("id_horario", e.id)}
                                >
                                    <ResumeHorarioItem
                                        horario={e}
                                        selected={data.id_horario === e.id}
                                    />
                                </div>
                            ))}
                        </div>

                        <InputError message={errors.id_horario} />
                    </div>

                    <div className="mb-5">
                        <InputLabel value="Estado" />
                        <TextInput
                            value={TextCapitalize(data.estado)}
                            disabled
                            className="w-full bg-gray-100 border-none"
                        />
                        <InputError message={errors.estado} />
                    </div>

                    <button className="bg-primary py-2 text-white font-semibold text-xl rounded-lg hover:shadow-md w-full">
                        Agendar Reservacion
                    </button>
                </form>
            </div>
            {showForm && <CreateUser tipos={tipos} onClose={handleCloseForm} />}
        </div>
    );
};

const ResumeHorarioItem = ({ horario, selected = false }) => {
    return (
        <div
            style={{
                minWidth: "16rem",
                height: "10rem",
            }}
            className={` ${
                !selected ? "bg-gray-100" : "bg-green-100"
            } p-5 rounded-lg flex flex-col justify-center items-center select-none cursor-pointer transition-transform transform duration-300 hover:scale-105 hover:shadow-md`}
        >
            <div className="font-semibold text-gray-600 text md:text-xl">
                {`${horario.fecha_apertura} - ${horario.fecha_cierre}`}
            </div>

            <div className="flex flex-row flex-wrap gap-1 mt-2 justify-center">
                {Object.keys(horario.dias)
                    .filter((e) => horario.dias[e])
                    .map((key, i) => (
                        <div
                            key={i}
                            className="text-sm text-gray-500"
                        >{`${TextCapitalize(key)}, `}</div>
                    ))}
            </div>
        </div>
    );
};

const CreateUser = ({ tipos, onClose }) => {
    const { data, setData, errors, post, processing } = useForm({
        email: "",
        nombre: "",
        apellido: "",
        telefono: "",
        tipo_usuario_id: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("usuarios.store"));
    };

    return (
        <AppDialog title="Informacion del usuario" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3">
                    <div className="flex-1">
                        <InputLabel value="Email" />
                        <TextInput
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="flex-1 flex flex-row gap-x-3">
                        <div className="flex-1">
                            <InputLabel value="Nombres" />
                            <TextInput
                                value={data.nombre}
                                onChange={(e) =>
                                    setData("nombre", e.target.value)
                                }
                                className="w-full"
                            />
                            <InputError message={errors.nombre} />
                        </div>
                        <div className="flex-1">
                            <InputLabel value="Apellidos" />
                            <TextInput
                                value={data.apellido}
                                onChange={(e) =>
                                    setData("apellido", e.target.value)
                                }
                                className="w-full "
                            />
                            <InputError message={errors.apellido} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <InputLabel value="Telefono" />
                        <TextInput
                            value={data.telefono}
                            onChange={(e) =>
                                setData("telefono", e.target.value)
                            }
                            className="w-full "
                        />
                        <InputError message={errors.telefono} />
                    </div>
                    <div className="flex-1">
                        <InputLabel value="Tipo de Usuario" />
                        <TextInput
                            value={TextCapitalize(
                                tipos.find((e) => e.id === data.tipo_usuario_id)
                                    ?.nombre
                            )}
                            disabled
                            className="w-full bg-gray-100"
                        />
                        <InputError message={errors.tipo_usuario_id} />
                    </div>

                    <div className="flex-1 mt-3">
                        <button className="bg-primary w-full py-2 rounded-lg text-white text-xl font-semibold">
                            {processing ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </form>
        </AppDialog>
    );
};
