import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { FormatHiAtoHHmm } from "@/Utils/TimeFormat";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

const FormHorario = ({ onClose, horario: insume }) => {
    const [tabIndex, setTabIndex] = useState(1);
    const [daySettings, setDaySettings] = useState(0);
    const { data, setData, errors, processing, post, patch } = useForm({
        insume: {
            title: insume?.insume?.title ?? "",
            description: insume?.insume?.description ?? "",
        },
        schedule: {
            fecha_apertura: FormatHiAtoHHmm(insume?.fecha_apertura),
            fecha_cierre: FormatHiAtoHHmm(insume?.fecha_cierre),
            lunes: insume?.dia?.lunes ?? false,
            martes: insume?.dia?.martes ?? false,
            miercoles: insume?.dia?.miercoles ?? false,
            jueves: insume?.dia?.jueves ?? false,
            viernes: insume?.dia?.viernes ?? false,
            sabado: insume?.dia?.sabado ?? false,
            domingo: insume?.dia?.domingo ?? false,
        },
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
        if (insume) {
            patch(route("horarios.update", insume), {
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

    const errorBox = (
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
    );

    const customDaySelector = (
        <div className="flex flex-wrap gap-3 p-4">
            {Object.keys(data.schedule)
                .filter((key) => {
                    return typeof data[key] === "boolean";
                })
                .map((e, index) => (
                    <div key={index} className="flex gap-2 items-center me-3">
                        <TextInput
                            type="checkbox"
                            className="w-6 text-transparent"
                            {...{
                                checked: data[e],
                                onChange: () =>
                                    setData(`insume.${e}`, !data[e]),
                            }}
                        />
                        <div className="text-white">{TextCapitalize(e)}</div>
                    </div>
                ))}
        </div>
    );

    const scheduleFields = (
        <>
            <div className="mb-3">
                <InputLabel
                    value="Fecha de Apertura"
                    htmlFor="fecha_apertura"
                />

                <TextInput
                    value={data.fecha_apertura}
                    name="fecha_apertura"
                    type="time"
                    className="w-full font-bold bg-opacity-40 bg-white"
                    onChange={(e) => setData("fecha_apertura", e.target.value)}
                />
                <InputError message={errors.fecha_apertura} />
            </div>
            <div className="mb-3">
                <InputLabel value="Fecha de Cierre" htmlFor="fecha_cierre" />

                <TextInput
                    value={data.fecha_cierre}
                    name="fecha_cierre"
                    type="time"
                    className="w-full font-bold bg-opacity-40 bg-white"
                    onChange={(e) => setData("fecha_cierre", e.target.value)}
                />
                <InputError message={errors.fecha_cierre} />
            </div>
            <div className="mb-3">
                <InputLabel
                    value="Dias en los que aplica"
                    htmlFor="fecha_apertura"
                    className="font-bold"
                />

                <select
                    className="border-white border-2 focus:border-white focus:ring-white focus:ring-0 bg-opacity-40 bg-white text-white font-bold rounded-md shadow-sm w-full"
                    onChange={(e) => setDaySettings(e.target.value)}
                >
                    {[
                        "Todos los dias",
                        "Todos, excepto fin de semana",
                        "Fin de semana",
                        "Personalizado",
                    ].map((e, i) => (
                        <option
                            className="text-gray-600 border-b-2 border-white "
                            key={i}
                            value={i}
                        >
                            {e}
                        </option>
                    ))}
                </select>
            </div>
            {daySettings == 3 ? customDaySelector : undefined}
            <div className="flex gap-2 mt-5">
                {!processing && (
                    <PrimaryButton
                        className="w-full flex justify-center"
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                    >
                        Cancelar
                    </PrimaryButton>
                )}
                <PrimaryButton className="w-full flex justify-center">
                    {processing ? "Guardando..." : "Guardar"}
                </PrimaryButton>
            </div>
        </>
    );

    const insumeDataFields = (
        <>
            <div className="mb-3">
                <InputLabel value="Titulo" htmlFor="title" />

                <TextInput
                    value={data.title}
                    name="title"
                    type="text"
                    className="w-full font-bold bg-opacity-40 bg-white"
                    onChange={(e) => setData("title", e.target.value)}
                />
                <InputError message={errors.description} />
            </div>
            <div className="mb-3">
                <InputLabel value="Descripcion" htmlFor="description" />

                <TextArea
                    value={data.description}
                    name="description"
                    type="text"
                    rows={5}
                    className="w-full font-bold bg-opacity-40 bg-white"
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} />
            </div>
        </>
    );
    const tabStyle = (index) =>
        `flex-1 flex justify-center items-center text-white font-bold text-xl hover:bg-white hover:bg-opacity-40 ${
            tabIndex === index ? "border-b-2 border-white" : ""
        }`;

    const tabContent = (index) => ({
        onClick: () => setTabIndex(index),
        className: tabStyle(index),
    });

    const tabViews = (index) =>
        ({
            1: insumeDataFields,
            2: scheduleFields,
        }[index]);
    return (
        <div className="flex flex-row w-full">
            <form onSubmit={handleSubmit} className="p-4 w-full">
                <div className="flex h-10 mb-4 transform transition-transform duration-300">
                    <div {...tabContent(1)}>Descripcion</div>
                    <div {...tabContent(2)}>Disponbilidad</div>
                </div>

                {errorBox}
                {tabViews(tabIndex)}
            </form>
        </div>
    );
};

export default FormHorario;
