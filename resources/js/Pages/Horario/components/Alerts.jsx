import AppDialog from "@/Components/AppDialog";
import PrimaryButton from "@/Components/PrimaryButton";

export const AlertDeleting = ({ onClose, onConfirm, title }) => {
    return (
        <AppDialog onClose={onClose} title={`Eliminar Horario ${title}`}>
            <div className="flex flex-col ">
                <div className="text-xl text-gray-600">
                    {"¿Deseas eliminar este insumo?"}
                </div>
                <div className="flex justify-center gap-x-3 mt-4">
                    <PrimaryButton
                        className="w-full flex justify-center"
                        onClick={onClose}
                    >
                        Cancelar
                    </PrimaryButton>
                    <PrimaryButton
                        className="w-full flex justify-center"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </PrimaryButton>
                </div>
            </div>
        </AppDialog>
    );
};
