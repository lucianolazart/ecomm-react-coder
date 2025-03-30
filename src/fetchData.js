import { productos } from "./productos";

export const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(productos);
        }, 1500);
    });
}