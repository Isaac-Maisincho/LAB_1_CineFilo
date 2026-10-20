const { Router } = require("express");
const peliculaRoutes = require("./pelicula.routes");

// Archivo principal de rutas: cada recurso se monta en su propio prefijo.
// app.js monta este router bajo /api, por lo que el recurso queda en /api/peliculas
const router = Router();

router.use("/peliculas", peliculaRoutes);

module.exports = router;
