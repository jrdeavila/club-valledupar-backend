import { TextCapitalize } from "@/Utils/TextCapitalize";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const buildTitle = (horario) => {
    return `Abierto de ${horario.fecha_apertura} hasta ${horario.fecha_cierre}`;
};
const InsumeItem = ({ insume, onUpdate, onDelete }) => {
    const scheduleInfo = (schedule) => {
        return (
            <div className="bg-white bg-opacity-40 rounded-md px-5 py-3">
                <div className="text-white text-2xl font-bold">
                    {buildTitle(schedule)}
                </div>
                <div className="flex flex-row flex-wrap gap-1">
                    <div className="text text-white font-bold">
                        {"Días de atención: "}
                    </div>
                    {Object.keys(schedule.dias)
                        .filter((e) => !!schedule.dias[e])
                        .map((e, index) => {
                            return (
                                <div
                                    className="text-white font-light"
                                    key={index}
                                >{`${TextCapitalize(e)},`}</div>
                            );
                        })}
                </div>
            </div>
        );
    };
    return (
        <div className="relative group bg-white bg-opacity-40 backdrop-blur-lg rounded-lg shadow-lg p-5  select-none transition duration-300 transform hover:scale-105">
            <div onClick={onUpdate}>
                <div className="flex flex-col gap-y-3">
                    <div className="text-white text-4xl font-bold">
                        {insume.name}
                    </div>
                    <div className="flex flex-col gap-y-3">
                        {insume.schedules.map((e, index) => (
                            <div key={index}>{scheduleInfo(e)}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                onClick={onDelete}
                className="absolute z-0 top-6 right-5 cursor-pointer opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            >
                <FontAwesomeIcon
                    icon={faTrash}
                    className="text-white text-2xl"
                />
            </div>
        </div>
    );
};

const InsumeItemStyled = styled(InsumeItem)`
    min-width: 300px;
`;

export default InsumeItemStyled;
