import './slider';
import modals from './modules/modals';
import { disableBtn } from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms'; 
import changeModalState from './modules/changeModalState';
import timer from './modules/timer';
import images from './modules/images';


window.addEventListener('DOMContentLoaded', () => {
	'use strict';
	let modalState = {
		form: 0,
		type: 'tree'
	};
	let deadline = '2024-03-01';
	changeModalState(modalState);

	modals();
	disableBtn ('.popup_calc_button');
	disableBtn ('.popup_calc_profile_button');

	tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active', 'block');
	tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click', 'block');
	tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
	forms(modalState);
	timer('.timer1', deadline);
	images();
});

console.log(1);