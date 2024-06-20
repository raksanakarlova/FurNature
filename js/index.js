import {modalForm} from './modules/forms';
import {advCards} from './modules/advCards';
import {productCards} from './modules/productCards';
import {tabs} from './modules/tabs';

window.addEventListener('DOMContentLoaded', () => {
	advCards();
	productCards();
	tabs('.title-product', '.widget', '.card-container', '.product-title-content');
	modalForm('.btn-consulting', '.modal', '.btn-closed');
});
