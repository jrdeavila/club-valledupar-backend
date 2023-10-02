import AppDialog from "@/Components/AppDialog";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { useForm } from "@inertiajs/react";

const CreateUser = ({ tipos, onClose }) => {
    const { data, setData, errors, post, processing } = useForm({
        email: "",
        firstname: "",
        lastname: "",
        phone: "",
        role_id: 3,
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
                                value={data.firstname}
                                onChange={(e) =>
                                    setData("firstname", e.target.value)
                                }
                                className="w-full"
                            />
                            <InputError message={errors.firstname} />
                        </div>
                        <div className="flex-1">
                            <InputLabel value="Apellidos" />
                            <TextInput
                                value={data.lastname}
                                onChange={(e) =>
                                    setData("lastname", e.target.value)
                                }
                                className="w-full "
                            />
                            <InputError message={errors.lastname} />
                        </div>
                    </div>
                    <div className="flex-1">
                        <InputLabel value="Telefono" />
                        <TextInput
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full "
                        />
                        <InputError message={errors.phone} />
                    </div>
                    <div className="flex-1">
                        <InputLabel value="Rol" />
                        <TextInput
                            value={TextCapitalize(
                                tipos.find((e) => e.id === data.role_id)?.nombre
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

export default CreateUser;
