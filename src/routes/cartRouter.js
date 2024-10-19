import express from 'express';
import Product from '../models/Products.js';

const router = express.Router();

let cart = [];

// Agregar un producto al carrito
router.post('/add', async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Busca el producto en la base de datos
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Verifica que la cantidad sea válida
        const validQuantity = parseInt(quantity);
        if (isNaN(validQuantity) || validQuantity <= 0) {
            return res.status(400).send('Cantidad inválida');
        }

        // Asegúrate de que la sesión tiene un carrito inicializado
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Agrega el producto al carrito con la información necesaria
        const itemInCart = {
            productId: product._id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: validQuantity,
            totalPrice: product.price * validQuantity
        };

        // Añade el producto al carrito
        req.session.cart.push(itemInCart);

        // Devuelve una respuesta de éxito
        res.status(200).json({ message: 'Producto agregado al carrito', cart: req.session.cart });
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).send('Error al agregar el producto al carrito');
    }
});


// Ruta para mostrar el carrito
router.get('/cart', (req, res) => {
    // Obtener el carrito de la sesión o inicializarlo si está vacío
    const cart = req.session.cart || [];

    let total = 0;

    // Asegurarse de que cada item del carrito tiene un precio y cantidad válidos
    const cartWithPrices = cart.map(item => {
        if (!item.price || !item.quantity) {
            console.error('Producto inválido en el carrito:', item);
            return { ...item, totalPrice: 0 }; // Evitar NaN al asignar precio total
        }

        // Calcular el total del producto
        const totalPrice = parseFloat(item.price) * parseInt(item.quantity);
        total += totalPrice; // Sumar al total del carrito

        // Retornar el producto con su totalPrice
        return { ...item, totalPrice };
    });

    // Verificar en la consola el contenido del carrito y el total
    console.log('Carrito con precios calculados:', cartWithPrices);
    console.log('Total del carrito:', total);

    // Renderizar la vista del carrito
    res.render('carrito', {
        cart: cartWithPrices,
        total: total.toFixed(2) // Mostrar el total con dos decimales
    });
});



router.get('/', (req, res) => {
    const cart = req.session.cart || [];
    let total = 0;

    // Asegurarse de que cada item del carrito tiene un precio y cantidad válidos
    const cartWithPrices = cart.map(item => {
        const totalPrice = parseFloat(item.price) * parseInt(item.quantity);
        total += totalPrice;
        return { ...item, totalPrice };  // Retorna cada item con su totalPrice
    });

    // Renderiza el carrito con los productos y el total
    res.render('carrito', {
        cart: cartWithPrices,
        total: total.toFixed(2)  // Redondea el total a dos decimales
    });
});

// Actualizar la cantidad de un producto en el carrito
router.put('/update', (req, res) => {
    const { productId, quantity } = req.body;
    const product = cart.find(p => p.productId === productId);

    if (product) {
        product.quantity = quantity;  // Actualiza la cantidad
        res.json({ message: 'Cantidad actualizada', cart });
    } else {
        res.status(404).json({ message: 'Producto no encontrado en el carrito' });
    }
});

// Eliminar un producto del carrito
router.delete('/remove', (req, res) => {
    const { productId } = req.body;
    cart = cart.filter(p => p.productId !== productId);
    res.json({ message: 'Producto eliminado del carrito', cart });
});

export default router;
