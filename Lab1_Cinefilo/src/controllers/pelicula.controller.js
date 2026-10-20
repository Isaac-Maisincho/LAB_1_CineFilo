const PeliculaService = require("../services/pelicula.service");

// CONTROLADOR: extrae req.params / req.body, llama al servicio y responde.
// No valida reglas ni toca archivos. Los errores van a next(err) → errorHandler.
class PeliculaController {
  constructor(service = new PeliculaService()) {
    this.service = service;

    this.list = this.list.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async list(req, res, next) {
    try {
      res.status(200).json(await this.service.list());
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      res.status(200).json(await this.service.getById(req.params.id));
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      res.status(201).json(await this.service.create(req.body ?? {}));
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      res.status(200).json(await this.service.update(req.params.id, req.body ?? {}));
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      await this.service.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PeliculaController;
