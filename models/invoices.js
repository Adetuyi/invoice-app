const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
	{
		status: {
			type: String,
			required: true,
		},
		from: {
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			postCode: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
		},
		client: {
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			postCode: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
		},
		invoice: {
			date: {
				type: String,
				required: true,
			},
			term: {
				type: Number,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},
		},
		items: {
			name: {
				type: String,
				required: true,
			},
			qty: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	},
	{ timestamps: true }
);

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
