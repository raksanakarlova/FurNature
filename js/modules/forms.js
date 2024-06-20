import { postData } from "../services/services";

function modalForm(buttonSlctr, formSlctr, buttonClosed) {
	// Modal Form:
	const btnConsulting = document.querySelector(buttonSlctr);
	const modal = document.querySelector(formSlctr);
	const overlay = document.querySelector('.overlay');
	const btnClosedForm = document.querySelector(buttonClosed);

	const forms = document.querySelectorAll('form');

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

	// Реализация отправки формы с данными на сервер:
	const message = {
		loading: 'img/icons/spinner.svg',
		succsess: 'Спасибо!',
		succsess2: 'Скоро мы с вами свяжемся',
		failure: 'Упс!',
		failure2: 'Что-то пошло не так...'
	};

	forms.forEach(el => {
		bindPostData(el);
	});

	function bindPostData(form) {
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
	
			const json = JSON.stringify(Object.fromEntries(formData.entries()))

			postData('http://localhost:3000/requests', json)
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

	// Оповещение пользователя:
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
		}, 1000)
	};
};

export {modalForm};