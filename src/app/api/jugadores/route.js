import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const objeto = await request.json();
    const nuevoJugador = {
      id: jugadores.length + 1,
      nombre: objeto.nombre,
      gamertag: objeto.gamertag,
      correo: objeto.correo,
      fechaRegistro: new Date().toISOString(),
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
    if (determinarSiElGamertagExiste(nuevoJugador.gamertag)) {
      return new NextResponse(
        JSON.stringify({ error: "El gamertag ya existe" }),
        { status: 400, statusText: "Bad Request" }
      );
    }
    registrarJugador(nuevoJugador);
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

export async function GET(request) {
  try {
    // Obtener parametros de consulta de la URL
    const params = new URL(request.url).searchParams;
    const nombre = params.get("nombre");
    const gamertag = params.get("gamertag");
    if (nombre) {
      const jugador = buscarJugadorPorNombre(nombre);
      if (jugador) {
        return new NextResponse(
          JSON.stringify(jugador, { status: 200, statusText: "OK" })
        );
      } else {
        return new NextResponse(
          JSON.stringify({ error: "Jugador no encontrado" }),
          { status: 404, statusText: "Not Found" }
        );
      }
    } else if (gamertag) {
      const jugador = buscarJugadorPorGamertag(gamertag);
      if (jugador) {
        return new NextResponse(
          JSON.stringify(jugador, { status: 200, statusText: "OK" })
        );
      } else {
        return new NextResponse(
          JSON.stringify({ error: "Jugador no encontrado" }),
          { status: 404, statusText: "Not Found" }
        );
      }
    } else {
      console.log("Obteniendo jugadores...");

      return new NextResponse(
        JSON.stringify(obtenerJugadores(), { status: 200, statusText: "OK" })
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