window.addEventListener('DOMContentLoaded', () => {
	const titleTabs = document.querySelectorAll('.title-product');
	const widgets = document.querySelectorAll('.widget');
	const contentTabs = document.querySelectorAll('.product-info-container');
	const parentTabs = document.querySelector('.product-title-content');

	const btnConsulting = document.querySelector('.btn-consulting');
	const modal = document.querySelector('.modal');
	const overlay = document.querySelector('.overlay');
	const btnClosedForm = document.querySelector('.btn-closed');

	const forms = document.querySelectorAll('form');

	// Tabs
	function hideTabContent () {
		titleTabs.forEach(el => {
			el.classList.remove('active');
		});

		contentTabs.forEach((el) => {
			el.classList.add('hide-content');
			el.classList.remove('show-content');
		});

		widgets.forEach(el => {
			el.style.visibility = 'hidden';
		});
	};

	function showTabContent (i = 0) {
		titleTabs[i].classList.add('active');
		contentTabs[i].classList.add('show-content');
		contentTabs[i].classList.remove('hide-content');
		widgets[i].style.visibility = 'visible';
	}

	hideTabContent();
	showTabContent(); 

	parentTabs.addEventListener('click', (event) => {
		event.preventDefault();
		const target = event.target;

		if(target && target.classList.contains('title-product')) {
			titleTabs.forEach((el, index) => {
				if(target == el) {
					hideTabContent();
					showTabContent(index);
				};
			});
		}
	});

	// Change colors, names and products
	contentTabs.forEach(tab => {
		const colors = tab.querySelectorAll('.color');
		const selects = tab.querySelectorAll('.select');
		const colorNames = tab.querySelectorAll('.name-color');
		const images = tab.querySelectorAll('.picture');

		colors.forEach((color, i) => {
			color.addEventListener('click', () => {
				selects.forEach(select => select.classList.add('hide-select'));
				selects[i].classList.remove('hide-select');

				colorNames.forEach(name => name.classList.add('hide-color'));
				colorNames[i].classList.remove('hide-color');

				images.forEach(image => image.classList.add('hide-picture'));
				images[i].classList.remove('hide-picture');
			});
		});
	});

	// Modal Form
	function openModal() {
		modal.classList.remove('inactive');
		modal.classList.add('active');

		overlay.classList.remove('inactive');
		overlay.classList.add('active');
	};

	function closeModal() {
		modal.classList.remove('active');
		modal.classList.add('inactive');

		overlay.classList.remove('active');
		overlay.classList.add('inactive');
	};

	btnConsulting.addEventListener('click', openModal)

	btnClosedForm.addEventListener('click', closeModal);

	// Form XMLHttpRequest()
	const message = {
		loading: 'img/icons/spinner.svg',
		succsess: 'Спасибо!',
		succsess2: 'Скоро мы с вами свяжемся',
		failure: 'Упс!',
		failure2: 'Что-то пошло не так...'
	};

	forms.forEach(el => {
		postData(el);
	});

	function postData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			` 
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);
	
			const object = {};
			formData.forEach(function(value, key){
				object[key] = value;
			});

			fetch('server.php', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(object)
			})
			.then(data => data.text())
			.then(data => {
				console.log(data);
				showThanksModal(message.succsess, message.succsess2);
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure, message.failure2);
			}).finally(() => {
				form.reset();
			});
		});
	};

	function showThanksModal(message, msg) {
		const prevModalDialog = document.querySelector('.form-container');
		prevModalDialog.classList.add('inactive');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('form-container');
		thanksModal.innerHTML = `
			<div class="form-content">
				<div class="header-content">
					<div class="modal-title">${message} <br>
						<span class="secondary-title-modal">${msg}</span>
					</div>

					<button class="btn-closed">
						<img src="./img/icons/plus-add.3 1.svg" alt="close">
					</button>
				</div>
			</div>
		`
		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('active');
			prevModalDialog.classList.remove('inactive');
			closeModal();
		}, 2000)
	};
});


