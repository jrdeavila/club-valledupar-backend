import { router } from "@inertiajs/react";

export const onUpdateState = (state, event) => {
    router.patch(
        route("reservaciones.estado", event),
        {
            estado: state,
        },
        {
            onSuccess: () => window.location.reload(),
        }
    );
};
