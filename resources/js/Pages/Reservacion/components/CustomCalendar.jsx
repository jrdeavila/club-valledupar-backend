import moment from "moment";
import "moment/locale/es.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";

const EventComponent = ({ event }) => {
    return (
        <div className="flex flex-row gap-x-3 rounded-sm text-ellipsis">
            <div className="text-sm">{event.title}</div>
            <div className="font-bold text-sm">{event.desc}</div>
        </div>
    );
};

const CustomCalendar = ({ events }) => {
    let localizer = momentLocalizer(moment);
    return (
        <StyledCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
                height: "40rem",
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
        />
    );
};

const StyledCalendar = styled(Calendar)`
    position: relative;
    border-radius: 0.25rem;
    background-color: rgba(255, 255, 255, 0.5);

    & .rbc-toolbar button {
        background-color: transparent;
        border: none;
        color: #4a5568;
    }

    & .rbc-toolbar button:hover {
        background-color: transparent;
    }

    & .rbc-toolbar button:focus {
        background-color: transparent;

        border-radius: 0;
        box-shadow: none;
    }

    & .rbc-toolbar button.rbc-active {
        color: #fff;
        font-weight: bold;
        box-shadow: none;
    }

    // Change the day background color
    & .rbc-day-bg {
        background-color: rgba(255, 255, 255, 0.5);
    }

    // Change the next day background color
    & .rbc-off-range-bg {
        background-color: rgba(255, 255, 255, 0.2);
    }

    // Change Color Current day background color
    & .rbc-today {
        background-color: rgba(255, 255, 255, 0.4);
    }

    * {
        user-select: none;
    }
`;

export default CustomCalendar;
