import { NextResponse, NextRequest } from "next/server";
import {
  crearJugador,
  getJugadores,
  buscarJugadores,
  
} from '../../utilidades/jugadores';
export async function GET(request) {
  try {
    // Obtener parametros de consulta de la URL
    const params = new URL(request.url).searchParams;
    const nombre = params.get("nombre");
    if (nombre) {
      const jugadores = await buscarJugadores(nombre);
      if (jugadores.length > 0) {
        return new NextResponse(
          JSON.stringify(jugadores, { status: 200, statusText: "OK" })
        );
      } else {
        return new NextResponse(
          JSON.stringify({ error: "Jugador(es) no encontrado(s)" }),
          { status: 404, statusText: "Not Found" }
        );
      }
    } else {
      console.log("Obteniendo jugadores...");

      const jugadores = await getJugadores();
      if (!jugadores || jugadores.length === 0) {
        return new NextResponse(
          JSON.stringify({ error: "No hay jugadores registrados" }),
          { status: 404, statusText: "Not Found" }
        );
      }

      return new NextResponse(
        JSON.stringify(jugadores, { status: 200, statusText: "OK" })
      );
    }
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al obtener jugadores" }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}

export async function POST(request) {
  try {
    const objeto = await request.json();
    const nuevoJugador = {
      nombre: objeto.nombre,
      gamertag: objeto.gamertag,
      correo: objeto.correo,
    };
    if (!nuevoJugador.nombre) {
      return new NextResponse(
        JSON.stringify({ error: "El nombre es obligatorio" }),
        { status: 400, statusText: "Bad Request" }
      );
    }
    if (!nuevoJugador.gamertag) {
      return new NextResponse(
        JSON.stringify({ error: "El gamertag es obligatorio" }),
        { status: 400, statusText: "Bad Request" }
      );
    }
    if (!nuevoJugador.correo) {
      return new NextResponse(
        JSON.stringify({ error: "El correo es obligatorio" }),
        { status: 400, statusText: "Bad Request" }
      );
    }
    await crearJugador(
     nuevoJugador
    );
    console.log("Jugador agregado:", nuevoJugador);
    return new NextResponse(
      JSON.stringify(nuevoJugador, { status: 201, statusText: "Created" })
    );
  } catch (error) {
    console.error("Error al agregar jugador:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error al agregar jugador" }),
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
