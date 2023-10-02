import Authenticated from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head } from "@inertiajs/react";
import moment from "moment";
import "moment/locale/es.js";
import { useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { dashItems, menuItems } from "./models/IndexModels";
import { getReservacionDate } from "./utils/date";
import {
    bgByEstado,
    textColorByEstado,
    tipoUsuarioColor,
} from "./utils/stateColors";
import styled from "styled-components";
import { TextCapitalize } from "@/Utils/TextCapitalize";

export default function Reservaciones({
    auth: { user },
    reservaciones: { data: reservaciones },
    tipos: { data: tipos },
}) {
    let localizer = momentLocalizer(moment);
    const menuRef = useRef();

    const [events, setEvents] = useState([]);
    const [menuPosition, setMenuPosition] = useState(null);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [eventRef, setEventRef] = useState(null);

    useEffect(() => {
        let events = reservaciones.map((reservacion) => {
            const [beginDate, endDate] = getReservacionDate(reservacion);
            return {
                id: reservacion.id,
                title: reservacion.usuario,
                start: beginDate,
                end: endDate,
                desc: TextCapitalize(reservacion.estado),
                textColor: textColorByEstado(reservacion.estado),
                bgColor: bgByEstado(reservacion.estado, reservacion.tipo),
            };
        });
        setEvents(events);
    }, []);

    useEffect(() => {
        const handleClickEventOutside = (event) => {
            if (eventRef && !eventRef.contains(event.target)) {
                setMenuPosition(null);
                setCurrentEvent(null);
            }
        };

        document.addEventListener("click", handleClickEventOutside);

        return () => {
            document.removeEventListener("click", handleClickEventOutside);
        };
    }, [menuPosition]);

    const handleSelectEvent = (event, e) => {
        const { top, left } = e.target.getBoundingClientRect();

        setMenuPosition({ x: left, y: top });
        setCurrentEvent(event);
        setEventRef(e.target);
    };

    const handleOnCreate = () => {
        window.location = route("reservaciones.create");
    };

    const DashItem = ({ title, color, icon, value = 20 }) => {
        return (
            <div
                style={{
                    minHeight: "10rem",
                }}
                className="flex-1 bg-white shadow-lg rounded-lg flex flex-col select-none justify-center"
            >
                <div
                    style={{
                        backgroundColor: color,
                    }}
                    className="flex-1 rounded-t-lg flex items-center justify-center"
                >
                    <div className="text-white text-2xl font-bold">{value}</div>
                </div>
                <div
                    style={{
                        color: color,
                    }}
                    className="flex-1 flex flex-row gap-x-3 items-center text-xl h-1/3 text-gray-500 justify-center"
                >
                    <FontAwesomeIcon icon={icon} />
                    <div>{title}</div>
                </div>
            </div>
        );
    };

    const Dash = () => {
        return (
            <div className="flex flex-col lg:flex-row gap-5 py-4   w-full">
                {dashItems(reservaciones).map((e, i) => (
                    <DashItem key={i} {...e} />
                ))}
            </div>
        );
    };

    const Menu = () => {
        return (
            <div
                ref={menuRef}
                className={` absolute z-50 select-none bg-white shadow-lg  w-64 rounded-lg ${
                    menuPosition ? "scale-100" : "scale-0"
                } transition-transform duration-400 transform origin-top-left`}
                style={{
                    height: "210px",
                    top: menuPosition.y - 90,
                    left: menuPosition.x,
                }}
            >
                <div className="flex flex-col p-2">
                    {menuItems(currentEvent).map((e, i) => (
                        <div
                            key={i}
                            onClick={e.onClick}
                            className="text-center flex flex-row gap-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer items-center"
                        >
                            <FontAwesomeIcon icon={e.icon} color={e.color} />
                            <div
                                style={{
                                    color: e.color,
                                }}
                            >
                                {e.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const EventComponent = ({ event }) => {
        return (
            <div className="flex flex-row gap-x-3 rounded-sm text-ellipsis">
                <div className="text-sm">{event.title}</div>
                <div className="font-bold text-sm">{event.desc}</div>
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

                <div className="flex flex-col justify-center items-center gap-y-5 mx-10">
                    <Dash />
                    <div
                        style={{
                            minHeight: "45rem",
                            width: "100%",
                        }}
                        className=" bg-white rounded-lg shadow-lg mx-5 px-5"
                    >
                        <div className="flex flex-col gap-y-3 py-4 lg:px-4">
                            <div>Tipo de Reservacion</div>
                            <div className="flex flex-row gap-x-3">
                                {tipos.map((e, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-row gap-x-3 items-center justify-center px-3 py-2 bg-white rounded-lg"
                                    >
                                        <div
                                            style={{
                                                backgroundColor:
                                                    tipoUsuarioColor(e.nombre),
                                            }}
                                            className="h-5 w-5 rounded-md"
                                        ></div>
                                        <div>{TextCapitalize(e.nombre)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <StyledCalendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{
                                height: "35rem",
                            }}
                            messages={{
                                next: "Sig",
                                previous: "Ant",
                                today: "Hoy",
                                month: "Mes",
                                week: "Semana",
                                day: "Día",
                            }}
                            eventPropGetter={(event) => {
                                return {
                                    style: {
                                        backgroundColor: event.bgColor,
                                        border: "none",
                                        color: event.textColor,
                                    },
                                    className: `font-semibold `,
                                };
                            }}
                            components={{
                                event: EventComponent,
                            }}
                            onSelectEvent={handleSelectEvent}
                        />
                    </div>
                </div>
                {menuPosition && <Menu />}
            </div>
        </Authenticated>
    );
}

const StyledCalendar = styled(Calendar)`
    * {
        user-select: none;
    }
`;
