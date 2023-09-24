import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextArea from "@/Components/TextArea";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import AppDialog from "@/Components/AppDialog";

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
                    <InputLabel htmlFor="title" value="Titulo" />
                    <TextInput
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        className="mt-1 block w-full"
                        autoComplete="carta-nombre"
                        isFocused={true}
                        onChange={(e) => setData("nombre", e.target.value)}
                    />
                    <InputError message={errors.nombre} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="description" value="Descripcion" />
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

                <div className="mt-10">
                    <button className="btn bg-primary w-full py-3 rounded-lg text-white text-xl">
                        {processing ? "Registrando..." : "Registrar"}
                    </button>
                </div>
            </form>
        </AppDialog>
    );
}
