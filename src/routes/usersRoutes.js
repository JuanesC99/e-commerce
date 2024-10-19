import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/register', (req, res) => {
    res.render('register');
});

// Mostrar la página de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', registerUser, async (req, res) => {
    // Aquí va la lógica para registrar el usuario
    const { name, email, password } = req.body;
    // Crea un nuevo usuario en la base de datos y luego redirige
    res.redirect('/users/login');
});

// Procesar el formulario de inicio de sesión
router.post('/login', loginUser, async (req, res) => {
    // Aquí va la lógica para iniciar sesión
    const { email, password } = req.body;
    // Si las credenciales son correctas, redirigir al dashboard o inicio
    res.redirect('/');
});

router.get('/profile', protect, getUserProfile);


export default router;
