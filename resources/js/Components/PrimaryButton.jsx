export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-5 py-3 bg-white text-gray-700 border border-transparent rounded-lg font-semibold text-md uppercase tracking-widest hover:scale-105 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2 transition ease-in-out duration-150  ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
