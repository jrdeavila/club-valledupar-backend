import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Searcheable, { SearcheableItem } from "@/Components/Sercheable";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import moment from "moment";
import "moment/locale/es.js";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const FormReservacion = ({ users, types = [], start, end }) => {
    const { data, setData, errors, post } = useForm({
        start_date: start,
        end_date: end,
        insume_area_id: 0,
        is_ever: false,
        is_all_day: false,
        observations: "",
        user_id: 0,
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("reservaciones.store"));
    };

    const selectables = (
        <>
            <div className="flex flex-row gap-x-3">
                <div className="flex-1">
                    <div className="flex flex-row gap-3 items-end">
                        <div className="w-full">
                            <InputLabel value="Usuario" />
                            <Searcheable
                                value={data.user_id}
                                placeholder="Usuario solicitante"
                                datalist={users.map((e, i) => (
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
                                                    <div className="text-xs flex gap-x-2">
                                                        <div>{e.email}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SearcheableItem>
                                ))}
                                onChange={(value) => setData("user_id", value)}
                            />
                        </div>
                    </div>
                    <InputError message={errors.user_id} />
                </div>

                <div className="flex-1">
                    <div className="flex flex-row gap-3 items-end">
                        <div className="w-full">
                            <InputLabel value="Insumo a reservar" />
                            <Searcheable
                                value={data.insume_area_id}
                                placeholder="Selecionar Insumo"
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
                                                </div>
                                            </div>
                                        </div>
                                    </SearcheableItem>
                                ))}
                                onChange={(value) =>
                                    setData("insume_area_id", value)
                                }
                            />
                        </div>
                    </div>
                    <InputError message={errors.insume_area_id} />
                </div>
            </div>
        </>
    );

    return (
        <div className="select-none w-full">
            <div className="flex flex-col gap-y-3">
                <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-x-5">
                        <div className="flex-1 text-6xl text-white font-bold">
                            {`${moment(data.start_date).format(
                                "HH:mm A"
                            )} - ${moment(data.end_date).format("HH:mm A")}`}
                        </div>
                    </div>

                    {selectables}

                    <div>
                        <InputLabel value="Observaciones" />
                        <TextArea
                            rows={7}
                            className="w-full text-xl font-bold bg-transparent backdrop-blur-lg border-2 border-white rounded-lg p-3 text-white focus:outline-none focus:ring-0 focus:border-white"
                            value={data.observations}
                            onChange={(e) =>
                                setData("observations", e.target.value)
                            }
                        />
                        <InputError message={errors.observations} />
                    </div>

                    <div className="mb-5">
                        <div className="flex gap-x-3 items-center">
                            <TextInput
                                type="checkbox"
                                className="w-6 text-transparent"
                                checked={data.is_ever}
                                onChange={(e) =>
                                    setData("is_ever", e.target.checked)
                                }
                            />
                            <div className="text-white font-bold text-xl">
                                Repetir todos los dias
                            </div>
                        </div>
                        <InputError message={errors.is_ever} />
                    </div>
                    <div className="mb-5">
                        <div className="flex gap-x-3 items-center">
                            <TextInput
                                type="checkbox"
                                className="w-6 text-transparent"
                                checked={data.is_all_day}
                                onChange={(e) =>
                                    setData("is_all_day", e.target.checked)
                                }
                            />
                            <div className="text-white font-bold text-xl">
                                Todo el dia
                            </div>
                        </div>
                        <InputError message={errors.is_all_day} />
                    </div>

                    <PrimaryButton className="flex justify-center">
                        Agendar Reservacion
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};
