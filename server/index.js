require('dotenv').config();
let express = require('express');
let session = require('express-session');
let checkForSession = require('./middlewares/checkForSession');
let swagController = require('./controllers/swagController');
let authController = require('./controllers/authController');
let cartController = require('./controllers/cartController');
let searchController = require('./controllers/searchController');

let app = express();
let {SERVER_PORT, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(session( {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagController.read);

app.get('/api/user', authController.getUser);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);

app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart', cartController.add);
app.delete('/api/cart', cartController.delete);

app.get('/api/search', searchController.search);

app.listen(SERVER_PORT, () => console.log(`The server is listening on port ${SERVER_PORT}`));