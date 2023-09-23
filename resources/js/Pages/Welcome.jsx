import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />

            <NavBar isAuthenticated />
        </>
    );
}

const NavBar = ({ isAuthenticated }) => {
    return (
        <nav className="flex justify-between items-center bg-opacity-50 backdrop-filter backdrop-blur-lg bg-gray-200 p-4">
            <h1 className="text-2xl font-bold">Club Valledupar</h1>
            <ul className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <Link
                        href={route("dashboard")}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-600"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route("register")}
                            className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-600"
                        >
                            Register
                        </Link>
                    </>
                )}
            </ul>
        </nav>
    );
};
