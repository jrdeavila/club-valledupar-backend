import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { FormatHiAtoHHmm } from "@/Utils/TimeFormat";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const FormHorario = ({ onClose, horario }) => {
    const [daySettings, setDaySettings] = useState(0);
    const { data, setData, errors, processing, post, patch } = useForm({
        fecha_apertura: FormatHiAtoHHmm(horario?.fecha_apertura),
        fecha_cierre: FormatHiAtoHHmm(horario?.fecha_cierre),
        lunes: horario?.dia?.lunes ?? false,
        martes: horario?.dia?.martes ?? false,
        miercoles: horario?.dia?.miercoles ?? false,
        jueves: horario?.dia?.jueves ?? false,
        viernes: horario?.dia?.viernes ?? false,
        sabado: horario?.dia?.sabado ?? false,
        domingo: horario?.dia?.domingo ?? false,
    });

    const handlerDaySettings = {
        0: () => {
            setData({
                ...data,
                lunes: true,
                martes: true,
                miercoles: true,
                jueves: true,
                viernes: true,
                sabado: true,
                domingo: true,
            });
        },
        1: () => {
            setData({
                ...data,
                lunes: true,
                martes: true,
                miercoles: true,
                jueves: true,
                viernes: true,
                sabado: false,
                domingo: false,
            });
        },
        2: () => {
            setData({
                ...data,
                lunes: false,
                martes: false,
                miercoles: false,
                jueves: false,
                viernes: false,
                sabado: true,
                domingo: true,
            });
        },
        3: () => {
            setData({
                ...data,
                lunes: false,
                martes: false,
                miercoles: false,
                jueves: false,
                viernes: false,
                sabado: false,
                domingo: false,
            });
        },
    };

    useEffect(() => {
        handlerDaySettings[daySettings] && handlerDaySettings[daySettings]();
    }, [daySettings]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (horario) {
            patch(route("horarios.update", horario), {
                onSuccess: () => onClose(),
                onCancel: (err) => {
                    console.log(err);
                },
            });
        } else {
            post(route("horarios.store"), {
                onSuccess: () => onClose(),
                onError: (err) => {
                    console.error(err);
                },
            });
        }
    };

    return (
        <div className="flex flex-row w-full">
            <form onSubmit={handleSubmit} className="p-4 w-full">
                <div className="mb-3">
                    <InputLabel
                        value="Fecha de Apertura"
                        htmlFor="fecha_apertura"
                    />

                    <TextInput
                        value={data.fecha_apertura}
                        name="fecha_apertura"
                        type="time"
                        className="w-full"
                        onChange={(e) =>
                            setData("fecha_apertura", e.target.value)
                        }
                    />
                    <InputError message={errors.fecha_apertura} />
                </div>
                <div className="mb-3">
                    <InputLabel
                        value="Fecha de Cierre"
                        htmlFor="fecha_cierre"
                    />

                    <TextInput
                        value={data.fecha_cierre}
                        name="fecha_cierre"
                        type="time"
                        className="w-full"
                        onChange={(e) =>
                            setData("fecha_cierre", e.target.value)
                        }
                    />
                    <InputError message={errors.fecha_cierre} />
                </div>
                <div className="mb-3">
                    <InputLabel
                        value="Dias en los que aplica"
                        htmlFor="fecha_apertura"
                    />

                    <select
                        className="border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm w-full"
                        onChange={(e) => setDaySettings(e.target.value)}
                    >
                        {[
                            "Todos los dias",
                            "Todos, excepto fin de semana",
                            "Fin de semana",
                            "Personalizado",
                        ].map((e, i) => (
                            <option key={i} value={i}>
                                {e}
                            </option>
                        ))}
                    </select>
                </div>
                {daySettings == 3 ? (
                    <div className="flex flex-wrap gap-3 p-4">
                        {Object.keys(data)
                            .filter((key) => {
                                return typeof data[key] === "boolean";
                            })
                            .map((e, index) => (
                                <div
                                    key={index}
                                    className="flex gap-2 items-center me-3"
                                >
                                    <TextInput
                                        type="checkbox"
                                        {...{
                                            checked: data[e],
                                            onChange: () =>
                                                setData(e, !data[e]),
                                        }}
                                    />
                                    <div className="text">
                                        {TextCapitalize(e)}
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : undefined}
                <div className="flex flex-col gap-3 p-4">
                    {errors &&
                        Object.keys(errors)
                            .filter((key) => {
                                return !["fecha_apertura", "fecha_cierre"].some(
                                    (e) => e == key
                                );
                            })

                            .map((e, index) => (
                                <InputError
                                    key={index}
                                    message={errors[e]}
                                    className="list-item"
                                />
                            ))}
                </div>
                <div className="flex gap-2 mt-5">
                    {!processing && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                            }}
                            className="btn bg-white border-primary border-2 text-primary rounded-lg px-3 py-2 flex-1 font-semibold"
                        >
                            Cancelar
                        </button>
                    )}
                    <button className="btn bg-primary text-white rounded-lg px-3 py-2 flex-1 font-semibold">
                        {processing ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormHorario;
