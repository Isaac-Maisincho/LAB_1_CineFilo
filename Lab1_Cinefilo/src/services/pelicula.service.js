const PeliculaModel = require("../models/pelicula.model");
const HttpError = require("../utils/httpError");

// Lanza HttpError (400, 404) cuando una regla no se cumple.
class PeliculaService {
  constructor(model = new PeliculaModel()) {
    this.model = model;
  }

  // Lanza HttpError 400 si los datos no son válidos.
  validate(data, { partial = false } = {}) {
    // Validación 1: titulo obligatorio
    if (!partial || data.titulo !== undefined) {
      if (typeof data.titulo !== "string" || data.titulo.trim().length === 0) {
        throw new HttpError(400, "El campo titulo es obligatorio");
      }
    }

    // Validación 2: duracionMinutos y precioEntrada mayores a 0
    for (const campo of ["duracionMinutos", "precioEntrada"]) {
      if (!partial || data[campo] !== undefined) {
        if (typeof data[campo] !== "number" || !Number.isFinite(data[campo]) || data[campo] <= 0) {
          throw new HttpError(400, `El campo ${campo} debe ser un número mayor a 0`);
        }
      }
    }
  }

  // Convierte el id recibido 
  parseId(id) {
    const n = Number(id);
    if (!Number.isInteger(n)) throw new HttpError(400, "El id debe ser numérico");
    return n;
  }

  async list() {
    return this.model.readAll();
  }

  async getById(id) {
    const numId = this.parseId(id);
    const item = (await this.model.readAll()).find((p) => p.id === numId);
    if (!item) throw new HttpError(404, "Película no encontrada");
    return item;
  }

  async create(data) {
    this.validate(data);
    const items = await this.model.readAll();
    const id = items.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    const nueva = { id, ...this.model.pick(data) };
    items.push(nueva);
    await this.model.writeAll(items);
    return nueva;
  }

  async update(id, data) {
    const numId = this.parseId(id);
    this.validate(data, { partial: true });
    const items = await this.model.readAll();
    const index = items.findIndex((p) => p.id === numId);
    if (index === -1) throw new HttpError(404, "Película no encontrada");
    items[index] = { ...items[index], ...this.model.pick(data), id: numId };
    await this.model.writeAll(items);
    return items[index];
  }

  async remove(id) {
    const numId = this.parseId(id);
    const items = await this.model.readAll();
    const index = items.findIndex((p) => p.id === numId);
    if (index === -1) throw new HttpError(404, "Película no encontrada");
    items.splice(index, 1);
    await this.model.writeAll(items);
  }
}

module.exports = PeliculaService;
