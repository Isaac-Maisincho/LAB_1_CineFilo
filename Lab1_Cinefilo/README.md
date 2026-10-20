# Laboratorio 1 · Mini-API MVC con CRUD

**Desarrollo Web Avanzado (A0R04) · ESPE · Unidad 1: Persistencia de datos y ORM**

| Dato | Valor |
|---|---|
| Grupo | GXX |
| Emprendimiento | |
| Integrantes | 1. Isaac Maisincho |
| NRC | 36878|
| Fecha |19/10/2026 |
| Repositorio | https://github.com/Isaac-Maisincho/LAB_1_CineFilo.git |

## Cómo ejecutar

```bash
npm install
cp .env.example .env      # en Windows: copy .env.example .env
npm run dev               # http://localhost:3000
```

Importa en Postman `postman/GXX_Lab1.postman_collection.json` y ejecuta **Run collection**.

## Estructura MVC en capas

```
src/
├─ app.js            ← arma la app: express.json, middlewares y prefijo /api
├─ server.js         ← solo levanta el servidor (lee .env)
├─ routes/
│  ├─ index.js       ← archivo principal: monta cada recurso (/api/<entidad>)
│  └─ <entidad>.routes.js  ← verbo + URL → acción del controlador
├─ controllers/      ← lee req, llama al servicio, decide código + JSON
├─ services/         ← reglas de negocio, validaciones y acceso a datos
├─ models/           ← campos de la entidad y archivo JSON (Lab 2: schema.prisma)
├─ middlewares/      ← logger, notFound, errorHandler
└─ utils/httpError.js
data/                ← archivo JSON con los registros
```

Flujo de una petición: **ruta → controlador → servicio → modelo** y de vuelta. El proyecto usa CommonJS (`require` / `module.exports`).

## Endpoints de la entidad

| Verbo | Ruta | Acción | Éxito | Errores |
|---|---|---|---|---|
| **GET** | `/api/peliculas` | Listar | 200 | — |
| **GET** | `/api/peliculas/:id` | Ver uno | 200 | 400, 404 |
| **POST** | `/api/peliculas` | Crear | 201 | 400 |
| **PUT** | `/api/peliculas/:id` | Actualizar | 200 | 400, 404 |
| **DELETE**| `/api/peliculas/:id` | Eliminar | 204 | 404 |

## Validaciones del servicio

En la capa de servicio (`src/services/pelicula.service.js`), se implementó el método `validate()` para asegurar la integridad de los datos antes de crear (`POST`) o actualizar (`PUT`) un registro. Si alguna de estas reglas no se cumple, el servidor interrumpe la operación y responde con un código HTTP `400 Bad Request` junto con un mensaje descriptivo:

1. Título obligatorio: Se verifica que el campo `titulo` exista y no esté vacío (evitando cadenas de solo espacios). 
   - *Mensaje de error:* "El título de la película es obligatorio".
2. Duración lógica: Se valida que, si se envía el campo `duracionMinutos`, este sea un valor estrictamente mayor a cero. 
   - *Mensaje de error:* "La duración de la película debe ser mayor a 0".
3. Precio válido: Se comprueba que el `precioEntrada` no contenga valores negativos (debe ser mayor o igual a 0). 
   - *Mensaje de error:* "El precio de la entrada debe ser mayor o igual a 0".

## Aporte de cada integrante

| Integrante | Qué hizo (archivos / pasos) |
|---|---|
| Isaac Maisincho|Controllers / middlewares/ models / routes/services/utils |

## Declaración de uso de IA

- Herramienta(s) usada(s): Google Gemini
- Para qué la usamos (consultar, depurar, explicar un error…): Consulta y solucion de errores en los endpoints
- Qué verificamos o corregimos nosotros: verificamos las rutas de cada endpoint
