const Invoice = require('../models/invoices');
const moment = require('moment');

// Get all invoices
const invoices_get = (req, res) => {
	Invoice.find()
		.then((results) => {
			res.render('invoice/index', { title: '', invoices: results });
		})
		.catch((err) => console.log(err));
};

// Get single invoice
const invoice_get = (req, res) => {
	const id = req.params.id;

	Invoice.findById(id)
		.then((result) => {
			const formattedDate = moment(new Date(result.invoice.date)).format('DD MMM YYYY');

			res.render('invoice/details', {
				title: 'Details',
				invoice: result,
				formattedDate,
			});
		})
		.catch((err) => {
			res.status(404).render('404', { title: '404' });
		});
};

// Create page
const invoice_create_get = (req, res) => {
	const { id } = req.query;

	if (id) {
		Invoice.findById(id)
			.then((result) => {
				const date = new Date(result.invoice.date).toJSON().slice(0, 10);

				res.render('invoice/create_invoice', {
					title: 'Editting invoice',
					invoice: result,
					date: date,
				});
			})
			.catch((err) => {
				console.log(err);
				res.render('invoice/create_invoice', { title: 'New invoice', invoice: '' });
			});
	} else {
		res.render('invoice/create_invoice', { title: 'New invoice', invoice: '' });
	}
};

// Create new invoice
const invoice_post = (req, res) => {
	const body = req.body;
	const formattedDate = moment(new Date(body.inv_date)).format('DD MMM YYYY');

	const invoice = new Invoice({
		status: 'pending',
		from: {
			address: body.from_address,
			city: body.from_city,
			postCode: body.from_post_code,
			country: body.from_country,
		},
		client: {
			name: body.name,
			email: body.email,
			address: body.address,
			city: body.city,
			postCode: body.post_code,
			country: body.country,
		},
		invoice: {
			date: formattedDate,
			term: parseInt(body.term),
			description: body.description,
		},
		items: {
			name: body.item_name,
			qty: parseInt(body.qty),
			price: parseInt(body.price),
		},
	});

	invoice
		.save()
		.then((result) => {
			res.redirect('/');
		})
		.catch((err) => console.log(err));
};

// Delete Invoice
const invoice_delete = (req, res) => {
	const id = req.params.id;

	Invoice.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: '/' });
		})
		.catch((err) => console.log(err));
};

// Edit Invoice
// NOT WORKING YET
const invoice_edit = (req, res) => {
	const body = req.body;
	const id = req.params.id;
	console.log('BODY:', body);

	const invoice = new Invoice({
		status: 'pending',
		from: {
			address: body.from_address,
			city: body.from_city,
			postCode: body.from_post_code,
			country: body.from_country,
		},
		client: {
			name: body.name,
			email: body.email,
			address: body.address,
			city: body.city,
			postCode: body.post_code,
			country: body.country,
		},
		invoice: {
			date: body.inv_date,
			term: parseInt(body.term),
			description: body.description,
		},
		items: {
			name: body.item_name,
			qty: parseInt(body.qty),
			price: parseInt(body.price),
		},
	});

	Invoice.findByIdAndUpdate(id, { status: 'paid' });
	// .then((result) => {
	// 	res.redirect(`/invoice/${id}`);
	// })
	// .catch((err) => console.log(err));
};

module.exports = {
	invoices_get,
	invoice_get,
	invoice_create_get,
	invoice_post,
	invoice_delete,
	invoice_edit,
};
