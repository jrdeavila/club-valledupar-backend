export const dashboardItems = [
    {
        title: "Dashboard",
        onlyNav: true,
        route: "dashboard",
        roles: ["admin", "chef"],
    },
    {
        title: "Socios",
        desc: "Administra el estado de los socios del club",
        image: "/img/socios.jpg",
        onlyNav: false,
        route: "partner.index",
        roles: ["admin", "recepcionista"],
    },
    {
        title: "Solicitudes",
        desc: "Administra las solicitudes de documentos de los socios",
        image: "/img/documentos.jpg",
        onlyNav: false,
        route: "document-request.index",
        roles: ["admin", "recepcionista"],
    },
    {
        title: "Cartas",
        desc: "Administra los platos y bebidas del menu del restaurante",
        image: "/img/cartas.webp",
        onlyNav: false,
        route: "cartas.index",
        roles: ["admin", "recepionista"],
    },
    {
        title: "Reservaciones",
        desc: "Administra las reservaciones de los clientes y socios",
        image: "/img/reservaciones.jpg",
        onlyNav: false,
        route: "reservaciones.index",
        roles: ["admin", "recepcionista"],
    },
    {
        title: "Areas",
        desc: "Administra las areas que se utilizan en el club",
        image: "/img/horarios.jpeg",
        onlyNav: false,
        route: "insumos.index",
        roles: ["admin", "recepcionista"],
    },
    {
        title: "Pedidos",
        desc: "Administra los pedidos de los socios",
        image: "/img/pedidos.jpg",
        onlyNav: false,
        route: "pedidos.index",
        roles: ["admin", "mesero", "recepcionista"],
    },
    {
        title: "Comanda",
        desc: "Visualiza en tiempo real los pedidos de los socios",
        image: "/img/comanda.webp",
        onlyNav: false,
        route: "chef.orders.index",
        roles: ["chef"],
    },
    {
        title: "Personal de trabajo",
        desc: "Administra el personal de trabajo del club",
        image: "/img/personal.jpg",
        onlyNav: false,
        route: "personal.index",
        roles: ["admin"],
    },
];

export function xor(a, b) {
    return (a || b) && !(a && b);
}
