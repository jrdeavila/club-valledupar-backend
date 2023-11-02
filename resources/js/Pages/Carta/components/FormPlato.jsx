import AppDialog from "@/Components/AppDialog";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import TextCurrency from "@/Components/TextCurrency";
import TextInput from "@/Components/TextInput";
import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FormPlato({ onClose, to: carta, plato }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: plato ? "put" : "post",
        nombre: plato?.nombre ?? "",
        descripcion: plato?.descripcion ?? "",
        precio: plato?.precio ?? 0.0,
        carta_id: carta.id,
        imagen: plato?.imagen,
        disponibilidad: plato?.disponibilidad ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (plato) {
            post(route("platos.update", { carta, plato }), {
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
                    <ImagePicker
                        value={data.imagen}
                        onChange={(value) => setData("imagen", value)}
                    />
                    <InputError message={errors.imagen} className="mt-2" />
                </div>
                <div className="mt-4">
                    <TextInput
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        className="mt-1 block w-full text-6xl text-white font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-100 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        autoComplete="plato-nombre"
                        placeholder="Nombre del plato..."
                        isFocused={true}
                        onChange={(e) => setData("nombre", e.target.value)}
                    />
                    <InputError message={errors.nombre} className="mt-2" />
                </div>
                <div className="mt-3">
                    <TextCurrency
                        id="precio"
                        value={data.precio}
                        type="number"
                        name="precio"
                        placeholder="Precio del plato... (Ej: $ 2.000)"
                        className="mt-1 block w-full text-6xl text-white font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-100 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        onChange={(e) => setData("precio", e.target.value)}
                    />
                    <InputError message={errors.precio} className="mt-2" />
                </div>

                <div className="mt-4">
                    <TextArea
                        id="descripcion"
                        type="text"
                        name="descripcion"
                        value={data.descripcion}
                        className="mt-1 block w-full text-2xl text-white font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-100 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        placeholder="Descripcion del plato..."
                        rows={3}
                        onChange={(e) => setData("descripcion", e.target.value)}
                    />
                    <InputError message={errors.descripcion} className="mt-2" />
                </div>

                <div className="mt-10 flex justify-end">
                    <PrimaryButton className="btn bg-primary py-3 rounded-lg text-xl">
                        {processing ? "Registrando..." : "Registrar"}
                    </PrimaryButton>
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
            className="p-5 rounded-lg select-none h-72 border-2 border-gray-100 outline-none focus:outline-none cursor-pointer"
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
                        className="text-9xl text-white"
                    />

                    <label className="mt-4">
                        <input {...getInputProps()} />
                        <div className="text-4xl text-white font-bold text-center">
                            Selecciona o arrastra una imagen
                        </div>
                    </label>
                </div>
            )}
        </div>
    );
};
