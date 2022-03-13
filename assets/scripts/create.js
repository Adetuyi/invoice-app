// Variables
const possibleTerms = [1, 7, 14, 30];

// DOM Elements
const putForm = document.querySelector('#edit-form');
const form = document.querySelector('#create-form');

const discardBtn = document.querySelector('#discard');
const saveBtn = document.querySelector('#save');
const saveDraftBtn = document.querySelector('#save-draft');
const saveChangesBtn = document.querySelector('#save-changes');
const submitBtn = document.querySelector('#submit-create');
const putSubmitBtn = document.querySelector('#put-submit');
const thrashBtns = document.querySelectorAll('.thrash');

const qtyInput = document.querySelectorAll('.qty');
const priceInput = document.querySelectorAll('.price');
const termsInput = document.querySelector('#terms');
const dateInput = document.querySelector('#date');
const statusInput = document.querySelector('#status');

const selectCon = document.querySelector('.selectCon');
const select = document.querySelector('.select');
const options = document.querySelectorAll('.option');
const items = document.querySelectorAll('.item');
const secondItem = document.querySelector('#second-item');
const addItem = document.querySelector('#add-item');

// Event listeners
discardBtn &&
	discardBtn.addEventListener('click', () => {
		form.reset();

		window.location = '/';
	});

saveBtn &&
	saveBtn.addEventListener('click', () => {
		if (validateTerms() && validateItems()) {
			submitBtn.click();
		}
	});

saveDraftBtn &&
	saveDraftBtn.addEventListener('click', () => {
		statusInput.value = 'draft';

		form.submit();
	});

saveChangesBtn &&
	saveChangesBtn.addEventListener('click', () => {
		if (validateItems() && validateTerms()) {
			putSubmitBtn.click();
		}
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
		const total = item.querySelector('#total');

		item.classList.add('hidden');
		name.value = '';
		qty.value = 0;
		price.value = '0.00';
		total.textContent = '0.00';

		toggleAddBtnVisibility();
	});
});

selectCon.addEventListener('click', (e) => {
	e.currentTarget.classList.toggle('visible');
});

options.forEach((option) => {
	option.addEventListener('click', (e) => {
		let term = e.currentTarget;

		termsInput.value = term.dataset.value;
		select.querySelector('span').textContent = term.textContent;
	});
});

addItem.addEventListener('click', () => {
	let hidden = document.querySelectorAll('.item.hidden');

	hidden[0].classList.remove('hidden');

	toggleAddBtnVisibility();
});

// Functions
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
function validateItems() {
	let onePassed = false;

	items.forEach((item) => {
		let passes = true;
		if (!item.classList.contains('hidden')) {
			const name = item.querySelector('.item-name').value.length > 0;
			const qty = item.querySelector('.qty').value > 0;
			const price = item.querySelector('.price').value > 0;

			passes = name && qty && price;

			if (passes) {
				onePassed = true;
			}
		}
	});
	if (!onePassed) {
		error.querySelector('.item-err').classList.remove('hidden');
	} else {
		error.querySelector('.item-err').classList.add('hidden');
	}

	return onePassed;
}
function validateTerms() {
	let valid = possibleTerms.indexOf(parseInt(termsInput.value)) !== -1;

	if (!valid) {
		error.querySelector('.terms-err').classList.remove('hidden');
	} else {
		error.querySelector('.terms-err').classList.add('hidden');
	}

	return valid;
}
function setPaymentTerms() {
	const terms = termsInput.value;
	const term = [...options].filter((option) => option.dataset.value === terms);
	if (term.length) {
		select.querySelector('span').textContent = term[0].textContent;
	}
}
function setCurrentDateAsMinDate() {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; //January is 0!
	let yyyy = today.getFullYear();

	// Set min date to today
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	// concatenate to get yyyy-mm-dd format
	today = yyyy + '-' + mm + '-' + dd;

	// Add to input
	dateInput.setAttribute('min', today);
}

// Function calls needed in page
// Show add button if and only if theres one item on page on page load
toggleAddBtnVisibility();

// Set min date for date input in edit form on page load
dateInput && setCurrentDateAsMinDate();

// Set payment for edit form on page load
termsInput.value !== '0' && setPaymentTerms();
