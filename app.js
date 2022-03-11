const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const invRoutes = require('./routes/invRoutes');

const app = express();

// View engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

const uri = process.env.DB_URI;

// Connect to MongoDb
mongoose
	.connect(uri)
	.then((result) => {
		console.log('connected to db');
	})
	.catch((err) => {
		console.log(err);
	});
app.listen(3000);

// Request handlers
// Invoices routes
app.use(invRoutes);

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
