const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/ErrorMiddleware');
const colors = require('colors');
const connect = require('./config/db');
const PORT = process.env.PORT || 8000;

//conect to database
connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

//home
app.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to support desk API',
	});
});

//users
app.use('/api/users', require('./routes/userRoutes'));

// error handler handler
app.use(errorHandler);
// start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
