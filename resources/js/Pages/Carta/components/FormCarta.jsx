import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import AppDialog from "@/Components/AppDialog";
import PrimaryButton from "@/Components/PrimaryButton";

export default function FormCarta({ onClose, carta }) {
    const { data, setData, post, put, processing, errors } = useForm({
        nombre: carta?.nombre || "",
        descripcion: carta?.descripcion || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (carta) {
            put(route("cartas.update", carta.id), {
                onSuccess: onClose,
            });
        } else {
            post(route("cartas.store"), {
                onSuccess: onClose,
            });
        }
    };

    return (
        <AppDialog onClose={onClose} title="Nueva Carta">
            <form onSubmit={handleSubmit}>
                <div>
                    <TextInput
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        className="mt-1 block w-full text-6xl text-white font-bold border-0 border-none border-transparent outline-none placeholder:text-gray-100 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none bg-transparent caret-gray-200 caret-thin"
                        placeholder="Nombre de la carta..."
                        autoComplete="carta-nombre"
                        isFocused={true}
                        onChange={(e) => setData("nombre", e.target.value)}
                    />
                    <InputError message={errors.nombre} className="mt-2" />
                </div>

                <div className="mt-4">
                    <TextArea
                        id="descripcion"
                        type="text"
                        name="descripcion"
                        value={data.descripcion}
                        placeholder="Descripcion de la carta..."
                        className="text-2xl text-white font-bold mt-1 block w-full  bg-transparent border-0 border-none border-transparent outline-none placeholder:text-gray-100 focus:outline-none focus:ring-0 focus:border-none focus:ring-transparent shadow-none caret-gray-200 caret-thin "
                        rows={3}
                        onChange={(e) => setData("descripcion", e.target.value)}
                    />
                    <InputError message={errors.descripcion} className="mt-2" />
                </div>

                <div className="mt-10 flex flex-row justify-end">
                    <PrimaryButton className="btn bg-white py-3 rounded-lg text-xl flex justify-center">
                        {processing ? "Registrando..." : "Registrar"}
                    </PrimaryButton>
                </div>
            </form>
        </AppDialog>
    );
}
