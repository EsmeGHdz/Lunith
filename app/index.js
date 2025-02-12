import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from './controllers/authentication.controller.js';


//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));

//Configuracion
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//Rutas
app.get("/", (req, res) => {
    res.sendFile("pages/home.html", { root: __dirname });
});

app.get("/acercade", (req, res) => {
    res.sendFile("pages/acercade.html", { root: __dirname });
});

app.get("/register", (req, res) => {
    res.sendFile("pages/register.html", { root: __dirname });
});

app.get("/login", (req, res) => {
    res.sendFile("pages/login.html", { root: __dirname });
});

app.get("/admin", (req, res) => {
    res.sendFile("pages/admin/admin.html", { root: __dirname });
});

app.get("/carrito", (req, res) => {
    res.sendFile("pages/carrito.html", { root: __dirname });
});

app.post("/api/register", authentication.register);

app.post("/api/login", authentication.login);

