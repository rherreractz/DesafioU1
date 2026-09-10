import { NextRequest, NextResponse } from "next/server";
import {
  obtenerPuntuaciones,
  crearPuntuacion,
} from "@/app/utlidades/puntuaciones";
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
  console.log("Obteniendo puntuaciones...");
  try {
    const puntuaciones = obtenerPuntuaciones();
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
        const objeto = await request.json();
        const nuevaPuntuacion = crearPuntuacion(objeto);
        return new NextResponse(
            JSON.stringify(nuevaPuntuacion, { status: 201, statusText: "Puntaje Registrado."})
        );
    } catch (error){
        console.error("Error al registrar puntación: ", error);
        return new NextResponse(
            JSON.stringify({ error: "Error al registrar puntación."}),
            { status: 500, statusText: "Internal Server Error"}
        );
    }
}
