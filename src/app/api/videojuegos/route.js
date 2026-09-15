import { NextResponse } from "next/server";
import {
  getVideojuegos,
  registrarUnVideojuego,
} from "../../utilidades/videojuegos";

export async function GET() {
  try {
    console.log("Obteniendo videojuegos...");
    const videojuegos = await getVideojuegos();

    if (!videojuegos || videojuegos.length === 0) {
      return NextResponse.json(
        { error: "No hay videojuegos registrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(videojuegos, { status: 200 });
  } catch (error) {
    console.error("Error al obtener videojuegos:", error);
    return NextResponse.json(
      { error: "Error al obtener videojuegos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const objeto = await request.json();
    console.log("Registrando videojuego...");

    // 1. Extraer los campos enviados desde el cliente
    const nuevoVideojuego = {
      nombre: objeto.nombre,
      genero: objeto.genero,
    };

    // 2. Validaciones básicas
    if (!nuevoVideojuego.nombre || !nuevoVideojuego.nombre.trim()) {
      return NextResponse.json(
        { error: "El nombre es obligatorio." },
        { status: 400 }
      );
    }

    if (!nuevoVideojuego.genero || !nuevoVideojuego.genero.trim()) {
      return NextResponse.json(
        { error: "El género es obligatorio." },
        { status: 400 }
      );
    }

    // 3. Registrar en la base de datos (se maneja el ID auto-incrementable internamente)
    await registrarUnVideojuego(nuevoVideojuego);

    return NextResponse.json(
      { mensaje: "Videojuego registrado exitosamente", ...nuevoVideojuego },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al registrar videojuego:", error.message);

    // Retornar mensaje personalizado en caso de duplicados
    const mensajeError = error.message.includes("ya existe")
      ? error.message
      : "Error al registrar videojuego";

    return NextResponse.json(
      { error: mensajeError },
      { status: error.message.includes("ya existe") ? 400 : 500 }
    );
  }
}