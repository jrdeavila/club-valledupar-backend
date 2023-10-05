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
import CreateUser from "./components/CreateUser";
import TextArea from "@/Components/TextArea";

export default function CreateReservacion({
    auth: { user },
    users: { data: users },
    insumes,
    types,
}) {
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
                        users={users}
                        insumes={insumes}
                        types={types}
                    />
                </div>
            </div>
        </Authenticated>
    );
}

const FormReservacion = ({ users, insumes = [], types = [] }) => {
    const { data, setData, errors, post } = useForm({
        start_date: "",
        end_date: "",
        type_reservation_id: 0,
        insume_area_id: 0,
        is_ever: false,
        observations: "",
        user_id: 0,
    });

    const [showForm, setShowForm] = useState(false);

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
                    <div className="flex flex-row gap-x-5">
                        <div className="flex-1">
                            <InputLabel value="Fecha de inicio" />
                            <TextInput
                                value={data.start_date}
                                type="datetime-local"
                                className="w-full"
                                onChange={(e) =>
                                    setData("start_date", e.target.value)
                                }
                            />
                            <InputError message={errors.start_date} />
                        </div>
                        <div className="flex-1">
                            <InputLabel value="Fecha de cierre" />
                            <TextInput
                                value={data.end_date}
                                type="datetime-local"
                                className="w-full"
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                            />
                            <InputError message={errors.end_date} />
                        </div>
                    </div>

                    <div className="flex flex-row gap-x-3">
                        <div className="flex-1">
                            <div className="flex flex-row gap-3 items-end">
                                <div className="w-full">
                                    <InputLabel value="Usuario" />
                                    <Searcheable
                                        value={data.user_id}
                                        placeholder="Selecionar el tipo de reservacion"
                                        datalist={users.map((e, i) => (
                                            <SearcheableItem
                                                value={e.id}
                                                text={`${e.firstname} ${e.lastname}`}
                                                index={i}
                                                key={i}
                                            >
                                                <div className="text-gray-600">
                                                    <div className="flex flex-row  justify-between items-center">
                                                        <div className="flex-1 flex flex-col">
                                                            <div>{`${e.firstname} ${e.lastname}`}</div>
                                                            <div className="text-xs flex gap-x-2">
                                                                <div>
                                                                    {e.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SearcheableItem>
                                        ))}
                                        onChange={(value) =>
                                            setData("user_id", value)
                                        }
                                    />
                                </div>
                            </div>
                            <InputError message={errors.user_id} />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-row gap-3 items-end">
                                <div className="w-full">
                                    <InputLabel value="Tipo de reservacion" />
                                    <Searcheable
                                        value={data.type_reservation_id}
                                        placeholder="Selecionar el tipo de reservacion"
                                        datalist={types.map((e, i) => (
                                            <SearcheableItem
                                                value={e.id}
                                                text={e.name}
                                                index={i}
                                                key={i}
                                            >
                                                <div className="text-gray-600">
                                                    <div className="flex flex-row  justify-between items-center">
                                                        <div className="flex-1 flex flex-col">
                                                            <div>{e.name}</div>
                                                            <div className="text-xs">
                                                                {e.desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SearcheableItem>
                                        ))}
                                        onChange={(value) =>
                                            setData(
                                                "type_reservation_id",
                                                value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <InputError message={errors.user_id} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div>Horarios</div>

                        <div className="flex gap-3 px-5 py-3 overflow-x-scroll no-scrollbar">
                            {insumes.map((e, i) => (
                                <div
                                    key={i}
                                    onClick={() =>
                                        setData("insume_area_id", e.id)
                                    }
                                >
                                    <InsumeItem
                                        item={e}
                                        selected={data.insume_area_id === e.id}
                                    />
                                </div>
                            ))}
                        </div>

                        <InputError message={errors.horario_id} />
                    </div>

                    <div className="mb-5">
                        <div className="flex gap-x-3">
                            <TextInput
                                type="checkbox"
                                checked={data.is_ever}
                                onChange={(e) =>
                                    setData("is_ever", e.target.checked)
                                }
                            />
                            <InputLabel value="Repetir todos los dias" />
                        </div>
                        <InputError message={errors.is_ever} />
                    </div>

                    <div>
                        <InputLabel value="Observaciones" />
                        <TextArea
                            className="w-full"
                            value={data.observations}
                            onChange={(e) =>
                                setData("observations", e.target.value)
                            }
                        />
                        <InputError message={errors.observations} />
                    </div>

                    <button className="bg-primary py-2 text-white font-semibold text-xl rounded-lg hover:shadow-md w-full">
                        Agendar Reservacion
                    </button>
                </form>
            </div>
        </div>
    );
};

const InsumeItem = ({ item, selected = false }) => {
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
                {item.name}
            </div>

            <div className="flex flex-row flex-wrap gap-1 mt-2 justify-center">
                {item.desc}
            </div>
        </div>
    );
};
