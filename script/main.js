window.addEventListener('DOMContentLoaded', () => {
	const btnConsulting = document.querySelector('.btn-consulting');
	const modal = document.querySelector('.modal');
	const overlay = document.querySelector('.overlay');
	const btnClosedForm = document.querySelector('.btn-closed');

	const forms = document.querySelectorAll('form');

	// Создание карточек с преимуществами с помощью классов:
	class AdvantagesCard {
		constructor(src, alt, title, descSelector, description, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descSelector = descSelector;
			this.description = description;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
		}

		render() {
			const element = document.createElement('div');

			if(this.classes.length === 0) {
				this.element = 'advantages-card';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className))
			}

			element.innerHTML = `
					<div class="advantages-content">
						<div class="advantages-icon">
							<img src=${this.src} alt=${this.alt}>
						</div>

						<h3>${this.title}</h3>
						<p class=${this.descSelector}>${this.description}</p>
					</div>
			`;

			this.parent.append(element);
		};
	};

	new AdvantagesCard(
		'img/icons/adv1.svg',
		'icon',
		'Удобство и функциональность',
		'adv-describe1',
		'Наши современные стулья обеспечивают удобство и комфорт, оптимизируют пространство и помогают организовать содержимое дома',
		'.advantages-container'
	).render();

	new AdvantagesCard(
		'img/icons/adv2.svg',
		'icon',
		'Условия доставки и сервис',
		'adv-describe2',
		'Вы получаете превосходный сервис, гибкую доставку и правильную осанку',
		'.advantages-container'
	).render();

		new AdvantagesCard(
		'img/icons/adv3.svg',
		'icon',
		'Эстетика и дизайн',
		'adv-describe3',
		'Дизайн стульев сочетает в себе стиль и практичность. Модные линии, выбор материалов соответствуют последним тендециям, придавая стульям шик и изысканность',
		'.advantages-container'
	).render();

	// Создание карточек товара с помощью классов:
	class ProductCard {
		constructor(
			src, src2, src3, src4, alt, 
			description, price, 
			text, text2, text3, text4,
			clrSelec, clrSelec2, clrSelec3, clrSelec4, 
			parentSelector, ...classes
		) {
			this.src = src;
			this.src2 = src2;
			this.src3 = src3;
			this.src4 = src4;
			this.alt = alt;
			this.description = description;
			this.price = price;
			this.text = text;
			this.text2 = text2;
			this.text3 = text3;
			this.text4 = text4;
			this.clrSelec = clrSelec;
			this.clrSelec2 = clrSelec2;
			this.clrSelec3 = clrSelec3;
			this.clrSelec4 = clrSelec4;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
		}

		render() {
			const element = document.createElement('div');
			if(this.classes.length === 0) {
				this.element = 'card-container';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			};

			element.innerHTML = `
					<div class="product-info-content">
						<p class="descr">${this.description}</p>
						<p class="price">${this.price}</p>
						<div class="dec-line"></div>
						<div class="colors">
							<p class="title-color">
								Цвет: <span class="name-color">${this.text}</span>
											<span class="name-color hide-color">${this.text2}</span>
											<span class="name-color hide-color">${this.text3}</span>
											<span class="name-color hide-color">${this.text4}</span>
							</p>
							<div class="select-content">
								<div class="select">
									<div class="color ${this.clrSelec}"></div>
								</div>
								<div class="select hide-select">
									<div class="color ${this.clrSelec2}"></div>
								</div>
								<div class="select hide-select">
									<div class="color ${this.clrSelec3}"></div>
								</div>
								<div class="select hide-select">
									<div class="color ${this.clrSelec4}"></div>
								</div>
							</div>
						</div>
							<button class="btn-add">Добавить в корзину</button>
					</div>
						<div>
							<img class="picture" src=${this.src} alt=${this.alt}>
							<img class="picture hide-picture" src=${this.src2} alt=${this.alt}>
							<img class="picture hide-picture" src=${this.src3} alt=${this.alt}>
							<img class="picture hide-picture" src=${this.src4} alt=${this.alt}>
						</div>
			`;
			this.parent.append(element);
		};
	};

	new ProductCard(
		'img/firstCard/main.png',
		'img/firstCard/pink.png',
		'img/firstCard/purple.png',
		'img/firstCard/sea.png',
		'product',
		'Удобный стул с элегантным дизайном, идеальный для отдыха и работы',
		'1.399 RUB',
		'Голубой',
		'Розовый',
		'Фиолетовый',
		'Зелёный',
		'blue',
		'pink',
		'purple',
		'green',
		'.product-info-container'
	).render();

	new ProductCard(
		'img/secondCard/main.png',
		'img/secondCard/brown.png',
		'img/secondCard/blue.png',
		'img/secondCard/olive.png',
		'product',
		'Эргономичный стул с современным стилем, обеспечивает комфорт и поддержку при сидении',
		'2.399 RUB',
		'Зелёный',
		'Коричневый',
		'Синий',
		'Оливковый',
		'green2',
		'brown',
		'sea',
		'olive',
		'.product-info-container'
	).render();

	new ProductCard(
		'img/thirdCard/main.png',
		'img/thirdCard/grey.png',
		'img/thirdCard/purple.png',
		'img/thirdCard/orange.png',
		'product',
		'Стильный табурет для комфортного сидения в любом интерьере',
		'1.199 RUB',
		'Красный',
		'Серый',
		'Фуксия',
		'Оранжевый',
		'red',
		'grey',
		'fuchsia',
		'light-brown',
		'.product-info-container'
	).render();

	new ProductCard(
		'img/fourthCard/main.png',
		'img/fourthCard/red.png',
		'img/fourthCard/pink.png',
		'img/fourthCard/green.png',
		'product',
		'Этот стул — ваш верный спутник  в мире сидения',
		'3.199 RUB',
		'Чёрный',
		'Оранжевый',
		'Розовый',
		'Салатовый',
		'black',
		'orange',
		'pink2',
		'light-green',
		'.product-info-container'
	).render();

	// Реализация работы табов:
	const titleTabs = document.querySelectorAll('.title-product');
	const widgets = document.querySelectorAll('.widget');
	const contentTabs = document.querySelectorAll('.card-container');
	const parentTabs = document.querySelector('.product-title-content');
	
	function hideTabContent () {
		titleTabs.forEach(el => {
			el.classList.remove('active');
		});

		contentTabs.forEach((el) => {
			el.style.display = 'none'
		});

		widgets.forEach(el => {
			el.style.visibility = 'hidden';
		});
	};

	function showTabContent (i = 0) {
		titleTabs[i].classList.add('active');
		widgets[i].style.visibility = 'visible';
		contentTabs[i].style.display = 'flex';
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

	// Реализация изменения цвета, названия и изображения продукта:
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

	// Реализация работы с сервером:
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
