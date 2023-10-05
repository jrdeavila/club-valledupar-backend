import {
    faCalendar,
    faCalendarDay,
    faCancel,
    faCheck,
    faClock,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { onUpdateState } from "../services/actions";
import { getReservationDate } from "../utils/date";
import { bgByEstado } from "../utils/stateColors";

export const dashItems = (reservaciones) => [
    {
        title: "Atrazadas",
        color: "#ffc165",
        icon: faClock,
        value: reservaciones.filter((e) => {
            let state = e.estado;
            let [beginDate, endDate] = getReservationDate(e);

            return state == "pendiente" && endDate < new Date();
        }).length,
    },

    {
        title: "Finalizadas",
        color: "#83b5ee",
        icon: faClock,

        value: reservaciones.filter((e) => {
            let state = e.estado;
            let [beginDate, endDate] = getReservationDate(e);

            return state == "finalizada" && endDate >= new Date();
        }).length,
    },
    {
        title: "Canceladas",
        color: "#d26060",
        icon: faTrash,

        value: reservaciones.filter((e) => {
            let state = e.estado;
            let [beginDate, endDate] = getReservationDate(e);
            return state == "cancelada" && endDate >= new Date();
        }).length,
    },
    {
        title: "Pendientes",
        color: "#46c2b8",
        icon: faCalendarDay,
        value: reservaciones.filter((e) => {
            let state = e.estado;
            let [beginDate, endDate] = getReservationDate(e);
            return state == "aceptada" && endDate >= new Date();
        }).length,
    },
];

export const menuItems = (event) => [
    {
        title: "Rechazar reservacion",
        icon: faTrash,
        color: bgByEstado("rechazada"),
        onClick: () => {
            onUpdateState("rechazada", event);
        },
    },
    {
        title: "Aceptar reservacion",
        icon: faCheck,
        color: bgByEstado("aceptada"),
        onClick: () => {
            onUpdateState("aceptada", event);
        },
    },
    {
        title: "Cancelar reservacion",
        icon: faCancel,
        color: bgByEstado("cancelada"),
        onClick: () => {
            onUpdateState("cancelada", event);
        },
    },
    {
        title: "Finalizar reservacion",
        icon: faClock,
        color: bgByEstado("finalizada"),
        onClick: () => {
            onUpdateState("finalizada", event);
        },
    },
];

export const dayNames = {
    0: "Domingo",
    1: "Lunes",
    2: "Martes",
    3: "Miercoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sabado",
};
