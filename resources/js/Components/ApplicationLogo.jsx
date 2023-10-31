export default function ApplicationLogo(props) {
    return (
        <div
            style={{
                backgroundImage: `url('/img/logos/small-logo.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
            }}
            {...props}
        ></div>
    );
}
