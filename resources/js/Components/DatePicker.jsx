import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { TextCapitalize } from "@/Utils/TextCapitalize";
import { FormatHiAtoHHmm } from "@/Utils/TimeFormat";
import { useEffect, useState } from "react";

const DatePicker = ({ onTimeChange, onDateChange, value = new Date() }) => {
    let currentDate = value;
    const [month, setMonth] = useState(currentDate.getMonth());
    const [days, setDays] = useState([]);
    const [currentDay, setCurrentDay] = useState(currentDate.getDate());
    const [time, setTime] = useState("");

    useEffect(() => {
        let beginDateMonth = new Date(currentDate.getFullYear(), month, 1);
        let endDateMonth = new Date(currentDate.getFullYear(), month + 1, 0);

        let days = [];

        for (
            let i = beginDateMonth.getDate();
            i <= endDateMonth.getDate();
            i++
        ) {
            const date = new Date(currentDate.getFullYear(), month - 1, i);
            const name = TextCapitalize(
                date.toLocaleString("es", { weekday: "long" })
            );

            days.push({ name, day: i, date });
        }

        setDays(days);
    }, [month]);

    useEffect(() => {
        let date = new Date(currentDate.getFullYear(), month, currentDay);
        onDateChange && onDateChange(date);
    }, [month, currentDay]);

    useEffect(() => {
        if (time === "") {
            let timeStr = currentDate.toLocaleTimeString();
            setTime(FormatHiAtoHHmm(timeStr));
        }
        onTimeChange && onTimeChange(time);
    }, [time]);

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
