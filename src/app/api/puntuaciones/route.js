import { NextRequest, NextResponse } from "next/server";
import {
  obtenerPuntuaciones,
  crearPuntuacion,
} from "../../utilidades/puntuaciones";

/*
Objeto JSON Puntaje: {
id: number;
jugadorId: number;
videojuegoId: number
puntuacion: number;
fecha: Date
}
*/

export async function GET(request) {
  try {
    const puntuaciones = await obtenerPuntuaciones();
    if (puntuaciones.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No hay puntuaciones registradas" }),
        { status: 404, statusText: "Not Found" }
      );
    }
    return new NextResponse(
      JSON.stringify(puntuaciones, { status: 200, statusText: "OK" })
    );
  } catch (error) {
    console.error("Error al obtener puntuaciones:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al obtener puntuaciones" }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

export async function POST(request) {
  try {
    let objeto;

    try {
      objeto = await request.json();
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ error: "JSON inválido o mal formado." }),
        { status: 400, statusText: "Bad Request" }
      );
    }

    const { jugadorId, videojuegoId, puntuacion } = objeto;
    if (
      jugadorId === undefined ||
      videojuegoId === undefined ||
      puntuacion === undefined
    ) {
      return new NextResponse(
        JSON.stringify({
          error: "Faltan campos requeridos: jugadorId, videojuegoId y puntuacion.",
        }),
        { status: 400, statusText: "Bad Request" }
      );
    }

    if (
      typeof jugadorId !== "number" ||
      typeof videojuegoId !== "number" ||
      typeof puntuacion !== "number"
    ) {
      return new NextResponse(
        JSON.stringify({
          error: "Los campos jugadorId, videojuegoId y puntuacion deben ser números.",
        }),
        { status: 400, statusText: "Bad Request" }
      );
    }

    const nuevaPuntuacion = await crearPuntuacion(objeto);
    return new NextResponse(JSON.stringify(nuevaPuntuacion), {
      status: 201,
      statusText: "Puntaje Registrado.",
    });
  } catch (error) {
    console.error("Error al registrar puntación: ", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al registrar puntación." }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
