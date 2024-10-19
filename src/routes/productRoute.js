import express from 'express';
import { 
    getProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js';
import Product from '../models/Products.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getProducts);


// Ruta para obtener los detalles del producto
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); 
        res.render('productsDetails', { product });
    } catch (error) {
        console.error('Error:', error);
    }
});

router.post('/',  createProduct);


router.put('/:id',  updateProduct);


router.delete('/:id',  deleteProduct);

export default router;
