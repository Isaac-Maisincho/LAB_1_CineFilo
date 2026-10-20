const fs = require("node:fs/promises");
const path = require("node:path");

// define los campos de la entidad Pelicula y se encarga de leer/escribir
class PeliculaModel {
  constructor(file = process.env.DATA_FILE || "data/peliculas.json") {
    this.file = path.resolve(file);
    this.fields = ["titulo", "genero", "duracionMinutos", "precioEntrada", "clasificacion"];
  }

  async readAll() {
    try {
      return JSON.parse(await fs.readFile(this.file, "utf8"));
    } catch (err) {
      if (err.code === "ENOENT") return []; // si el archivo aún no existe, no hay registros
      throw err;
    }
  }

  async writeAll(items) {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    await fs.writeFile(this.file, JSON.stringify(items, null, 2), "utf8");
  }

  // Copia solo los campos permitidos
  pick(data) {
    return Object.fromEntries(
      this.fields.filter((k) => data[k] !== undefined).map((k) => [k, data[k]])
    );
  }
}

module.exports = PeliculaModel;
