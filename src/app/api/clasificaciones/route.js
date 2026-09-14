import { NextResponse } from "next/server";
import { obtenerRanking } from "../../../../DB/Puntuaciones/puntuaciones";

export async function GET(request) {
  try {
    const clasificacion = await obtenerClasificaciones();
    if (clasificacion.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No hay clasificaciones registradas" }),
        { status: 404, statusText: "Not Found" }
      );
    }
    return new NextResponse(JSON.stringify(clasificacion), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    console.error("Error al obtener clasificaciones:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al obtener clasificaciones" }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

export async function obtenerClasificaciones() {
  const ranking = await obtenerRanking();
  const clasificaciones = ranking.map((entrada) => ({
    posicion: entrada.posicion,
    jugador: entrada.jugador,
    videojuego: entrada.videojuego,
    puntuacion: entrada.puntuacion,
  }));
  return clasificaciones;
}
