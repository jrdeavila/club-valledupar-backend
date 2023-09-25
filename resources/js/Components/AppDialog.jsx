import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AppDialog({ children, onClose, title }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-sm">
            <div className="p-5 w-full mx-5  lg:w-1/2 lg:mx-0  bg-white  rounded-lg shadow-lg select-none">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="font-semibold text-2xl text-gray-800 ">
                        {title}
                    </h2>
                    <button className="btn">
                        <FontAwesomeIcon
                            icon={faClose}
                            className="mr-2 text-2xl text-primary"
                            onClick={onClose}
                        />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}