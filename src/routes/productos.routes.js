import express from 'express';
import pool from '../database.js';

const router = express.Router();

// Ruta para renderizar la vista de agregar producto
router.get('/add', (req, res) => {
    res.render('productos/add');
});

// Ruta para agregar un nuevo producto
router.post('/add', async(req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const newProducto = {
            name,
            marca: lastname, // Corregido el nombre de la propiedad
            precio: age
        };
        await pool.query('INSERT INTO productos SET ?', [newProducto]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/list', async(req, res)=>{
    try{
        const [result] = await pool.query('SELECT * FROM productos');
        res.render('productos/list', {productos: result});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        const productoEdit = producto[0];
        res.render('productos/edit', {producto: productoEdit});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id', async(req, res)=>{
    try{
        const {name, lastname, age} = req.body;
        const {id} = req.params;
        const editProducto = {name, marca: lastname, precio: age};
        await pool.query('UPDATE productos SET ? WHERE id = ?', [editProducto, id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});

export default router;
