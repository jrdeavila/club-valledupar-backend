export default function ApplicationLogo(props) {
    return (
        <div
            style={{
                backgroundImage: `url('/img/logos/small-logo.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            {...props}
        ></div>
    );
}
