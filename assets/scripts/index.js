const invoices = document.querySelectorAll('.invoice');
const filter = document.querySelector('#filter');
const list = document.querySelector('#list');
const draft = list.querySelector('#draft');
const pending = list.querySelector('#pending');
const paid = list.querySelector('#paid');

filter.addEventListener('click', (e) => {
	list.classList.toggle('active');

	e.currentTarget.classList.toggle('active');
});

draft.addEventListener('click', filterInvoice);
pending.addEventListener('click', filterInvoice);
paid.addEventListener('click', filterInvoice);

function filterInvoice(e) {
	let target = e.currentTarget;

	if (target.classList.contains('active')) {
		target.classList.remove('active');

		invoices.forEach((invoice) => {
			invoice.classList.remove('filtered-out');
		});
	} else {
		list.querySelectorAll('button').forEach((btn) => {
			btn.classList.remove('active');
		});

		invoices.forEach((invoice) => {
			invoice.classList.remove('filtered-out');

			let filter = target.dataset.filter_for;
			let isValid = invoice.querySelector('.status').classList.contains(filter);

			target.classList.add('active');

			if (!isValid) {
				invoice.classList.add('filtered-out');
			}
		});
	}
}
