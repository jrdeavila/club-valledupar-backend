export default function ApplicationLogo(props) {
    return (
        <div
            style={{
                backgroundImage: `url('/img/logos/logo71.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
            }}
            {...props}
        ></div>
    );
}
