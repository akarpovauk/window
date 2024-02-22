import checkNumInputs from './checkNumInputs';
import {closeWindows, closeModal} from './modals';

const forms = (state) => {
	const allForms = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input');

	checkNumInputs('input[name = "user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо, скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: 'POST',
			body: data
		});

		return await res.text();
	};

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};

	allForms.forEach(form => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			form.appendChild(statusMessage);

			let parentElement = `.${form.closest('[data-modal]').classList.value}`;

			const formData = new FormData(form);

			if (form.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then(res => {
					console.log(`my res is ${res}`);
					statusMessage.textContent = message.success;
				})
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						closeWindows();
						closeModal(parentElement);

						console.log(state);
						for (let key in state) {
							if(key == 'form') {
								state[key] = 0;
							} else if(key == 'type') {
								state[key] = 'tree';
							} else {
								delete state[key];
							}
						}
						console.log(state);
					}, 3000);
				});
		});
	});
};

export default forms;