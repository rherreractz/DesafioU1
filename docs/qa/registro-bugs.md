# Registro de Bugs — Sistema de Torneo de Videojuegos

**QA:** Erick Gilberto Reyes Chan  
**Fecha de revisión inicial:** 13/09/2026  
**Fecha de reprueba:** 14/09/2026  
**Ramas revisadas:** `feature/bdd`, `feature/api`, `feature/interfaz`

---

## BUG-001 — Credenciales de base de datos expuestas

- **Rama:** `feature/bdd`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El archivo de conexión a la base de datos contiene credenciales reales como valores por defecto dentro del código.
- **Resultado esperado:** Las credenciales deben obtenerse únicamente mediante variables de entorno.
- **Recomendación:** Eliminar las credenciales del código, utilizar variables de entorno y cambiar la contraseña que fue expuesta.

---

## BUG-002 — Dependencia mysql2 no registrada

- **Rama:** `feature/bdd` / `feature/api`
- **Severidad:** Alta
- **Estado:** Verificado / Cerrado
- **Descripción inicial:** El módulo de base de datos importaba `mysql2/promise`, pero `mysql2` no estaba declarado como dependencia del proyecto.
- **Corrección:** En el commit `5204f89` se agregó `mysql2` a `package.json`.
- **Reprueba:** Se ejecutó `npm ls mysql2`.
- **Resultado obtenido:** Se encontró correctamente `mysql2@3.24.4`.
- **Conclusión:** Corrección verificada por QA.

---

## BUG-003 — API utiliza datos simulados en lugar de MySQL

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Verificado / Cerrado
- **Descripción inicial:** Las funciones de jugadores, videojuegos y puntuaciones utilizaban arreglos locales con datos simulados.
- **Corrección:** En el commit `5204f89` las utilidades fueron conectadas con los módulos de base de datos.
- **Repruebas realizadas:**
  - `GET /api/jugadores` → HTTP 200.
  - `GET /api/videojuegos` → HTTP 200.
  - `GET /api/puntuaciones` → HTTP 200.
- **Resultado esperado:** Los datos deben consultarse desde MySQL.
- **Resultado obtenido:** Los endpoints utilizan los módulos DB y responden correctamente.
- **Conclusión:** Corrección verificada por QA.

---

## BUG-004 — Ruta incorrecta en importación de puntuaciones

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Verificado / Cerrado
- **Descripción inicial:** La API de puntuaciones importaba desde una ruta incorrecta (`utlidades` en lugar de `utilidades`).
- **Corrección:** La importación fue modificada para utilizar correctamente `../../utilidades/puntuaciones`.
- **Reprueba:** Se ejecutó `GET /api/puntuaciones`.
- **Resultado obtenido:** HTTP 200 y respuesta correcta.
- **Conclusión:** Corrección verificada por QA.

---

## BUG-005 — Registro de puntuaciones sin todas las validaciones requeridas

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto — parcialmente corregido
- **Descripción inicial:** No se validaba que el jugador existiera, que el videojuego existiera ni que la puntuación fuera mayor o igual a cero.
- **Correcciones encontradas:**
  - Se valida que el jugador exista.
  - Se valida que el videojuego exista.
- **Pendiente:** No se rechazan puntuaciones negativas.
- **Reprueba realizada:** Se envió una puntuación de `-100`.
- **Resultado esperado:** La solicitud debe ser rechazada y la puntuación no debe almacenarse.
- **Resultado obtenido:** HTTP 201 — `Puntaje Registrado`.
- **Conclusión:** El bug permanece abierto hasta impedir puntuaciones menores a cero.

---

## BUG-006 — Error de exportación en API de videojuegos

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Verificado / Cerrado
- **Descripción inicial:** La API intentaba importar un elemento `videojuegos` que no estaba exportado desde utilidades.
- **Corrección:** Se modificaron las importaciones y funciones utilizadas por la ruta.
- **Reprueba:** `GET /api/videojuegos`.
- **Resultado obtenido:** HTTP 200 y lista de videojuegos obtenida correctamente.
- **Conclusión:** Corrección verificada por QA.

---

## BUG-007 — Registro de puntuación no recibe videojuegos

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El componente `RegistroPuntos` espera recibir una lista de videojuegos, pero `page.js` no proporciona dicha propiedad.
- **Resultado obtenido:** El selector de videojuegos aparece vacío.
- **Resultado esperado:** El usuario debe poder seleccionar un videojuego existente.
- **Observación:** La API de videojuegos ya funciona, pero falta integrar esos datos con la interfaz.

---

## BUG-008 — Clasificación no recibe datos

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El componente de clasificación se renderiza sin recibir información de ranking.
- **Resultado obtenido en interfaz:** La tabla aparece vacía.
- **Resultado esperado:** Mostrar posición, jugador, videojuego y puntuación.
- **Reprueba API:** `GET /api/clasificaciones` respondió HTTP 200 correctamente.
- **Observación:** El backend ya proporciona la clasificación, pero falta consumirla desde la interfaz.

---

## BUG-009 — Estadísticas no reciben datos

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El componente de estadísticas se renderiza sin recibir el objeto `estadisticas`.
- **Resultado obtenido en interfaz:** Los valores aparecen en `0`.
- **Resultado esperado:** Mostrar totales y promedio utilizando los datos provenientes de MySQL.
- **Reprueba API:** `GET /api/estadisticas` respondió HTTP 200 correctamente.
- **Observación:** El endpoint ya existe y funciona; falta integrarlo con la interfaz.

---

## BUG-010 — API de jugadores utiliza funciones no definidas

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** `src/app/api/jugadores/route.js` utiliza variables y funciones que no están importadas ni definidas.
- **Resultado obtenido:** `GET /api/jugadores` responde HTTP 500 con `ReferenceError: obtenerJugadores is not defined`.
- **Resultado esperado:** El endpoint debe devolver correctamente los jugadores registrados.
- **Impacto:** Bloquea consulta, búsqueda y selección de jugadores dentro de esta rama.
- **Observación:** En `feature/api` ya existe una versión funcional del endpoint; falta integrar los cambios.

---

## BUG-011 — Registro de videojuego utiliza variable no definida

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El método `POST /api/videojuegos` utiliza `videojuegos.length + 1`, pero la variable `videojuegos` no está definida dentro del método.
- **Prueba realizada:** Registro de:
  - Nombre: `Street Fighter QA`
  - Género: `Peleas`
- **Resultado esperado:** HTTP 201 y videojuego almacenado correctamente.
- **Resultado obtenido:** HTTP 500 — Error interno del servidor.
- **Conclusión:** El registro de videojuegos no funciona correctamente.

---

## BUG-012 — Validación de videojuego duplicado sin await

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto — detectado por revisión de código
- **Descripción:** `registrarUnVideojuego()` llama a `determinarSiExisteElVideojuego()` sin utilizar `await`.
- **Resultado esperado:** Esperar el resultado de la consulta antes de determinar si el videojuego ya existe.
- **Resultado actual:** Se evalúa directamente una `Promise`.
- **Observación:** La prueba funcional del duplicado está bloqueada actualmente por BUG-011.

---

## BUG-013 — Inserción de puntuación sin esperar resultado de MySQL

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto — detectado por revisión de código
- **Descripción:** `crearPuntuacion()` llama a la función asíncrona `registrarPuntuacion()` sin utilizar `await`.
- **Resultado esperado:** La API debe esperar a que MySQL confirme el INSERT antes de responder que la puntuación fue registrada.
- **Resultado actual:** La función devuelve la nueva puntuación sin esperar explícitamente la finalización de la operación.
- **Impacto:** La API podría responder éxito antes de confirmar que el registro se realizó correctamente.

---

## BUG-014 — Búsqueda por Gamertag no funciona correctamente

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** `GET /api/jugadores` procesa el parámetro `nombre`, pero no procesa el parámetro `gamertag`.
- **Prueba realizada:** `GET /api/jugadores?gamertag=Shadow`.
- **Resultado esperado:** Devolver únicamente las coincidencias cuyo Gamertag sea `Shadow`.
- **Resultado obtenido:** HTTP 200, pero se devolvieron todos los jugadores registrados:
  - Shadow
  - Nova
  - shynzx
  - Chocorroll
- **Conclusión:** El parámetro `gamertag` está siendo ignorado.

---

## BUG-015 — Gamertag duplicado podría responder como error interno

- **Rama:** `feature/api`
- **Severidad:** Media
- **Estado:** Pendiente de prueba funcional
- **Descripción:** `crearJugador()` lanza una excepción cuando el Gamertag ya existe, pero el endpoint posee un `catch` general que devuelve HTTP 500.
- **Resultado esperado:** Responder con un error de validación adecuado, como HTTP 400 o 409, informando que el Gamertag ya existe.
- **Resultado actual:** Pendiente de confirmar mediante prueba funcional.
- **Observación:** Detectado durante revisión de código.

---

## BUG-016 — Jugador o videojuego inexistente devuelve HTTP 500

- **Rama:** `feature/api`
- **Severidad:** Media
- **Estado:** Abierto
- **Descripción:** La lógica detecta correctamente cuando el jugador o videojuego no existe, pero el endpoint convierte dichas validaciones en errores internos del servidor.
- **Pruebas realizadas:**
  - `jugadorId = 9999`, `videojuegoId = 1`, puntuación = 100.
  - `jugadorId = 1`, `videojuegoId = 9999`, puntuación = 100.
- **Resultado esperado:** HTTP 400 o 404 con un mensaje indicando que el jugador o videojuego no existe.
- **Resultado obtenido:** HTTP 500 en ambos casos.
- **Conclusión:** La validación existe, pero el manejo de errores del endpoint debe corregirse.

---

# Resultados adicionales de la reprueba

Durante la segunda ronda de QA se verificaron correctamente las siguientes funcionalidades de la API:

- `GET /api/jugadores` → HTTP 200.
- `GET /api/videojuegos` → HTTP 200.
- `GET /api/puntuaciones` → HTTP 200.
- `GET /api/clasificaciones` → HTTP 200.
- `GET /api/estadisticas` → HTTP 200.
- Búsqueda por nombre (`nombre=Gabriel`) → HTTP 200 y coincidencia correcta.
- Búsqueda sin resultados (`nombre=JugadorXYZ999`) → HTTP 404.
- Registro válido de puntuación con valor `500` → HTTP 201.

---

# Estado general de QA

La segunda revisión muestra avances importantes en `feature/api`.

Los BUG-002, BUG-003, BUG-004 y BUG-006 fueron corregidos y verificados por QA.

El BUG-005 fue corregido parcialmente, ya que ahora se valida la existencia del jugador y del videojuego, pero todavía se permiten puntuaciones negativas.

Durante la reprueba se identificaron nuevas incidencias registradas como BUG-011 a BUG-016.

Las funcionalidades de clasificación y estadísticas ya funcionan a nivel API, pero todavía deben integrarse correctamente con `feature/interfaz`.

El proyecto aún no puede ser aprobado completamente por QA mientras existan incidencias de severidad alta abiertas. Una vez que los desarrolladores realicen las correcciones pendientes, se deberá ejecutar una nueva ronda de pruebas de regresión.