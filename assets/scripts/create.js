// DOM Elements
const putForm = document.querySelector('#edit-form');
const form = document.querySelector('#create-form');

const discardBtn = document.querySelector('#discard');
const saveBtn = document.querySelector('#save');
const submitBtn = document.querySelector('#submit');

const qtyInput = document.querySelectorAll('.qty');
const priceInput = document.querySelectorAll('.price');

const thrashBtns = document.querySelectorAll('.thrash');
const secondItem = document.querySelector('#second-item');
const addItem = document.querySelector('#add-item');

// Event listeners
if (putForm) {
	putForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = Object.fromEntries(new FormData(e.currentTarget).entries());

		// const o = {}
		// new FormData(e.currentTarget).forEach((val, key) => o[key] = val);

		// console.log(o);
		console.log(formData);

		fetch(`/invoice/${formData._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				// window.location = data.redirect
				console.log(data);
			})
			.catch((err) => console.log(err));
	});
}

discardBtn.addEventListener('click', () => {
	form.reset();

	window.location = '/';
});

saveBtn.addEventListener('click', () => {
	submitBtn.click();
});

qtyInput.forEach((qty) => {
	qty.addEventListener('input', computeTotal);
});

priceInput.forEach((price) => {
	price.addEventListener('input', computeTotal);
});

thrashBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		// Get the amount of items hidden from the page
		let numOfHiddenItems = Array.from(document.querySelectorAll('.item')).filter((element) =>
			element.classList.contains('hidden')
		).length;

		// Proceed if theres no hidden item
		if (numOfHiddenItems !== 0) {
			return;
		}

		// Clear item inputs
		let item = e.currentTarget.parentElement.parentElement;
		const name = item.querySelector('.item-name');
		const qty = item.querySelector('.qty');
		const price = item.querySelector('.price');

		item.classList.add('hidden');
		name.value = '';
		qty.value = 0;
		price.value = '0.00';

		toggleAddBtnVisibility();
	});
});

addItem.addEventListener('click', () => {
	let hidden = document.querySelectorAll('.item.hidden');

	hidden[0].classList.remove('hidden');

	toggleAddBtnVisibility();
});

function computeTotal(e) {
	let qty = e.currentTarget.parentElement.parentElement.querySelector('.qty').value;
	let price = e.currentTarget.parentElement.parentElement.querySelector('.price').value;
	let total = e.currentTarget.parentElement.parentElement.querySelector('#total');

	if (qty && price) {
		total.textContent = (qty * price).toFixed(2);
	} else {
		total.textContent = '0.00';
	}
}

function toggleAddBtnVisibility() {
	let numOfHiddenItems = document.querySelectorAll('.item.hidden').length;

	if (numOfHiddenItems === 0) {
		addItem.classList.add('hidden');
	} else {
		addItem.classList.remove('hidden');
	}
}
