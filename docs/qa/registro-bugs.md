# Registro de Bugs — Sistema de Torneo de Videojuegos

**QA:** Erick Gilberto Reyes Chan  
**Fecha de revisión:** 13/09/2026  
**Ramas revisadas:** `feature/bdd`, `feature/api`, `feature/interfaz`

---

## BUG-001 — Credenciales de base de datos expuestas

- **Rama:** `feature/bdd`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El archivo de conexión a la base de datos contiene credenciales reales como valores por defecto dentro del código.
- **Resultado esperado:** Las credenciales deben obtenerse únicamente mediante variables de entorno.
- **Recomendación:** Eliminar las credenciales del código, utilizar un archivo `.env` no versionado y cambiar la contraseña expuesta.

---

## BUG-002 — Dependencia mysql2 no registrada

- **Rama:** `feature/bdd`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El módulo de base de datos importa `mysql2/promise`, pero `mysql2` no aparece instalado como dependencia del proyecto.
- **Resultado esperado:** Una instalación limpia del proyecto debe incluir todas las dependencias necesarias.
- **Evidencia:** `npm ls mysql2` no mostró la dependencia instalada.

---

## BUG-003 — API utiliza datos simulados en lugar de MySQL

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** Las funciones de jugadores, videojuegos y puntuaciones trabajan con arreglos locales definidos en JavaScript.
- **Resultado esperado:** Los datos deben consultarse y almacenarse en MySQL.
- **Impacto:** No cumple con el requisito de persistencia del proyecto.

---

## BUG-004 — Ruta incorrecta en importación de puntuaciones

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** La API de puntuaciones importa desde `utlidades/puntuaciones` en lugar de `utilidades/puntuaciones`.
- **Resultado esperado:** La ruta de importación debe coincidir con la estructura real del proyecto.
- **Observación:** La prueba funcional quedó bloqueada por otros errores de compilación.

---

## BUG-005 — Registro de puntuaciones sin validaciones requeridas

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** La función que registra puntuaciones permite insertar datos sin comprobar que el jugador exista, que el videojuego exista o que la puntuación sea mayor o igual a cero.
- **Resultado esperado:** Deben validarse las reglas definidas para el registro de puntuaciones.

---

## BUG-006 — Error de exportación en API de videojuegos

- **Rama:** `feature/api`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** `route.js` intenta importar `videojuegos`, pero dicho elemento no está exportado desde el archivo de utilidades.
- **Resultado obtenido:** La solicitud a `/api/videojuegos` genera error de compilación y respuesta HTTP 500.
- **Impacto:** También bloquea otras pruebas relacionadas con la API.

---

## BUG-007 — Registro de puntuación no recibe videojuegos

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El componente `RegistroPuntos` espera recibir una lista de videojuegos, pero `page.js` no proporciona dicha propiedad.
- **Resultado obtenido:** El selector de videojuegos aparece vacío.
- **Resultado esperado:** El usuario debe poder seleccionar un videojuego existente.

---

## BUG-008 — Clasificación no recibe datos

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El componente de clasificación se renderiza sin recibir información de ranking.
- **Resultado obtenido:** La tabla muestra permanentemente que no existen puntuaciones.
- **Resultado esperado:** Debe mostrar el ranking ordenado por puntuación de mayor a menor.

---

## BUG-009 — Estadísticas no reciben datos

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** El componente de estadísticas se renderiza sin recibir información.
- **Resultado obtenido:** Total de jugadores, videojuegos, puntuaciones y promedio aparecen en cero.
- **Resultado esperado:** Las estadísticas deben calcularse utilizando información almacenada en MySQL.

---

## BUG-010 — API de jugadores utiliza funciones no definidas

- **Rama:** `feature/interfaz`
- **Severidad:** Alta
- **Estado:** Abierto
- **Descripción:** `src/app/api/jugadores/route.js` utiliza variables y funciones que no están importadas ni definidas.
- **Resultado obtenido:** `GET /api/jugadores` responde HTTP 500 con `ReferenceError: obtenerJugadores is not defined`.
- **Resultado esperado:** El endpoint debe devolver correctamente los jugadores registrados.
- **Impacto:** Bloquea consulta, búsqueda y selección de jugadores en otras funcionalidades.

---

# Estado general de QA

Actualmente las funcionalidades revisadas no pueden ser aprobadas de forma integral debido a errores de integración, uso de datos simulados y problemas de conexión entre frontend, API y base de datos.

Los bugs permanecerán en estado **Abierto** hasta que los desarrolladores realicen las correcciones correspondientes. Posteriormente QA realizará las pruebas de regresión y actualizará su estado.
