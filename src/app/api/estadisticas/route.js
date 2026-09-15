import { NextResponse } from "next/server";
import { obtenerEstadisticas } from "../../../../DB/Puntuaciones/puntuaciones";

export async function GET(request) {
  try {
    const estadisticas = await obtenerEstadisticasGenerales();
    if (estadisticas.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "No hay estadísticas registradas" }),
        { status: 404, statusText: "Not Found" }
      );
    }
    return new NextResponse(
      JSON.stringify(estadisticas, { status: 200, statusText: "OK" })
    );
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al obtener estadísticas" }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

export async function obtenerEstadisticasGenerales() {
  const estadisticas = await obtenerEstadisticas();
  console.log("Estadísticas obtenidas:", estadisticas);
  const estadisticasGenerales = {
    totalJugadores: estadisticas.total_jugadores,
    totalVideojuegos: estadisticas.total_videojuegos,
    totalPuntuaciones: estadisticas.total_puntuaciones,
    puntuacionPromedio: estadisticas.puntuacion_promedio,
  }
  return estadisticasGenerales;
}
