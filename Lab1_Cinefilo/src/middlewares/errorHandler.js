// Manejador de errores: 4 parámetros. Responde siempre en JSON.
const errorHandler = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON mal formado" });
  }

  const status = err.status || 500;

  if (status < 500) {
    return res.status(status).json({ error: err.message });
  }

  const body = { error: "Error interno del servidor" };
  if (process.env.NODE_ENV === "development") body.stack = err.stack;
  return res.status(500).json(body);
};

module.exports = errorHandler;
