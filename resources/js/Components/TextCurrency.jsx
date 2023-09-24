import { NumericFormat } from "react-number-format";
import React from "react";

export default function TextCurrency({
    id,
    name,
    className,
    onChange,
    readOnly = false,
    value,
}) {
    const handleChange = (values) => {
        const floatValue = parseFloat(values.value);
        onChange && onChange({ target: { name, value: floatValue } });
    };
    return (
        <NumericFormat
            id={id}
            name={name}
            displayType={readOnly ? "text" : "input"}
            value={value}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
            allowNegative={false}
            onValueChange={handleChange}
            placeholder="0.00"
            className={
                readOnly
                    ? "text-gray-600 bg-gray-100 border-gray-300 focus:border-gray-300 focus:ring-gray-300 rounded-md shadow-sm px-3 py-1"
                    : "border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm " +
                      className
            }
        />
    );
}
