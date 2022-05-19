const express = require("express");
const multer = require("multer");
const productRouter = express.Router();
const fs = require("fs");
const Contenedor = require('./classContenedor.js');
const path = require('path')
const router = express.Router();
module.exports = productRouter;

const app = express();
const puerto = 8080;

productRouter.use(express.json());
productRouter.use(express.urlencoded({extended: true}));

const fileName = path.resolve(__dirname,'productos.txt');
console.log(fileName);
let productos = new Contenedor(fileName);


productRouter.get('/',  async (req, res) => {
    let array = await productos.getAll();
    res.send(array);
});

productRouter.get('/:id', async (req, res) => {
    let producto=await productos.getById(req.params.id);
    res.send(producto);
});

productRouter.post('/', async (req, res) => {
    let producto = JSON.stringify(req.body);
    let productoSave=await productos.save(producto);
    res.send(productoSave);
});

productRouter.put('/:id', async (req, res) => {
    let producto=await productos.getById(req.params.id);
    res.send(producto);
});

productRouter.delete('/:id', async (req, res) => { 
    res.sendStatus(await productos.deleteById(req.params.id));
})
