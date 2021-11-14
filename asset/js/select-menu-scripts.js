/*https://www.w3schools.com/howto/howto_js_filter_dropdown.asp
When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}


////V3
//
//
//'use strict';
//const arrowItem = document.querySelector('.Select-trigger')
//const bindList = list => {
//  list.addEventListener('keydown', onKeydown);
//  list.addEventListener('click', onSelect);
//  list.addEventListener('blur', onBlur);
//  document.documentElement.setAttribute('tabindex', '-1');
//  document.addEventListener('focus', onFocus, true);
//};
//
//const unbindList = list => {
//  list.removeEventListener('keydown', onKeydown);
//  list.removeEventListener('click', onSelect);
//  list.removeEventListener('blur', onBlur);
//  document.documentElement.removeAttribute('tabindex');
//  document.removeEventListener('focus', onFocus, true);
//};
//
//const hideList = list => {
//  const trigger = list.previousElementSibling;
//  unbindList(list);
//  trigger.setAttribute('aria-expanded', 'false');
//  document.body.classList.remove('Select-isVisible');
//  trigger.classList.remove("arrowanim")
//  setTimeout(() => {
//	trigger.focus();
//  }, 100);
//};
//
//const showList = list => {
//  const trigger = list.previousElementSibling;
//
//  trigger.setAttribute('aria-expanded', 'true');
//  list.focus();
//  document.body.classList.add('Select-isVisible');
//  trigger.classList.add("arrowanim");
//  bindList(list);
//};
//
//const updateSelected = (item, isSelected) => {
//  item.setAttribute('aria-label', `${item.textContent}${(isSelected) ? ", selected" : ""}`);
//  item.setAttribute('aria-selected', isSelected);
//};
//
//const updateTrigger = (trigger, content, label) => {
//  trigger.textContent = content;
//  trigger.setAttribute('aria-label', (label) ? label : content);
//};
//
//const findMatch = (needle, haystack) => haystack.textContent.toLowerCase().startsWith(needle.toLowerCase());
//
//const generateID = () => `_${Math.random().toString(36).substr(2, 9)}`;
//
//const onSelect = event => {
//  const target = event.target;
//  const list = target.parentElement;
//  const isMultiple = list.getAttribute('aria-multiselectable') === 'true';
//  const trigger = list.previousElementSibling;
//  const current = list.querySelector('[aria-selected="true"]');
//  const native = list.nextElementSibling;
//  const items = Array.from(list.querySelectorAll('[role="option"]'));
//
//applySorting(target.textContent)
//  
//if (!isMultiple && current !== target) {
//	if (current) {
//	  updateSelected(current, false);
//	}
//
//	updateSelected(target, true);
//	updateTrigger(trigger, target.textContent, `${target.textContent}, ${trigger.previousElementSibling.textContent}`);
//
//	// Keep native select in sync
//	native.selectedIndex = items.indexOf(target) + 1;
//  }
//
//  if (isMultiple) {
//
//	updateSelected(target, target.getAttribute('aria-selected') !== 'true');
//
//	/* Update trigger label */
//
//	// Build the trigger label from selected items
//	const selected =
//	  Array
//		.from(list.querySelectorAll('[aria-selected="true"]'))
//		.map(item => item.textContent)
//		.join(', ');
//
//	if (selected.length) {
//	  updateTrigger(trigger, selected, `${selected}, ${trigger.previousElementSibling.textContent}`);
//	} else {
//	  updateTrigger(trigger, trigger.getAttribute('data-placeholder'));
//	}
//
//	// Keep native select in sync
//	native[items.indexOf(target) + 1].selected = (current !== target);
//  }
//
//  if (!isMultiple) {
//	hideList(list);
//  }
//};
//
///* Focus handler on body, to hide listbox. Mostly for iOS */
//const onFocus = event => {
//  const list = document.querySelector('[role="combobox"][aria-expanded="true"]').nextElementSibling;
//
//  if (!list.parentElement.contains(event.target)) {
//	hideList(list);
//  }
//};
//
///* Blur handler on list, to hide listbox */
//const onBlur = function onBlur(event) {
//
//  const list = this;
//
//  if (!list.contains(event.relatedTarget)) {
//	hideList(list);
//  }
//};
//
///* Keydown handler for events on the list */
//const onKeydown = function onKeydown(event) {
//  const target = event.target;
//  const key = event.key.replace('Arrow', '');
//  const list = this;
//  const options = Array.from(list.querySelectorAll('[role="option"]'));
//  let index = options.indexOf(target);
//
//  switch (key) {
//	case 'Up':
//	  event.preventDefault();
//	  if (index > 0) {
//		options[index -= 1].focus();
//	  }
//	  break;
//	case 'Down':
//	  event.preventDefault();
//	  if (index !== options.length - 1) {
//		options[index += 1].focus();
//	  }
//	  break;
//	case ' ':
//	case 'Spacebar':
//
//	  /* Selection made */
//	  if (!target.hasAttribute('aria-disabled')) {
//		event.preventDefault();
//		onSelect(event);
//	  }
//	  break;
//	case 'Home':
//	  event.preventDefault();
//	  options[0].focus();
//	  break;
//	case 'End':
//	  event.preventDefault();
//	  options[options.length - 1].focus();
//	  break;
//	case 'Esc':
//	case 'Escape':
//	case 'Tab':
//
//	  /* Hide list */
//	  event.preventDefault();
//	  hideList(list);
//	  break;
//	default:
//
//	  /* Type ahead */
//
//	  // Do any of the items start with the character? Easy out
//	  if (options.some(option => findMatch(key, option))) {
//		// Find out if an item is already focused
//		let focused = options.indexOf(document.activeElement);
//		let next;
//
//		 // Nothing focused, start from the top
//		if (focused === -1) {
//		  next = options.findIndex(option => findMatch(key, option));
//		} else {
//		  const start = focused += 1;
//		  const items = [].concat(options.slice(start), options.slice(0, start));
//
//		  next = options.indexOf(items.find(item => findMatch(key, item)));
//		}
//
//		// Found something
//		if (next !== -1) {
//		  options[next].focus();
//		}
//	  }
//	  break;
//  }
//};
//
///* Event handler for combobox trigger */
//const onTrigger = event => {
//  const target = event.target;
//
//  if ((event.type === 'keydown' && event.key.match(/Up|Down|Spacebar|\s/u)) || event.type === 'click') {
//	const isExpanded = target.getAttribute('aria-expanded') === 'true';
//	const list = target.nextElementSibling;
//
//	event.preventDefault();
//
//	if (isExpanded) {
//	  hideList(list);
//	} else {
//	  showList(list);
//	}
//  }
//};
//
///* The big setup */
//function manageSelectMenu(){
//Array.from(document.querySelectorAll('.Select')).forEach(select => {
//  const labelElem = select.querySelector('label');
//  const label = labelElem.textContent;
//  const nativeWrapper = select.querySelector('.Select-trigger');
//  const nativeSelect = nativeWrapper.querySelector('select');
//  const selectID = nativeSelect.id;
//  const isRequired = nativeSelect.hasAttribute('required');
//  const isMultiple = nativeSelect.hasAttribute('multiple');
//  const nativeChildren = Array.from(nativeSelect.children);
//  const nativeClone = nativeSelect.cloneNode(true);
//  const placeholder = nativeChildren[0].textContent;
//
//  // Don't want the placeholder option to display in our list
//  nativeChildren.shift();
//  let options = '';
//
//  /* Build the options */
//  nativeChildren.forEach(child => {
//	if (child.nodeName === 'OPTION') {
//	  // Most common type
//	  options += `<li tabindex="-1" role="option" aria-selected="${child.selected}">${child.textContent}</li>`;
//	} else if (child.nodeName === 'OPTGROUP') {
//
//	  /* Grouped options come as an Array, need to treat differently */
//
//	  // Generate a random ID real quick */
//	  const groupID = generateID();
//
//	  /* Build the group heading from the optgroup label */
//	  options += `<li id="${groupID}" role="presentation" aria-hidden="true">${child.label}</li>`;
//
//	  options +=
//		Array
//		  .from(child.children)
//		  .map(item => `<li tabindex="-1" role="option" aria-describedby="${groupID}" aria-selected="${item.selected}">${item.textContent}</li>`)
//		  .join('');
//	}
//  });
//
//  /* Put the widget together */
//  const wrapper = document.createElement('div');
//
//  wrapper.classList.add('Select');
//  wrapper.insertAdjacentHTML(
//	'afterBegin',
//	`<span class="Select-label" id="${selectID}-label">${label}</span>
//	 <span id="${selectID}-trigger" class="Select-trigger" tabindex="0" role="combobox" aria-autocomplete="none" aria-expanded="false" aria-label="${placeholder}, ${label}" aria-owns="${selectID}-list" aria-required="${isRequired}" data-placeholder="${placeholder}">${placeholder}</span>
//	 <ul id="${selectID}-list" role="listbox" aria-label="${label} options${isMultiple ? ", multiple selections available" : ""}" aria-multiselectable="${isMultiple}" tabindex="-1">${options}</ul>`
//	 );
//
//  // Native select clone should be hidden from all user interaction
//  nativeClone.classList.add('visually-hidden');
//  nativeClone.setAttribute('aria-hidden', 'true');
//  nativeClone.setAttribute('tabindex', '-1');
//
//  wrapper.appendChild(nativeClone);
//
//  // Add the custom widget
//  select.parentElement.insertBefore(wrapper, select);
//
//  // Remove the native select
//  select.parentElement.removeChild(select);
//
//  // Set up main handlers
//  const trigger = wrapper.querySelector('[role="combobox"]');
//
//  trigger.addEventListener('click', onTrigger);
//
//  // Since this is not native interactive element, we have to listen to keydown in addition to click
//  trigger.addEventListener('keydown', onTrigger);
//
//});
//}