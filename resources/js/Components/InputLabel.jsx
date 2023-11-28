export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={className + ` block font-medium text-sm text-gray-500`}
        >
            {value ? value : children}
        </label>
    );
}
