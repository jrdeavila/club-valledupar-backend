import { createContext } from "react";

export const CartasContext = createContext({
    onEditCarta: (carta) => {},
    onDeleteCarta: (carta) => {},
});
