export default function ApplicationLogo(props) {
    return (
        <div
            style={{
                backgroundImage: `url('/img/logos/small-logo.png')`,
                height: "64px",
                width: "64px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            {...props}
        ></div>
    );
}
