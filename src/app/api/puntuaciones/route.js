import { NextResponse } from "next/server";
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

// GET: Obtener todas las puntuaciones
export async function GET(request) {
  try {
    const puntuaciones = await obtenerPuntuaciones();
    
    // Retorna lista vacía [] con status 200 en lugar de 404 para no romper las tablas del frontend
    return NextResponse.json(puntuaciones || [], { status: 200 });
  } catch (error) {
    console.error("Error al obtener puntuaciones:", error);
    return NextResponse.json(
      { error: "Error interno al obtener puntuaciones." },
      { status: 500 }
    );
  }
}

// POST: Registrar nueva puntuación
export async function POST(request) {
  try {
    let objeto;

    // 1. Validar que el JSON enviado sea válido
    try {
      objeto = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "JSON inválido o mal formado." },
        { status: 400 }
      );
    }

    const { jugadorId, videojuegoId, puntuacion } = objeto;

    // 2. Validar presencia de campos requeridos (RF03)[cite: 1]
    if (
      jugadorId === undefined ||
      videojuegoId === undefined ||
      puntuacion === undefined
    ) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: jugadorId, videojuegoId y puntuacion." },
        { status: 400 }
      );
    }

    // 3. Validar tipos de datos numéricos
    const numJugadorId = Number(jugadorId);
    const numVideojuegoId = Number(videojuegoId);
    const numPuntuacion = Number(puntuacion);

    if (
      isNaN(numJugadorId) ||
      isNaN(numVideojuegoId) ||
      isNaN(numPuntuacion)
    ) {
      return NextResponse.json(
        { error: "Los campos jugadorId, videojuegoId y puntuacion deben ser valores numéricos válidos." },
        { status: 400 }
      );
    }

    // 4. REGLA DE NEGOCIO: Puntuación no puede ser negativa (RF03)[cite: 1]
    if (numPuntuacion < 0) {
      return NextResponse.json(
        { error: "La puntuación no puede ser negativa." },
        { status: 400 }
      );
    }

    // 5. Inserción en la base de datos MySQL con manejo de promesas (AWAIT)
    const payloadLimpio = {
      jugadorId: numJugadorId,
      videojuegoId: numVideojuegoId,
      puntuacion: numPuntuacion,
      fecha: objeto.fecha || new Date().toISOString()
    };

    const nuevaPuntuacion = await crearPuntuacion(payloadLimpio);

    return NextResponse.json(nuevaPuntuacion, { status: 201 });

  } catch (error) {
    console.error("Error al registrar puntuación:", error);

    // Si la función utilitaria o MySQL detectan que el jugador o juego no existe
    if (
      error.message?.includes("inexistente") || 
      error.message?.includes("NOT_FOUND") ||
      error.code === 'ER_NO_REFERENCED_ROW_2' // Código de error de Integridad Referencial de MySQL
    ) {
      return NextResponse.json(
        { error: "El jugador o el videojuego especificado no existe en la base de datos." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error interno del servidor al registrar la puntuación." },
      { status: 500 }
    );
  }
}