import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/usersRoutes.js';
import homeRoutes from './routes/routes.js';
import cartRoutes from './routes/cartRouter.js';
import session from 'express-session';
import { __dirname } from './utils.js';

dotenv.config();



connectDB();

const app = express();


app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, 
        allowProtoMethodsByDefault: true,     
    },
    helpers: {
        calculateTotal: function (cart) {
            let total = 0;
            cart.forEach(item => {
                total += (item.quantity || 1) * (parseFloat(item.price) || 0); 
            });
            return `$${total.toFixed(2)}`;
        }
    }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'mi-clave-secreta',  
    resave: false,               
    saveUninitialized: true,     
    cookie: { secure: false }    
}));


app.get('/', (req, res) => {
    res.redirect('/api');
});


app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/api', homeRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
