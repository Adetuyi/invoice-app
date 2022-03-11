const filter = document.querySelector('#filter');
const list = document.querySelector('#list');

filter.addEventListener('click', (e) => {
	list.classList.toggle('active');

	e.currentTarget.classList.toggle('active');
});
