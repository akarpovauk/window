
function hideTabContent(contentSelector, tabSelector, activeClass) {
	const content = document.querySelectorAll(contentSelector);
	const tab = document.querySelectorAll(tabSelector);
	content.forEach(item => {
		item.style.display = 'none';
	});

	tab.forEach(item => {
		item.classList.remove(activeClass);
	});
}

function showTabContent(contentSelector, tabSelector, activeClass, display, i = 0 ) {
	const content = document.querySelectorAll(contentSelector);
	const tab = document.querySelectorAll(tabSelector);
	content[i].style.display = display;
	tab[i].classList.add(activeClass);
}

const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display) => {
	const header = document.querySelector(headerSelector);
	const tab = document.querySelectorAll(tabSelector);

	// const content = document.querySelectorAll(contentSelector);


	//show tabs by default
	hideTabContent(contentSelector, tabSelector, activeClass);
	showTabContent(contentSelector, tabSelector, activeClass, display);

	header.addEventListener('click', (e) => {
		const target = e.target;
		if (target && (target.classList.contains(tabSelector.replace(/\./, '')) || 
		target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
			tab.forEach((item, i) => {
				if (target == item || target.parentNode == item) {
					hideTabContent(contentSelector, tabSelector, activeClass);
					showTabContent(contentSelector, tabSelector, activeClass, display, i );
				}
			});
		}
	});

};

export {hideTabContent, showTabContent};
export default tabs;
