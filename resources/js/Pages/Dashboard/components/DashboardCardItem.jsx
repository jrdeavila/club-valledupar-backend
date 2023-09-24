export const DashboardCardItem = ({ title, desc, image, route: routeLink }) => {
    return (
        <div
            onClick={() => {
                window.location = route(routeLink);
            }}
            className="bg-white rounded-lg shadow-lg h-72 cursor-pointer select-none transition duration-500 transform hover:scale-105"
        >
            <div
                className="rounded-t-lg h-40"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
            <div className="px-4 py-3">
                <div className="text-3xl font-semibold mb-3">{title}</div>
                <p className="text-gray-600">{desc}</p>
            </div>
        </div>
    );
};
