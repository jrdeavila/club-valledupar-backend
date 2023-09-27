import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { dayNames } from "@/Pages/Reservacion/models/IndexModels";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { FormatHiAtoHHmm } from "@/Utils/TimeFormat";
import moment from "moment";
import { useEffect, useState } from "react";

const DatePicker = ({ onDateChange }) => {
    let currentDate = new Date();
    const [month, setMonth] = useState(currentDate.getMonth());
    const [days, setDays] = useState([]);
    const [currentDay, setCurrentDay] = useState(currentDate.getDate());
    const [time, setTime] = useState("");

    useEffect(() => {
        let beginDateMonth = new Date(currentDate.getFullYear(), month, 1);
        let endDateMonth = new Date(currentDate.getFullYear(), month + 1, 0);

        let days = [];

        let year = currentDate.getFullYear();
        for (
            let i = beginDateMonth.getDate();
            i <= endDateMonth.getDate();
            i++
        ) {
            const date = new Date(year, month, i);

            const name = dayNames[date.getDay()];

            const day = i.toString().padStart(2, "0");

            days.push({ name, day: day, date });
        }

        setDays(days);
    }, [month]);

    useEffect(() => {
        onChangeDate();
    }, [month, currentDay, time]);

    function onChangeDate() {
        let date = new Date(currentDate.getFullYear(), month, currentDay);
        // Y-m-d
        let formated = date.toISOString().split("T")[0];
        if (time === "") {
            let timeStr = currentDate.toLocaleTimeString();
            setTime(FormatHiAtoHHmm(timeStr));
        }
        onDateChange &&
            onDateChange({
                date: formated,
                time,
            });
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1">
                    <InputLabel value="Mes" />
                    <select
                        value={month}
                        onChange={(e) => {
                            return setMonth(parseInt(e.target.value));
                        }}
                        className="border-gray-300 rounded-md focus:ring-primary focus:border-primary w-full"
                    >
                        {new Array(12).fill(null).map((e, i) => (
                            <option key={i} value={i}>
                                {(() => {
                                    let date = new Date();
                                    date.setMonth(i);
                                    return TextCapitalize(
                                        date.toLocaleString("es", {
                                            month: "long",
                                        })
                                    );
                                })()}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex-1">
                    <InputLabel value="Dia" />

                    <select
                        value={currentDay - 1}
                        onChange={(e) => {
                            return setCurrentDay(parseInt(e.target.value) + 1);
                        }}
                        className="border-gray-300 rounded-md focus:ring-primary focus:border-primary w-full"
                    >
                        {days.map((e, i) => (
                            <option key={i} value={i}>
                                {e.day} - {e.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <InputLabel value="Hora de Reservacion" />
                    <TextInput
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="time"
                        className="w-full"
                    />
                </div>
            </div>
        </>
    );
};

export default DatePicker;
