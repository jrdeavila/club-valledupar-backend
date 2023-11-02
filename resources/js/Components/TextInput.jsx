import { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";

export default forwardRef(function TextInput(
    { type = "text", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            type={type}
            className="bg-transparent border-none border-0 focus:ring-white focus:ring-2 ring-2 ring-white rounded-md shadow-sm text-white py-3"
            ref={input}
            {...props}
        />
    );
});
