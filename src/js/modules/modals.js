// import { setTimeout } from 'core-js';
// import tabs from 'tabs';
import {hideTabContent, showTabContent} from './tabs';

function closeWindows() {
	const windows = document.querySelectorAll('[data-modal]');
	windows.forEach(item => {
		item.style.display = 'none';
	});
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.style.display = 'none';
	document.body.style.overflow = '';
	document.body.style.marginRight = '0px'; 
}

function disableBtn(btnSelector) {	
	document.querySelector(btnSelector).setAttribute('disabled', '');
}

function enableBtn(btnSelector) {
	document.querySelector(btnSelector).removeAttribute('disabled', '');
}

const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			scroll = calcScroll();


		function openModal() {
			modal.style.display = 'block';
			document.body.style.overflow = 'hidden'; 
			document.body.style.marginRight = `${scroll}px`; 
		}

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}
				if (item.classList.contains('popup_calc_button')) {

					hideTabContent('.big_img > img', '.balcon_icons_img', 'do_image_more');
					showTabContent('.big_img > img', '.balcon_icons_img', 'do_image_more', 'inline-block');
					disableBtn ('.popup_calc_button');
				}
				if (item.classList.contains('popup_calc_profile_button')) {
					
					const selectItem = document.querySelector('#view_type');
					selectItem.selectedIndex = 0;

					const inputs = document.querySelectorAll('input.checkbox');
					inputs.forEach(input => {
						if (input.checked) {
							input.checked = false;
						}
					});
					disableBtn ('.popup_calc_profile_button');

					
				}
				closeWindows();
				openModal(modalSelector);
			});

		});

		close.addEventListener('click', () => {
			closeWindows();
			closeModal(modalSelector);
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				closeWindows();
				closeModal(modalSelector);
			}
		});
	};

	function showModalByTime(selector, time) {
		setTimeout(function() {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	}

	function calcScroll() {
		let div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);

		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	showModalByTime('.popup', 60000);
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc .popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile .popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end .popup_calc_end_close', false);
};

export default modals;
export {closeWindows, closeModal};
export {disableBtn};
export {enableBtn};