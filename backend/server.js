const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/ErrorMiddleware');
const colors = require('colors');
const connect = require('./config/db')
const PORT = process.env.PORT || 8000;

//conect to database
connect();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ENABLE CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:5000'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// Routes

//Users
app.use('/api/users', require('./routes/userRoutes'));
//Tickets
app.use('/api/tickets', require('./routes/ticketRoutes'));

// serve frontend
if (process.env.NODE_ENV === 'production') {
	//set build folder as static
	app.use(express.static(path.join(__dirname, '../frontend/build')));
	app.get('*', (req, res) =>
		res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
	);
} else {
	//home
	app.get('/', (req, res) => {
		res.status(200).json({
			message: 'Welcome to support desk API',
		});
	});
}

// error handler handler
app.use(errorHandler);
// start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
