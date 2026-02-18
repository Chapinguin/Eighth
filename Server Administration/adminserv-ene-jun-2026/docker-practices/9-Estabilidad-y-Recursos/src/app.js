const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Servidor de Prueba de Estabilidad</h1><p>Estado: OK</p>');
});

// Endpoint para el Healthcheck
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});

// Endpoint para simular un fallo crítico
app.get('/suicide', (req, res) => {
  console.log('Recibida orden de apagado...');
  process.exit(1); 
});

app.listen(port, () => {
  console.log(`App escuchando en http://localhost:${port}`);
});
