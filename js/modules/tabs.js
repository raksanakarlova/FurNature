function tabs(tabSlctr, tabWdgt, tabCntnt, tabPrnt) {
	  // Реализация работы табов:
	const titles = document.querySelectorAll(tabSlctr);
	const widgets = document.querySelectorAll(tabWdgt);
	const contents = document.querySelectorAll(tabCntnt); // обновляю селектор для новых элементов
	const parentTab = document.querySelector(tabPrnt);

	function hideTabContent() {
		titles.forEach(el => el.classList.remove('active'));
		widgets.forEach(el => el.style.visibility = 'hidden');
			
		contents.forEach(el => {
			el.classList.add('hide-content');
			el.classList.remove('show-content');
		});
	};

	function showTabContent(i = 0) {
		if(titles[i] && widgets[i] && contents[i]) {
			titles[i].classList.add('active');
			widgets[i].style.visibility = 'visible';

			contents[i].classList.add('show-content');
			contents[i].classList.remove('hide-content');
		};
	};

	hideTabContent();
	showTabContent();

	parentTab.addEventListener('click', (event) => {
		event.preventDefault();
		const target = event.target;

		if(target && target.classList.contains(tabSlctr.slice(1))) {
			titles.forEach((el, index) => {
				if(target == el) {
					hideTabContent();
					showTabContent(index);
				};
			});
		};
	});

	// Реализация изменений цвета, названий и изображений продукта:
	function colorChanges(colorSlctr, selectSlctr, nameColors, images) {
		contents.forEach(element => {
			const colors = element.querySelectorAll(colorSlctr);
			const selects = element.querySelectorAll(selectSlctr);
			const colorNames = element.querySelectorAll(nameColors);
			const imgs = element.querySelectorAll(images);

			colors.forEach((color, index) => {
				color.addEventListener('click', () => {
					selects.forEach(select => select.classList.add('hide-select'));
					selects[index].classList.remove('hide-select');

					colorNames.forEach(name => name.classList.add('hide-color'));
					colorNames[index].classList.remove('hide-color');

					imgs.forEach(img => img.classList.add('hide-picture'));
					imgs[index].classList.remove('hide-picture');
				});
			});
		});
	};

	colorChanges('.color', '.select', '.name-color', '.picture')

};

export {tabs};