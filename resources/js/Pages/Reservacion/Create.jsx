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

export const formreservacion = ({ users, insumes = [], types = [] }) => {
    const { data, setdata, errors, post } = useform({
        start_date: "",
        end_date: "",
        type_reservation_id: 0,
        insume_area_id: 0,
        is_ever: false,
        observations: "",
        user_id: 0,
    });

    const [showform, setshowform] = usestate(false);

    const handlesubmit = (e) => {
        e.preventdefault();
        post(route("reservaciones.store"));
    };

    const handleopenform = (e) => {
        e.preventdefault();
        setshowform(true);
    };

    const handlecloseform = () => {
        setshowform(false);
    };

    return (
        <div classname="w-full lg:w-2/3 bg-white rounded-lg p-5 select-none">
            <div classname="flex flex-col gap-y-3">
                <div classname="text-xl text-gray-400 font-semibold">
                    informacion de la reservacion
                </div>
                <form classname="flex flex-col gap-y-3" onsubmit={handlesubmit}>
                    <div classname="flex flex-row gap-x-5">
                        <div classname="flex-1">
                            <inputlabel value="fecha de inicio" />
                            <textinput
                                value={data.start_date}
                                type="datetime-local"
                                classname="w-full"
                                onchange={(e) =>
                                    setdata("start_date", e.target.value)
                                }
                            />
                            <inputerror message={errors.start_date} />
                        </div>
                        <div classname="flex-1">
                            <inputlabel value="fecha de cierre" />
                            <textinput
                                value={data.end_date}
                                type="datetime-local"
                                classname="w-full"
                                onchange={(e) =>
                                    setdata("end_date", e.target.value)
                                }
                            />
                            <inputerror message={errors.end_date} />
                        </div>
                    </div>

                    <div classname="flex flex-row gap-x-3">
                        <div classname="flex-1">
                            <div classname="flex flex-row gap-3 items-end">
                                <div classname="w-full">
                                    <inputlabel value="usuario" />
                                    <searcheable
                                        value={data.user_id}
                                        placeholder="selecionar el tipo de reservacion"
                                        datalist={users.map((e, i) => (
                                            <searcheableitem
                                                value={e.id}
                                                text={`${e.firstname} ${e.lastname}`}
                                                index={i}
                                                key={i}
                                            >
                                                <div classname="text-gray-600">
                                                    <div classname="flex flex-row  justify-between items-center">
                                                        <div classname="flex-1 flex flex-col">
                                                            <div>{`${e.firstname} ${e.lastname}`}</div>
                                                            <div classname="text-xs flex gap-x-2">
                                                                <div>
                                                                    {e.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </searcheableitem>
                                        ))}
                                        onchange={(value) =>
                                            setdata("user_id", value)
                                        }
                                    />
                                </div>
                            </div>
                            <inputerror message={errors.user_id} />
                        </div>

                        <div classname="flex-1">
                            <div classname="flex flex-row gap-3 items-end">
                                <div classname="w-full">
                                    <inputlabel value="tipo de reservacion" />
                                    <searcheable
                                        value={data.type_reservation_id}
                                        placeholder="selecionar el tipo de reservacion"
                                        datalist={types.map((e, i) => (
                                            <searcheableitem
                                                value={e.id}
                                                text={e.name}
                                                index={i}
                                                key={i}
                                            >
                                                <div classname="text-gray-600">
                                                    <div classname="flex flex-row  justify-between items-center">
                                                        <div classname="flex-1 flex flex-col">
                                                            <div>{e.name}</div>
                                                            <div classname="text-xs">
                                                                {e.desc}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </searcheableitem>
                                        ))}
                                        onchange={(value) =>
                                            setdata(
                                                "type_reservation_id",
                                                value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <inputerror message={errors.user_id} />
                        </div>
                    </div>
                    <div classname="flex-1 flex flex-col">
                        <div>horarios</div>

                        <div classname="flex gap-3 px-5 py-3 overflow-x-scroll no-scrollbar">
                            {insumes.map((e, i) => (
                                <div
                                    key={i}
                                    onclick={() =>
                                        setdata("insume_area_id", e.id)
                                    }
                                >
                                    <insumeitem
                                        item={e}
                                        selected={data.insume_area_id === e.id}
                                    />
                                </div>
                            ))}
                        </div>

                        <inputerror message={errors.horario_id} />
                    </div>

                    <div classname="mb-5">
                        <div classname="flex gap-x-3">
                            <textinput
                                type="checkbox"
                                checked={data.is_ever}
                                onchange={(e) =>
                                    setdata("is_ever", e.target.checked)
                                }
                            />
                            <inputlabel value="repetir todos los dias" />
                        </div>
                        <inputerror message={errors.is_ever} />
                    </div>

                    <div>
                        <inputlabel value="observaciones" />
                        <textarea
                            classname="w-full"
                            value={data.observations}
                            onchange={(e) =>
                                setdata("observations", e.target.value)
                            }
                        />
                        <inputerror message={errors.observations} />
                    </div>

                    <button classname="bg-primary py-2 text-white font-semibold text-xl rounded-lg hover:shadow-md w-full">
                        agendar reservacion
                    </button>
                </form>
            </div>
        </div>
    );
};

const insumeitem = ({ item, selected = false }) => {
    return (
        <div
            style={{
                minwidth: "16rem",
                height: "10rem",
            }}
            classname={` ${
                !selected ? "bg-gray-100" : "bg-green-100"
            } p-5 rounded-lg flex flex-col justify-center items-center select-none cursor-pointer transition-transform transform duration-300 hover:scale-105 hover:shadow-md`}
        >
            <div classname="font-semibold text-gray-600 text md:text-xl">
                {item.name}
            </div>

            <div classname="flex flex-row flex-wrap gap-1 mt-2 justify-center">
                {item.desc}
            </div>
        </div>
    );
};
