import { NextResponse, NextRequest } from "next/server";
import {
  videojuegos,
  obtenerVideojuegos,
  registrarVideojuego,
  determinarSiExisteElVideojuego,
} from "@/app/utilidades/videojuegos";

export async function GET(request) {
  try {
    console.log("Obteniendo videojuegos...");
    const videojuegos = obtenerVideojuegos();
    if (!videojuegos || videojuegos.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No hay videojuegos registrados" }),
        { status: 404, statusText: "Not Found" }
      );
    }
    return new NextResponse(JSON.stringify(videojuegos), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    console.error("Error al obtener videojuegos:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al obtener videojuegos" }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

export async function POST(request) {
    try {
        const objeto = await request.json();
        console.log("Registrando videojuego...");
        if (determinarSiExisteElVideojuego(objeto.nombre)) {
            return new NextResponse(
                JSON.stringify({ error: "El videojuego ya existe."}),
                { status: 400, statusText: "Bad Request"}
            );
        }
        const nuevoVideojuego = {
            id: videojuegos.length + 1,
            nombre: objeto.nombre,
            genero: objeto.genero,
        }
        if (!nuevoVideojuego.nombre) {
            return new NextResponse(
                JSON.stringify({ error: "El nombre es obligatorio."}),
                { status: 400, statusText: "Bad Request"}
            );
        }
        if (!nuevoVideojuego.genero) {
            return new NextResponse(
                JSON.stringify({ error: "El género es obligatorio."}),
                { status: 400, statusText: "Bad Request"}
            );
        }
        registrarVideojuego(nuevoVideojuego);
        return new NextResponse(JSON.stringify(nuevoVideojuego), {
            status: 201,
            statusText: "Created",
        });
    } catch (error) {
        console.error("Error al registrar videojuego:", error);
        return new NextResponse(
            JSON.stringify({ error: "Error al registrar videojuego" }),
            { status: 500, statusText: "Internal Server Error" }
        );
    }
}
