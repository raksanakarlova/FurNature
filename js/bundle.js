/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/advCards.js":
/*!********************************!*\
  !*** ./js/modules/advCards.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   advCards: () => (/* binding */ advCards)
/* harmony export */ });
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



/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modalForm: () => (/* binding */ modalForm)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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

			;(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
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



/***/ }),

/***/ "./js/modules/productCards.js":
/*!************************************!*\
  !*** ./js/modules/productCards.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   productCards: () => (/* binding */ productCards)
/* harmony export */ });
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs */ "./js/modules/tabs.js");


function productCards() {
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
	
	// Axios
	axios.get('http://localhost:3000/cards')
		.then(data => {
				data.data.forEach(({
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

				(0,_tabs__WEBPACK_IMPORTED_MODULE_0__.tabs)('.title-product', '.widget', '.card-container', '.product-title-content'); // устанавливаю обработчик после создания карточек
			});

};



/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tabs: () => (/* binding */ tabs)
/* harmony export */ });
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



/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
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


	

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_advCards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/advCards */ "./js/modules/advCards.js");
/* harmony import */ var _modules_productCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/productCards */ "./js/modules/productCards.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");





window.addEventListener('DOMContentLoaded', () => {
	(0,_modules_advCards__WEBPACK_IMPORTED_MODULE_1__.advCards)();
	(0,_modules_productCards__WEBPACK_IMPORTED_MODULE_2__.productCards)();
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.tabs)('.title-product', '.widget', '.card-container', '.product-title-content');
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_0__.modalForm)('.btn-consulting', '.modal', '.btn-closed');
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map