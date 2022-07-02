/*
  Prefiero el Motor EJS, primero porque es el mas parecido a JS de los tres y luego 
  porque es el más elegido en la comunidad.

*/
const express = require('express');
const { Router } = express; 
const ClasProd = require('./clasprod.js');
const c1         = new ClasProd();
const router = Router();


router.get('/productosHand', function (req, res) {
  let resultado = c1.getAll();
  if (!resultado){
    res.render('productos', resultado);    
}else {
    res.render('productos', '');    
}
});

router.get('/productosPug', function (req, res) {
  let resultado = c1.getAll();
  res.render('productosPug', {
    productos : resultado,
    "mensaje": "Productos"
  });   
});

router.get('/productosEjs', function (req, res) {
  let resultado = c1.getAll();
  res.render('ejs/productosEjs', {productos : resultado, mensaje: "Productos"}); 
});


// damos de alta un nuevo producto
router.post('/productos/', function (req, res) {
  let resultado  = c1.save(req.body)
    if(resultado !== null){
        res.status(201).send(resultado);
  } else {
        res.status(400).send({error: 'el producto no pudo darse de alta'})
    }
 
 });
// mostramos un producto según su id
router.get('/productos/:id', function (req, res) {
  let resultado = c1.getById(Number(req.params.id));
  if(resultado !== null){
        res.status(200).send(resultado)
    } else {
        res.status(400).send({error: 'producto no encontrado'})
    }
});
// actualizamos un producto
router.put('/productos/:id', function (req, res) {
  let resultado  = c1.rewriteById(req.body)
  if(resultado !== null){
    res.sendStatus(200)
  } else {
    res.status(400).send({error: 'No hay productos'})
  }
});

//Borramos un producto
router.delete('/productos/:id', function (req, res) {
  let resultado = c1.deleteById(Number(req.params.id));
  if(resultado !== -1){
        res.senStatus(200)
    } else {
        res.status(400).send({error: 'producto no encontrado'})
    }  
});

module.exports = router;