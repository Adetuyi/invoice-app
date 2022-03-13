const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema(
	{
		status: {
			type: String,
			required: true,
		},
		from: {
			address: String,
			city: String,
			postCode: String,
			country: String,
		},
		client: {
			name: String,
			email: String,
			address: String,
			city: String,
			postCode: String,
			country: String,
		},
		invoice: {
			invDate: String,
			formattedInvDate: String,
			formattedDueDate: String,
			terms: Number,
			description: String,
			total: Number,
		},
		items: [
			{
				name: String,
				qty: Number,
				price: Number,
			},
			{
				name: String,
				qty: Number,
				price: Number,
			},
		],
	},
	{ timestamps: true }
);

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
