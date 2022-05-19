const express = require("express");
const app = express();
const productRouter = require("./server.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Defino mi entorno publico
app.use(express.static("public"));
app.use("/api/productos", productRouter);

app.listen(8080, () => {
  console.log("Estoy escuchando 8080");
});