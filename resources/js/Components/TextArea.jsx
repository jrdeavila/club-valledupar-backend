import { forwardRef, useEffect, useRef } from "react";

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
        <textarea
            type={type}
            className="focus:border-primary focus:ring-primary rounded-md shadow-sm border-white border-2 "
            {...props}
            ref={input}
        />
    );
});
