// Registra hora, verbo HTTP y ruta de cada petición
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // sin next() la petición se queda colgada
};

module.exports = logger;
