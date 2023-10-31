import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FloatingButton = ({ icon, label, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="h-16  bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl flex justify-center items-center px-4 transform transition-transform duration-300 hover:scale-105"
        >
            <div className="flex justify-center gap-x-3">
                <div className="text-white text-xl">{label}</div>
                <FontAwesomeIcon icon={icon} className="text-white text-3xl" />
            </div>
        </div>
    );
};
