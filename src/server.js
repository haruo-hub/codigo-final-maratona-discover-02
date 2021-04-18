const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

// Habilitando o motor de visualização EJS...
server.set("view engine", "ejs");

// Alterando a localizacao padrao da pasta "views"...
server.set("views", path.join(__dirname, "views"));

// Habilitar arquivos estáticos..
server.use(express.static("public"));

// Usar request.body com Formularios...
server.use(express.urlencoded({ extended: true }));

// Routes...
server.use(routes);

server.listen(3000, () => console.log('Servidor iniciado!'));