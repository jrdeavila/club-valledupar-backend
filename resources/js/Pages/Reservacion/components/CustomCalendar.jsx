import moment from "moment";
import "moment/locale/es.js";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";

const CustomCalendar = ({ events = [], schedules = [], onSelectSlot }) => {
    let localizer = momentLocalizer(moment);

    const dayStyleGetter = (slot) => {
        let isBlocked =
            !checkIfInsideScheduleDays(slot) ||
            !checkIfInsideScheduleHours(slot);
        return {
            style: {
                // Red
                backgroundColor: isBlocked ? "rgb(255, 255, 255)" : "",
                color: isBlocked ? "#000" : "",
            },
        };
    };

    const checkIfInsideScheduleDays = (slot) => {
        if (schedules.length === 0) return false;
        // Check if current date is sunday or saturday
        let daysAllowed = schedules.map((schedule) => {
            return {
                0: schedule.domingo,
                1: schedule.lunes,
                2: schedule.martes,
                3: schedule.miercoles,
                4: schedule.jueves,
                5: schedule.viernes,
                6: schedule.sabado,
            };
        });

        // Check if current day is inside the schedule
        let dayOfWeek = moment(slot[0]).day();
        let isAllowedDay = daysAllowed.some((day) => day[dayOfWeek]);
        return isAllowedDay;
    };

    const checkIfInsideScheduleHours = (slot) => {
        if (schedules.length === 0) return false;

        const hoursAllowed = schedules.map((schedule) => {
            const start = moment(schedule.fecha_apertura, "HH:mm");
            const end = moment(schedule.fecha_cierre, "HH:mm");
            return { start, end };
        });

        const slotStart = moment(
            moment(slot[0]).add(1, "minute").format("HH:mm"),
            "HH:mm"
        );
        const slotEnd = moment(
            moment(slot[1]).subtract(1, "minute").format("HH:mm"),
            "HH:mm"
        );

        const isAllowedHour = hoursAllowed.some(
            (hours) =>
                hours.start.isBefore(slotStart) && hours.end.isAfter(slotEnd)
        );

        return isAllowedHour;
    };
    const handleOnSelectDate = (slot) => {
        let data = [
            moment(slot.start).add(1, "minute"),
            moment(slot.end).subtract(1, "minute"),
        ];
        let isAllowed =
            checkIfInsideScheduleDays(data) && checkIfInsideScheduleHours(data);

        if (isAllowed) {
            onSelectSlot &&
                onSelectSlot({
                    start: data[0],
                    end: data[1],
                });
        } else {
            alert("Rango no permitido, verifique las fechas");
        }
    };
    return (
        <StyledCalendar
            localizer={localizer}
            events={events}
            titleAccessor="title"
            startAccessor="start"
            endAccessor="end"
            style={{
                height: "40rem",
                border: "none",
            }}
            selectable
            // Select Range Dates
            onSelectSlot={handleOnSelectDate}
            messages={{
                next: "Sig",
                previous: "Ant",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
            }}
            slotGroupPropGetter={dayStyleGetter}
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
    // Change Select Slot Range Color
    & .rbc-slot-selection {
        // Event color
        background-color: #1e40af;
        color: #fff;
        font-weight: bold;
    }

    * {
        user-select: none;
    }
`;

export default CustomCalendar;
