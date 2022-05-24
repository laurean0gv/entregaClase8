const express = require("express");
const app = express();
const multer = require("multer");
const productRouter = express.Router();

const Contenedor = require('./classContenedor.js');
const path = require('path')

module.exports = productRouter;

const fileName = path.resolve(__dirname,'productos.txt');
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
    console.log(req.body);
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
