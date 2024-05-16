window.addEventListener('DOMContentLoaded', () => {
	// Создание карточек-преимуществ с помощью классов:
	class AdvantagesCard {
		constructor(src, alt, title, descSelector, description, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descSelector = descSelector;
			this.description = description;
			this.parentSelector = parentSelector;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
		};

		render() {
			const elem = document.createElement('div');

			if(this.classes.length === 0) {
				this.elem = 'advantages-card';
				elem.classList.add(this.elem);
			} else {
				this.classes.forEach(className => elem.classList.add(className));
			};

			elem.innerHTML = `
					<div class="advantages-content">
						<div class="advantages-icon">
							<img src=${this.src} alt=${this.alt}>
						</div>

						<h3>${this.title}</h3>
						<p class=${this.descSelector}>${this.description}</p>
					</div>
			`;

			this.parent.append(elem);
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

	// Реализация работы классов:
	class ProductCard {
		constructor(
			mainimg, scndimg, thrdimg, frthimg,
			altimg, desc, price, 
			maintxt, scndtxt, thrdtxt, frthtxt,
			mainslctr, scndslctr, thrdslctr, frthslctr,
			parentSelector, ...classes
		) {
			this.mainimg = mainimg;
			this.scndimg = scndimg;
			this.thrdimg = thrdimg;
			this.frthimg = frthimg;

			this.altimg = altimg;
			this.desc = desc;
			this.price = price;

			this.maintxt = maintxt;
			this.scndtxt = scndtxt;
			this.thrdtxt = thrdtxt;
			this.frthtxt = frthtxt;

			this.mainslctr = mainslctr;
			this.scndslctr = scndslctr;
			this.thrdslctr = thrdslctr;
			this.frthslctr = frthslctr;

			this.parentSelector = parentSelector;
			this.parent = document.querySelector(parentSelector);

			this.classes = classes;
		};

		render() {
			const elem = document.createElement('div');

			if(this.classes.length === 0) {
				this.elem = 'card-container';
				elem.classList.add(this.elem);
			} else {
				this.classes.forEach(className => elem.classList.add(className));
			}

			elem.innerHTML = `
				<div class="product-info-content">
                    
					<p class="descr">${this.desc}</p>
          <p class="price">${this.price}</p>
          <div class="dec-line"></div>
          <div class="colors">
            <p class="title-color">
              Цвет: <span class="name-color">${this.maintxt}</span>
                    <span class="name-color hide-color">${this.scndtxt}</span>
                    <span class="name-color hide-color">${this.thrdtxt}</span>
                    <span class="name-color hide-color">${this.frthtxt}</span>
          	</p>
            <div class="select-content">
              <div class="select">
                <div class="color ${this.mainslctr}"></div>
              </div>
              <div class="select hide-select">
                <div class="color ${this.scndslctr}"></div>
              </div>
              <div class="select hide-select">
                <div class="color ${this.thrdslctr}"></div>
              </div>
              <div class="select hide-select">
                <div class="color ${this.frthslctr}"></div>
              </div>
          	</div>
        	</div>
            <button class="btn-add">Добавить в корзину</button>
        </div>
        <div>
          <img class="picture" src=${this.mainimg} alt=${this.altimg}>
          <img class="picture hide-picture" src=${this.scndimg} alt=${this.altimg}>
          <img class="picture hide-picture" src=${this.thrdimg} alt=${this.altimg}>
          <img class="picture hide-picture" src=${this.frthimg} alt=${this.altimg}>

        </div>
			`;
			this.parent.append(elem);
		};
	};

	const getResource = async (url) => {
		const result = await fetch(url);

		if(!result.ok) {
			throw new Error(`Couldn't fetch ${url}, status: ${result.status}`);
		};

		return result.json();
	};

	getResource('http://localhost:3000/cards')
		.then(data => {
			data.forEach(({
				mainimg, scndimg, thrdimg, frthimg,
				altimg, desc, price,
				maintxt, scndtxt, thrdtxt, frthtxt,
				mainslctr, scndslctr, thrdslctr, frthslctr
			}) => {
				new ProductCard(
					mainimg, scndimg, thrdimg, frthimg,
					altimg, desc, price,
					maintxt, scndtxt, thrdtxt, frthtxt,
					mainslctr, scndslctr, thrdslctr, frthslctr,
					'.product-info-container'
				).render();
			});

			setupTabs(); // устанавливаю обработчик после создания карточек
		});

	function setupTabs() {
		// Реализация работы табов:
		const titles = document.querySelectorAll('.title-product');
		const widgets = document.querySelectorAll('.widget');
		const contents = document.querySelectorAll('.card-container') // обновляю селектор для новых элементов
		const parentTab = document.querySelector('.product-title-content');

		function hideTabContent() {
			titles.forEach(el => el.classList.remove('active'));
			widgets.forEach(el => el.style.visibility = 'hidden');
			
			contents.forEach(el => {
				el.classList.add('hide-content');
				el.classList.remove('show-content');
			});
		};

		function showTabContent(i = 0) {
			titles[i].classList.add('active');
			widgets[i].style.visibility = 'visible';

			contents[i].classList.add('show-content');
			contents[i].classList.remove('hide-content');
		};

		hideTabContent();
		showTabContent();

		parentTab.addEventListener('click', (event) => {
			event.preventDefault();
			const target = event.target;

			if(target && target.classList.contains('title-product')) {
				titles.forEach((el, index) => {
					if(target == el) {
						hideTabContent();
						showTabContent(index);
					};
				});
				};
		});

		// Реализация изменений цвета, названий и изображений продукта:
		contents.forEach(element => {
			const colors = element.querySelectorAll('.color');
			const selects = element.querySelectorAll('.select');
			const colorNames = element.querySelectorAll('.name-color');
			const imgs = element.querySelectorAll('.picture');

			colors.forEach((color, index) => {
				color.addEventListener('click', () => {
					selects.forEach(select => select.classList.add('hide-select'));
					selects[index].classList.remove('hide-select');

					colorNames.forEach(name => name.classList.add('hide-color'))
					colorNames[index].classList.remove('hide-color');

					imgs.forEach(img => img.classList.add('hide-picture'));
					imgs[index].classList.remove('hide-picture');
				});
			});
		});
	};

	// Modal Form:
	const btnConsulting = document.querySelector('.btn-consulting');
	const modal = document.querySelector('.modal');
	const overlay = document.querySelector('.overlay');
	const btnClosedForm = document.querySelector('.btn-closed');

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

	const postData = async (url, data) => {
		const result = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await result.json();
	};

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
});
