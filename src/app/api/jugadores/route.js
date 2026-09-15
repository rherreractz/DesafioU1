import { NextResponse } from "next/server";
import {
  crearJugador,
  getJugadores,
  buscarJugadores,
} from "../../utilidades/jugadores";

export async function GET(request) {
  try {
    const params = new URL(request.url).searchParams;
    const nombre = params.get("nombre");
    const gamertag = params.get("gamertag");

    // 1. Si enviaron filtro por nombre o por gamertag
    const criterioBusqueda = gamertag || nombre;

    if (criterioBusqueda) {
      const jugadores = await buscarJugadores(criterioBusqueda);
      
      if (jugadores && jugadores.length > 0) {
        return NextResponse.json(jugadores, { status: 200 });
      } else {
        return NextResponse.json(
          { error: "Jugador(es) no encontrado(s)" },
          { status: 404 }
        );
      }
    } else {
      // 2. Si no hay parámetros de búsqueda, obtiene todos los jugadores
      console.log("Obteniendo todos los jugadores...");

      const jugadores = await getJugadores();
      
      // Devolver [] con status 200 si no hay registros para no romper tablas del front
      return NextResponse.json(jugadores || [], { status: 200 });
    }
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    return NextResponse.json(
      { error: "Error interno al obtener jugadores" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    let objeto;
    try {
      objeto = await request.json();
    } catch (e) {
      return NextResponse.json(
        { error: "JSON inválido o mal formado." },
        { status: 400 }
      );
    }

    const nuevoJugador = {
      nombre: objeto.nombre,
      gamertag: objeto.gamertag,
      correo: objeto.correo,
    };

    // Validaciones de campos obligatorios (RF01)[cite: 1]
    if (!nuevoJugador.nombre || !nuevoJugador.nombre.trim()) {
      return NextResponse.json(
        { error: "El nombre es obligatorio" },
        { status: 400 }
      );
    }
    if (!nuevoJugador.gamertag || !nuevoJugador.gamertag.trim()) {
      return NextResponse.json(
        { error: "El gamertag es obligatorio" },
        { status: 400 }
      );
    }
    if (!nuevoJugador.correo || !nuevoJugador.correo.trim()) {
      return NextResponse.json(
        { error: "El correo es obligatorio" },
        { status: 400 }
      );
    }

    // Inserción en la base de datos MySQL
    const resultado = await crearJugador(nuevoJugador);
    console.log("Jugador agregado:", nuevoJugador);

    return NextResponse.json(
      { mensaje: "Jugador registrado exitosamente", jugador: nuevoJugador },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error al agregar jugador:", error);

    // Capturar intento de Gamertag duplicado (ER_DUP_ENTRY en MySQL o throw manual)[cite: 1]
    if (
      error.code === 'ER_DUP_ENTRY' || 
      error.message?.includes("DUPLICADO") || 
      error.message?.includes("existe")
    ) {
      return NextResponse.json(
        { error: "El Gamertag o Correo ya se encuentra registrado." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Error interno al agregar jugador" },
      { status: 500 }
    );
  }
}