import express from 'express';
import Product from '../models/Products.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.render('home', {
            title: 'Tienda en línea',
            products,
            year: new Date().getFullYear()
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.render('home', { message: 'Error al obtener productos' });
    }
});




export default router;