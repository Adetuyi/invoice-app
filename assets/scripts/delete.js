const deleteBtns = document.querySelectorAll('.delete');
const markPaidBtns = document.querySelectorAll('.mark-paid');

deleteBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const id = e.currentTarget.dataset.for;
		const endpoint = `/invoice/${id}`;

		fetch(endpoint, { method: 'DELETE' })
			.then((res) => res.json())
			.then((data) => {
				window.location = data.redirect;
			})
			.catch((err) => console.log(err));
	});
});

markPaidBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		const id = e.currentTarget.dataset.for;
		const endpoint = `/invoice/${id}`;

		fetch(endpoint, {
			method: 'PUT',
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					location.reload();
				} else {
					console.log('handle error');
				}
			})
			.catch((err) => {
				console.log('Err', err);
			});
	});
});
