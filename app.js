const express = require('express');
const mongoose = require('mongoose');

const app = express();

const uri =
	'mongodb+srv://Seyi:yrodykTkDkLObfvg@invoice-app.vxcrl.mongodb.net/invoice-app?retryWrites=true&w=majority';

mongoose
	.connect(uri)
	.then((result) => {
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});

const schema = mongoose.Schema({
	body: {
		type: String,
		required: true,
	},
});
const Model = mongoose.model('invoice', schema);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.redirect('/invoices');
});

app.get('/create', (req, res) => {
	const test = new Model({
		body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe omnis architecto non laudantium vero voluptatem amet beatae eum nemo delectus est modi facere hic ullam labore doloremque, quas, totam debitis.',
	});

	test.save()
		.then((result) => res.redirect('/'))
		.catch((err) => console.log(err));
});

app.get('/invoices', (req, res) => {
	Model.find()
		.then((result) => {
			console.log(result);
			res.render('invoice/index', { title: 'Invoice App', invoices: result });
		})
		.catch((err) => console.log(err));
});
