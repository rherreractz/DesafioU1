/*
Objeto JSON Videojuego: {
id: number;
nombre: string;
genero: string;
}
*/

const videojuegos = [
    {
        id: 1,
        nombre: "Videojuego Uno",
        genero: "Acción",
    },
    {
        id: 2,
        nombre: "Videojuego Dos",
        genero: "Aventura",
    },
    {
        id: 3,
        nombre: "Videojuego Tres",
        genero: "Deportes",
    },
    {
        id: 4,
        nombre: "Videojuego Cuatro",
        genero: "Estrategia",
    },
    {
        id: 5,
        nombre: "Videojuego Cinco",
        genero: "Simulación",
    }
];

export function obtenerVideojuegos(){
    return videojuegos;
}

export function registrarVideojuego(videojuego){
    videojuegos.push(videojuego);
    return videojuego;
}

export function determinarSiExisteElVideojuego(nombre){
    return videojuegos.some((videojuego) => videojuego.nombre === nombre);
}