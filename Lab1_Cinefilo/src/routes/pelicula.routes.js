const { Router } = require("express");
const PeliculaController = require("../controllers/pelicula.controller");

// RUTAS: conectan cada verbo + URL con una acción del controlador
const router = Router();
const controller = new PeliculaController();

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
