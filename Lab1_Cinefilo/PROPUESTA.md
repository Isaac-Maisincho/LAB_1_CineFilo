# Propuesta del emprendimiento · Grupo G5

> Actividad 1 de la sesión 1. Complétala antes del Paso 1 del laboratorio.

| Campo | Respuesta |
|---|---|
| Nombre del emprendimiento |Cinefilo |
| Problema que resuelve | El cine necesita un sistema digital propio para actualizar rápidamente su cartelera y gestionar los precios de las entradas, ya que actualmente lo hacen en hojas de cálculo desorganizadas, lo que provoca errores en las funciones. |
| Usuarios (quién lo usa) |Administradores del cine |
| 3 funciones principales | 1. Ingresar una nueva película a la cartelera. 2. Consultar las películas disponibles y sus precios. 3. Actualizar los datos (ej. cambiar precio) o retirar una película de la cartelera. |

## Mapa frontend–backend

Pega aquí la imagen del diagrama (Excalidraw o Mermaid): navegador → servidor → base de datos, con sus flechas.

graph LR
    Cliente[ Navegador Web / Postman] -- "Peticiones HTTP (GET, POST)" --> API((⚙️ Servidor Node/Express))
    API -- "Respuestas (Código 200, 201)" --> Cliente

    API -- "Lee/Escribe (fs.promises)" --> BD[( data/peliculas.json)]
    BD -- "Retorna los datos" --> API

## Entidades (3) y atributos principales

| Entidad | Atributos | ¿Se relaciona con…? |
Pelicula (entidad del Lab 1) | `id`, `titulo`, `genero`, `duracionMinutos`, `precioEntrada`, `clasificacion` | Sala, Reserva |
| (entidad del Lab 1) | | |
| | | |
| | | |

> La primera entidad es la que implementan en este laboratorio (4 o más campos). Las otras dos se usan en los Labs 2 y 3.

## 3 endpoints iniciales

| Verbo | Ruta | Código de estado |
|---|---|---|
| GET | `/api/peliculas` | 200 |
| POST | `/api/peliculas` | 201 |
| PUT | `/api/peliculas/:id` | 200 |