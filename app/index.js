import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));

//Configuracion
app.use(express.static(path.join(__dirname, "public")));

//Rutas
app.get("/", (req, res) => {
    res.sendFile("pages/home.html", { root: __dirname });
});

app.get("/acercade", (req, res) => {
    res.sendFile("pages/acercade.html", { root: __dirname });
});