const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Servidor de Tikray funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor de Tikray corriendo en http://localhost:${PORT}`);
});
