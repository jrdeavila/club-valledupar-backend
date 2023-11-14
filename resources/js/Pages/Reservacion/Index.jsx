import AppDialog from "@/Components/AppDialog";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { Head, router } from "@inertiajs/react";
import moment from "moment";
import "moment/locale/es.js";
import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomCalendar from "./components/CustomCalendar";
import { getReservationDate } from "./utils/date";
import { FormReservacion } from "./components/Form";

export default function Reservaciones({
    auth: { user, roles },
    reservaciones: { data: reservations },
    types: { data: types },
    users: { data: users },
}) {
    const [events, setEvents] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [slot, setSlot] = useState(null);

    useEffect(() => {
        let events = mapEvents(reservations);
        setEvents(events);
    }, []);

    useEffect(() => {
        // Get url params
        let type = getTypeId();
        let schedules = types[type - 1]?.schedules ?? [];
        setSchedules(schedules);
    }, []);

    const getTypeId = () => {
        const params = new URLSearchParams(window.location.search);
        let type = params.get("type");
        return type;
    };

    const mapEvents = (reservations) => {
        return reservations.map((reservacion) => {
            const [beginDate, endDate] = getReservationDate(reservacion);
            return {
                id: reservacion.id,
                title: reservacion.user,
                start: beginDate.toDate(),
                end: endDate.toDate(),
                allDay: reservacion.is_all_day,
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
            <div className="flex flex-col justify-center items-center">
                <div
                    style={{
                        width: "100%",
                    }}
                >
                    <div className="w-full p-8">
                        <div className="flex flex-row justify-center gap-x-5 w-full h-full overflow-x-scroll no-scrollbar">
                            {types.map((e, i) => (
                                <CalendarTabItem
                                    key={i}
                                    name={e.name}
                                    select={e.id === getTypeId()}
                                    count={e.reservations_pending}
                                    onClick={() => handleOnSelectType(e)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mx-4">
                        <CustomCalendar
                            events={events}
                            schedules={schedules}
                            onSelectSlot={(slot) => setSlot(slot)}
                        />
                    </div>
                </div>
            </div>
        );
    };
    return (
        <Authenticated
            user={user}
            roles={roles}
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
                {slot && (
                    <AppDialog
                        onClose={() => setSlot(null)}
                        title="Nueva Reservacion"
                    >
                        <FormReservacion
                            users={users}
                            types={types}
                            start={slot.start.format("YYYY-MM-DD HH:mm:ss")}
                            end={slot.end.format("YYYY-MM-DD HH:mm:ss")}
                        />
                    </AppDialog>
                )}
            </div>
        </Authenticated>
    );
}

const CalendarTabItem = ({ name, select = true, count, ...props }) => {
    return (
        <div
            {...props}
            className={`${
                select ? "bg-opacity-100" : "text-white  bg-opacity-25"
            } flex flex-row gap-x-3 items-center justify-center px-3 py-2  backdrop  backdrop-blur-lg  bg-white rounded-lg font-bold text-2xl w-64 hover:scale-110 transform transition duration-300 cursor-pointer text-center`}
        >
            <div className="flex gap-x-3 justify-center items-center">
                <div>{TextCapitalize(name)}</div>
                <div>{`(${count})`}</div>
            </div>
        </div>
    );
};
