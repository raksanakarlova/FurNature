function advCards() {
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
};

export {advCards};