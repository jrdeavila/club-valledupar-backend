import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DashboardCardItem = ({ title, desc, icon, color, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-lg p-6 h-40 cursor-pointer select-none transition duration-500 transform hover:scale-105"
        >
            <div className="flex items-center mb-4">
                <FontAwesomeIcon
                    icon={icon}
                    className={`text-4xl me-4 text-${color}-400`}
                />
                <h2 className="text-3xl font-semibold">{title}</h2>
            </div>
            <p className="text-gray-600">{desc}</p>
        </div>
    );
};
