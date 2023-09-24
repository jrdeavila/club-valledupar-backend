import AppDialog from "@/Components/AppDialog";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextCurrency from "@/Components/TextCurrency";
import TextInput from "@/Components/TextInput";
import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FormPlato({ onClose, to: carta, plato }) {
    const { data, setData, post, put, processing, errors } = useForm({
        nombre: plato?.nombre ?? "",
        descripcion: plato?.descripcion ?? "",
        precio: plato?.precio ?? 0.0,
        carta_id: carta.id,
        imagen: plato?.imagen,
        disponibilidad: plato?.disponibilidad,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (plato) {
            put(route("platos.update", { carta, plato }), {
                onSuccess: () => onClose(),
            });
        } else {
            post(route("platos.store", carta), {
                onSuccess: () => onClose(),
            });
        }
    };
    return (
        <AppDialog onClose={onClose} title={`Nuevo Plato - ${carta.nombre}`}>
            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="imagen" value="Imagen" />
                    <ImagePicker
                        value={data.imagen}
                        onChange={(value) => setData("imagen", value)}
                    />
                    <InputError message={errors.imagen} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="nombre" value="Nombre" />
                    <TextInput
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        className="mt-1 block w-full"
                        autoComplete="plato-nombre"
                        isFocused={true}
                        onChange={(e) => setData("nombre", e.target.value)}
                    />
                    <InputError message={errors.nombre} className="mt-2" />
                </div>
                <div className="mt-3">
                    <InputLabel htmlFor="precio" value="Precio" />
                    <TextCurrency
                        id="precio"
                        value={data.precio}
                        type="number"
                        name="precio"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("precio", e.target.value)}
                    />
                    <InputError message={errors.precio} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="descripcion" value="Descripcion" />
                    <TextArea
                        id="descripcion"
                        type="text"
                        name="descripcion"
                        value={data.descripcion}
                        className="mt-1 block w-full"
                        rows={3}
                        onChange={(e) => setData("descripcion", e.target.value)}
                    />
                    <InputError message={errors.descripcion} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel
                        htmlFor="disponibilidad"
                        value="Disponibilidad"
                    />

                    <div className="flex flex-row items-center gap-3 form-control">
                        <div className="flex gap-2 items-center">
                            <input
                                type="radio"
                                name="disponible"
                                className="radio text-primary"
                                checked={data.disponibilidad == true}
                                onChange={(e) =>
                                    setData("disponibilidad", true)
                                }
                            />
                            <p>Disponible</p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <input
                                type="radio"
                                name="disponible"
                                checked={data.disponibilidad == false}
                                className="radio text-primary"
                                onChange={(e) =>
                                    setData("disponibilidad", false)
                                }
                            />
                            <p>No Disponible</p>
                        </div>
                    </div>
                    <InputError
                        message={errors.disponibilidad}
                        className="mt-2"
                    />
                </div>

                <div className="mt-10">
                    <button className="btn bg-primary w-full py-3 rounded-lg text-white text-xl">
                        {processing ? "Registrando..." : "Registrar"}
                    </button>
                </div>
            </form>
        </AppDialog>
    );
}

const ImagePicker = ({ value, onChange }) => {
    const [image, setImage] = useState(value);

    useEffect(() => {
        if (value && typeof value == "string") {
            fetch(value)
                .then((res) => res.blob())
                .then((res) => handleSetImage(res));
        }
    }, [value]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            // Aquí puedes realizar acciones con la imagen seleccionada, como mostrarla o enviarla al servidor
            const imageFile = acceptedFiles[0];
            handleSetImage(imageFile);
        },
    });
    const handleSetImage = (blob) => {
        setImage(URL.createObjectURL(blob));
        onChange(blob);
    };

    const handleClearImage = () => {
        setImage(null);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            {...getRootProps()}
            className=" shadow-md p-5 rounded-lg select-none h-72"
        >
            {image ? (
                <div className="fixed">
                    <div
                        onClick={handleClearImage}
                        className="backdrop-blur rounded-full p-5 w-16 h-16 flex justify-center items-center"
                    >
                        <FontAwesomeIcon
                            icon={faClose}
                            className="text-3xl text-white"
                        />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    <FontAwesomeIcon
                        icon={faUpload}
                        className="text-9xl text-primary"
                    />

                    <label className="mt-4">
                        <input {...getInputProps()} />
                        <div className="text-xl text-white bg-primary px-3 py-2 text-center rounded-lg">
                            SELECCIONA
                        </div>
                    </label>

                    <h2 className="text-center text-xl">
                        O Arrastra y suelta una imagen aqui
                    </h2>
                </div>
            )}
        </div>
    );
};
