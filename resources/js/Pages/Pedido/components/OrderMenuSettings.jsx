import {
    faCheck,
    faEllipsisVertical,
    faEye,
    faLocationArrow,
    faTrash,
    faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

export default function OrderMenuSettings({ order }) {
    const items = [
        {
            label: "Ver",
            icon: <FontAwesomeIcon icon={faEye} />,
            onClick: () => handleActionByState("ver"),
        },
        {
            label: "Enviar a comanda",
            icon: <FontAwesomeIcon icon={faUtensils} />,
            onClick: () => handleActionByState("comandado"),
        },
        {
            label: "Enviar pedido",
            icon: <FontAwesomeIcon icon={faLocationArrow} />,
            onClick: () => handleActionByState("enviado"),
        },
        {
            label: "Pedido entregado",
            icon: <FontAwesomeIcon icon={faCheck} />,
            onClick: () => handleActionByState("entregado"),
        },
        {
            label: "Pedido cancelado",
            icon: <FontAwesomeIcon icon={faTrash} />,
            onClick: () => handleActionByState("cancelado"),
        },
    ];
    // ------------------------------------------------
    const [showMenu, setShowMenu] = useState(false);
    const ref = useRef();

    // ------------------------------------------------

    useEffect(() => {
        const checkIfClickedOutside = (event) => {
            if (ref.current && ref.current.contains(event.target)) {
                setShowMenu(true);
            } else {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", checkIfClickedOutside);

        return () => {
            document.removeEventListener("click", checkIfClickedOutside);
        };
    }, []);

    // ------------------------------------------------

    const handleActionByState = (state) => {
        const onChangeState = (state) => {
            router.patch(route("pedidos.estado", order), {
                estado: state,
            });
        };
        return {
            ver: () => {
                router.get(route("pedidos.show", order));
            },
            comandado: () => {
                onChangeState("comandado");
            },
            enviado: () => {
                onChangeState("enviado");
            },
            cancelado: () => {
                onChangeState("cancelado");
            },
            entregado: () => {
                onChangeState("entregado");
            },
        }[state]();
    };

    const handleClick = () => {
        setShowMenu(!showMenu);
    };

    // ------------------------------------------------

    return (
        <div ref={ref}>
            <FontAwesomeIcon
                onClick={handleClick}
                icon={faEllipsisVertical}
                className="px-3 py-2 rounded-md hover:bg-gray-300 "
            />
            {showMenu && (
                <div
                    style={{
                        top: "100%",
                        right: "0",
                        zIndex: "100",
                    }}
                    className="absolute bg-white py-4 shadow-lg rounded-md"
                >
                    <div className="flex flex-col">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-row gap-x-3 items-center hover:bg-gray-200 px-5 py-2"
                                onClick={(e) => {
                                    item.onClick();
                                    setShowMenu(false);
                                }}
                            >
                                {item.icon}
                                {item.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
