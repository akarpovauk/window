/* eslint-disable indent */
import checkNumInputs from './checkNumInputs';
import { enableBtn } from './modals';

const changeModalState = (state) => {
	const windowForm = document.querySelectorAll('.balcon_icons_img'),
		windowWidth = document.querySelectorAll('#width'),
		windowHeight = document.querySelectorAll('#height'),
		windowType = document.querySelectorAll('#view_type'),
		windowProfile = document.querySelectorAll('.checkbox');

	checkNumInputs('#width');
	checkNumInputs('#height');

	function formValidate(formSelector, btnSelector) {
		const form = document.querySelector(formSelector);
		const inputs = form.querySelectorAll('input');
	
		inputs.forEach(input => {
			input.addEventListener('change', () => {
				if(state.width && state.height) {
					enableBtn(btnSelector);
				}
			});
		});
	}

	formValidate ('.popup_calc', '.popup_calc_button');
	formValidate('.popup_calc_profile', '.popup_calc_profile_button');

	function bindActionToElems(event, elem, prop) {
		elem.forEach((item, i) => {
			item.addEventListener(event, () => {
				switch(item.nodeName) {
					case 'SPAN': 
						state[prop] = i;
						break;
					case 'INPUT':
						if (item.getAttribute('type') === 'checkbox') {
							i === 0? state[prop] = 'Холодное': state[prop] = 'Теплое';
							elem.forEach((box, j) => {
								box.checked = false;
								if (i == j) {
									box.checked = true;
								}
							});
						} else {
							state[prop] = item.value;
						}
						break;
					case 'SELECT':
						state[prop] = item.value;
						break;
				}
				// console.log(state);
			});
		});
	}
	bindActionToElems('click', windowForm, 'form');
	bindActionToElems('input', windowWidth, 'width');
	bindActionToElems('input', windowHeight, 'height');
	bindActionToElems('change', windowType, 'type');
	bindActionToElems('change', windowProfile, 'profile');
};

export default changeModalState;
