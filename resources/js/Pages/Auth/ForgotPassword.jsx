import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-white text-xl">
                ¿Olvidaste tu contraseña? No hay problema. Solo dinos tu
                dirección de correo electrónico y te enviaremos por correo
                electrónico un enlace de restablecimiento de contraseña que te
                permitirá elegir uno nuevo.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full bg-white bg-opacity-50 border-0  focus:ring-0 focus:border-white caret-gray-100 text-3xl text-white rounded-lg font-bold py-3"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Restablecer contraseña
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
