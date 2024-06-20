import {tabs} from './tabs';

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

				tabs('.title-product', '.widget', '.card-container', '.product-title-content'); // устанавливаю обработчик после создания карточек
			});

};

export {productCards};