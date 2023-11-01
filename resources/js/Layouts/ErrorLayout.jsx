import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorLayout = ({ children }) => {
    const { errors } = usePage().props;

    useEffect(() => {
        Object.keys(errors).forEach((key) => {
            toast.error(errors[key], {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                style: {
                    // Tailwind Font Family
                    fontFamily: "ui-sans-serif, system-ui, -apple-system",
                },
            });
        });
    }, [errors]);
    return (
        <div>
            <ToastContainer
                style={{
                    zIndex: 100001,
                }}
            />
            {children}
        </div>
    );
};
export default ErrorLayout;
