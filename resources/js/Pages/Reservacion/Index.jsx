import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { Head, router } from "@inertiajs/react";
import "moment/locale/es.js";
import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getReservationDate } from "./utils/date";
import CustomCalendar from "./components/CustomCalendar";

export default function Reservaciones({
    auth: { user },
    reservaciones: { data: reservations },
    tipos: types,
}) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        let events = mapEvents(reservations);
        setEvents(events);
    }, []);

    const mapEvents = (reservations) => {
        return reservations.map((reservacion) => {
            const [beginDate, endDate] = getReservationDate(reservacion);
            return {
                id: reservacion.id,
                title: reservacion.title,
                start: beginDate,
                end: endDate,
                desc: reservacion.desc,
                bgColor: reservacion.color,
                allDay: true,
                rrule: {
                    freq: "daily",
                    dtstart: beginDate,
                    until: endDate,
                },
            };
        });
    };

    const handleOnCreate = () => {
        window.location = route("reservaciones.create");
    };

    const handleOnSelectType = (type) => {
        router.get(route("reservaciones.index", { type: type.id }));
    };

    const EventAgenda = () => {
        return (
            <div className="relative flex flex-col justify-center items-center">
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <div className="w-full p-4">
                        <div className="flex flex-row justify-center gap-x-5 h-28">
                            {types.map((e, i) => (
                                <CalendarTabItem
                                    key={i}
                                    name={e.name}
                                    onClick={() => handleOnSelectType(e)}
                                />
                            ))}{" "}
                        </div>{" "}
                    </div>{" "}
                    <div className="mx-4">
                        {" "}
                        <CustomCalendar events={events} />{" "}
                    </div>{" "}
                </div>{" "}
            </div>
        );
    };
    return (
        <Authenticated
            user={user}
            header={
                <div className="flex justify-between items-center select-none">
                    <div className="font-semibold text-2xl text-gray-800 leading-tight">
                        Reservaciones
                    </div>
                    <button
                        onClick={handleOnCreate}
                        className="bg-primary px-3 py-2 rounded-lg text-white font-semibold transition duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        Nueva Reservacion
                    </button>
                </div>
            }
        >
            <div>
                <Head title="Reservaciones" />
                <EventAgenda />
            </div>
        </Authenticated>
    );
}

const CalendarTabItem = ({ name, ...props }) => {
    return (
        <div
            {...props}
            className="flex flex-row gap-x-3 items-center justify-center px-3 py-2  backdrop  backdrop-blur-lg  bg-white bg-opacity-25 rounded-lg text-white font-bold text-2xl w-64 hover:scale-110 transform transition duration-300 cursor-pointer text-center"
        >
            <div>{TextCapitalize(name)}</div>
        </div>
    );
};
