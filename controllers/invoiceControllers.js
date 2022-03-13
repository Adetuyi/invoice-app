const Invoice = require('../models/invoices');
const moment = require('moment');

// PAGE RETURNERS
// Get all invoices
const invoices_get = (req, res) => {
	Invoice.find()
		.sort({ createdAt: -1 })
		.then((results) => {
			res.render('invoice/index', { title: '', invoices: results });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).render('500', { redirect: '/', title: '500' });
		});
};

// Create page
const invoice_create_get = (req, res) => {
	const { id } = req.query;

	if (id) {
		Invoice.findById(id)
			.then((result) => {
				res.render('invoice/create_invoice', {
					title: 'Editting invoice',
					invoice: result,
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

// ACTION DOERS
// Create new invoice
const invoice_post = (req, res) => {
	const body = req.body;
	const invDate = new Date(body.inv_date);
	let formattedInvDate = '';
	let dueDate = '';
	let formattedDueDate = '';

	if (!isNaN(invDate)) {
		formattedInvDate = moment(invDate).format('DD MMM YYYY');
		dueDate = invDate.setDate(invDate.getDate() + parseInt(body.terms));
		formattedDueDate = moment(dueDate).format('DD MMM YYYY');
	}

	const total = body.price_one * body.qty_one + body.price_two * body.qty_two;

	const status = body.status === 'draft' ? 'draft' : 'pending';

	const invoice = new Invoice({
		status,
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
			invDate: body.inv_date,
			formattedInvDate,
			formattedDueDate,
			terms: parseInt(body.terms),
			description: body.description,
			total,
		},
		items: [
			{
				name: body.item_one_name,
				qty: parseInt(body.qty_one),
				price: parseInt(body.price_one),
			},
			{
				name: body.item_two_name,
				qty: parseInt(body.qty_two),
				price: parseInt(body.price_two),
			},
		],
	});

	invoice
		.save()
		.then((result) => {
			res.redirect('/');
		})
		.catch((err) => {
			console.log(err);
			res.status(500).render('500', { redirect: '/new-invoice', title: '500' });
		});
};

// Get single invoice
const invoice_get = (req, res) => {
	const id = req.params.id;

	Invoice.findById(id)
		.then((result) => {
			res.render('invoice/details', {
				title: 'Details',
				invoice: result,
			});
		})
		.catch((err) => {
			res.status(404).render('404', { title: '404' });
		});
};

// Update invoice to paid
const invoice_update = (req, res) => {
	const id = req.params.id;

	Invoice.findByIdAndUpdate(id, { status: 'paid' }, (err, newDoc) => {
		if (err) {
			console.log(err);
			res.status(500).render('500', { redirect: `/invoice/${id}`, title: '500' });
		} else {
			res.json({ success: true });
		}
	});
};

// Delete Invoice
const invoice_delete = (req, res) => {
	const id = req.params.id;

	Invoice.findByIdAndDelete(id)
		.then((result) => {
			res.json({ redirect: '/' });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).render('500', { redirect: `/invoice/${id}`, title: '500' });
		});
};

// Edit Invoice
const invoice_edit = (req, res) => {
	const body = req.body;
	const id = req.params.id;

	const invDate = new Date(body.inv_date);
	const dueDate = invDate.setDate(invDate.getDate() + parseInt(body.terms));
	const formattedDueDate = moment(dueDate).format('DD MMM YYYY');

	const total = body.price_one * body.qty_one + body.price_two * body.qty_two;

	const invoice = {
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
		'invoice.formattedDueDate': formattedDueDate,
		'invoice.terms': parseInt(body.terms),
		'invoice.description': body.description,
		'invoice.total': total,

		items: [
			{
				name: body.item_one_name,
				qty: parseInt(body.qty_one),
				price: parseInt(body.price_one),
			},
			{
				name: body.item_two_name,
				qty: parseInt(body.qty_two),
				price: parseInt(body.price_two),
			},
		],
	};

	Invoice.findByIdAndUpdate(id, invoice, (err, updatedInvoice) => {
		if (err) {
			console.log(err);
			res.status(500).render('500', { redirect: `/new-invoice?id=${id}`, title: '500' });
		} else {
			res.redirect('/');
		}
	});
};

module.exports = {
	invoices_get,
	invoice_get,
	invoice_create_get,
	invoice_post,
	invoice_update,
	invoice_delete,
	invoice_edit,
};
