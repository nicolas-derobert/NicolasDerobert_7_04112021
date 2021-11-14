const medias = document.getElementById("all-media");

function mediaTemplate(mediaData) {
	urlOfImagesPagesToapply = urlOfImages
		.concat(currentPhotographer.name.split(" ")[0])
		.replace("-", " ");
	if (mediaData.image) {
		return `<article class="">
					<div class="media-container">
						<a href="${urlOfImagesPagesToapply + "/" + mediaData.image}" id="${mediaData.id}">
							<img src="${urlOfImagesPagesToapply + "/" + mediaData.image}" alt="${mediaData.title}"/>
						</a>
					</div>
					<div class="description-and-like">
						<h2>${mediaData.title}</h2>
						<div class="like-area">
							<div class="media-like-counter" >${mediaData.likes}</div>
							<div class="heart" id="${mediaData.id}" tabindex="0" role="button" aria-label="Mettez un like pour ${mediaData.title}"> 
								<i class="fa fa-heart"></i>
							</div>	
						</div>		
					</div>
				</article>`;
	}
	if (mediaData.video) {
		return `		 
		<article class="">
			<div class="media-container">
				<a href="${urlOfImagesPagesToapply + "/" + mediaData.video}"id="${mediaData.id}">
				<video controls poster="${urlOfImagesPagesToapply + "/" + mediaData.video.split(".")[0]}.png"  aria-label="${mediaData.title}">
					<source src="${urlOfImagesPagesToapply + "/" + mediaData.video}" type="video/${mediaData.video.split(".")[1]}">
				</video></a>
			</div>
			<div class="description-and-like">
				<h2>${mediaData.title}</h2>
				<div class="like-area">
					<div class="media-like-counter" >${mediaData.likes}</div>
					<div class="heart" id="${mediaData.id}" tabindex="0" role="button" aria-label="Mettez un like pour  ${mediaData.title}">
						 <i class="fa fa-heart"></i>
					</div>	
				</div>		
			</div>
		</article>
		 `;
	}
}

function applyHeaderTemplate() {
	return `
	<div class="header-container">
	<div class="logo">
		<a href="../index.html"
			><img src="../asset/img/logo/fisheye.png" alt="Fisheye home Page"
		/></a>
	</div>
	</div>`;
}
function applyPhotographeTemplate(photographe) {
	return `
	<div>
		<h1 id="name">${photographe.name}</h1>
		<p id="location">${photographe.city + " " + photographe.country}</p>
		<p id="tagline">${photographe.tagline}</p>
		<div id="tags">${tagsTemplate(photographe.tags)}
		</div>
	</div>
	<div id="button-area">
		<button id="contactez-moi">Contactez-moi</button>
	</div>
	<div id="image-area">
		<div class="image-container">
			<img src="${urlOfImagesPagesOfPhotographers + "/" + photographe.portrait}" alt="${photographe.name}" id="photograph-vignet" />
		</div>
	</div>`;
}
function applyFilterTemplate() {
	return `
	<label class="Select-label" for="sort">Trier par</label>
	<div class="Select-trigger">
		<select id="sort" name="sort" required>
			<option value="">Trier par</option>
			<option>Popularité</option>
			<option>Date</option>
			<option>Titre</option>
		</select>
	</div>`;
}

function applyLikeAndPriceTemplate(photographe) {
	return `
	<div class="like-area">
		<div id="media-like-counter">${updateGlobalCounter()}
		</div>
		<i class="fa fa-heart"></i>
	</div>
	<div id="price">${photographe.price + "€ / jour"}
	</div>`;
}
function applyLightBoxTemplate() {
	return `			
	<button class="close" aria-label="Fermer" tabindex="0">close</button>
	<div class="modal-box">
		<button class="prev" tabindex="0" aria-label="Précédent">
			Précédent
		</button>
		<div class="modal-content"></div>
		<button class="next" tabindex="0" aria-label="Suivant">Suivant</button>
	</div>`;
}
function applyFormTemplate() {
	return `
	<div class="modal-form-content">
		<button class="close-form">Fermer</button>
		<form
			name="reserve"
			action="index.html"
			method="get"
			id="form"
			onsubmit="">
			<h1 id="h1-form"></h1>
			<div class="formData">
				<label for="input-first-name">Prénom</label><br />
				<input
					class="text-control"
					type="text"
					id="input-first-name"
					name="first name"
					minlength="2"
					required
					autofocus
				/>
			</div>
			<div class="formData">
				<label for="input-last-name">Nom</label><br />
				<input
					class="text-control"
					type="text"
					id="input-last-name"
					name="last name"
					required
				/><br />
			</div>
			<div class="formData">
				<label for="input-email">E-mail</label><br />
				<input
					class="text-control"
					type="email"
					id="input-email"
					name="email"
					required
				/><br />
			</div>
			<div class="formData">
				<label for="input-message">Message</label><br />
				<input
					class="text-control"
					type="text"
					id="input-message"
					name="Your message"
					required
				/><br />
			</div>
			<input
				class="btn-submit"
				type="submit"
				class="button"
				value="Envoyer"
			/>
		</form>
	</div>`;
}

// to create eventlistener of likes
//-> Inspiration from video https://www.youtube.com/watch?v=JixTYeCLf4Q

const applyListener = function () {
	const heartIcone = document.querySelectorAll("div.heart");
	const heartIconeAsArray = Array.prototype.slice.call(heartIcone);
	heartIconeAsArray.forEach(function (val) {
		val.addEventListener("click", (e) => {
			recountLike(e, val);
		});
		val.addEventListener("keypress", (e) => {
			if (e.keyCode === 13) {
				recountLike(e, val);
			}
		});
	});
};
//To handle the sorting
const applySorting = function (sorting) {
	let dataOfJsonFileMediaAfterclassAssociationSorted;
	while (medias.firstChild) {
		medias.firstChild.remove();
	}
	if (sorting == "Popularité") {
		dataOfJsonFileMediaAfterclassAssociationSorted = dataOfJsonFileMediaAfterclassAssociation.slice().sort(function (a, b) {
			return b.likes - a.likes;
		});
	} else if (sorting == "Date") {
		dataOfJsonFileMediaAfterclassAssociationSorted = dataOfJsonFileMediaAfterclassAssociation.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
	} else if (sorting == "Titre") {
		dataOfJsonFileMediaAfterclassAssociationSorted = dataOfJsonFileMediaAfterclassAssociation.sort((a, b) => a.title > b.title ? 1 : -1	);
	}
	medias.innerHTML = `${dataOfJsonFileMediaAfterclassAssociationSorted
		.filter((obj) => {
			return obj.photographerId == idOfPage;
		}).map(mediaTemplate).join("")}`;
};

// To totalize like when necessary
const recountLike = function (event, val) {
	let idOfMedia = val.id;
	let arrayLength = dataOfJsonFileMediaAfterclassAssociation.length;
	for (let i = 0; i < arrayLength; i++) {
		const item = dataOfJsonFileMediaAfterclassAssociation[i];
		if (
			dataOfJsonFileMediaAfterclassAssociation[i].id == idOfMedia &&
			dataOfJsonFileMediaAfterclassAssociation[i].isLiked == false
		) {
			// Check the id of media and this media has already been checked
			dataOfJsonFileMediaAfterclassAssociation[i].likes++;
			dataOfJsonFileMediaAfterclassAssociation[i].isLiked = true;
		}
	}

	medias.innerHTML = `${dataOfJsonFileMediaAfterclassAssociation
		.filter((obj) => {
			return obj.photographerId == idOfPage;
		})
		.map(mediaTemplate)
		.join("")}`;
	document.getElementById("media-like-counter").innerHTML = updateGlobalCounter();
	applyListener();
};
const updateGlobalCounter = function () {
	let total = dataOfJsonFileMediaAfterclassAssociation.reduce(function (
		prev,
		cur
	) {
		return prev + cur.likes;
	},
		0);
	return total;
};

const mainFunction = async () => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	idOfPage = urlParams.get("id");
	urlToApply = urlFromOtherPages;
	const dataOfJsonFileData = await getData();
	const dataOfJsonFileMedia = dataOfJsonFileData.media;
	const dataOfJsonFilePhotographer = dataOfJsonFileData.photographers;
	placeDataOfMediaInObject(dataOfJsonFileMedia);
	placeDataInObject(dataOfJsonFilePhotographer);
	currentPhotographer = dataOfJsonFilePhotographerAfterclassAssociation.filter(
		(obj) => {
			return obj.id == idOfPage;
		}
	)[0];
	document.getElementById("header-box").innerHTML = applyHeaderTemplate();
	document.getElementById("photographer").innerHTML = applyPhotographeTemplate(currentPhotographer);
	document.getElementById("filter").innerHTML = applyFilterTemplate();
	medias.innerHTML = `${dataOfJsonFileMediaAfterclassAssociation.filter((obj) => { return obj.photographerId == idOfPage }).map(mediaTemplate).join("")}`;
	document.getElementById("like-and-price").innerHTML = applyLikeAndPriceTemplate(currentPhotographer);
	document.getElementById("lightbox").innerHTML = applyLightBoxTemplate();
	document.getElementById("formulary").innerHTML = applyFormTemplate();

	manageSelectMenu();

	// Pour aller plus loin : https://www.youtube.com/watch?v=jk2rFuWImcI&t=207s
	const modale = document.querySelector(".modal");
	const close = document.querySelector(".close");
	const next = document.querySelector(".next");
	const prev = document.querySelector(".prev");
	const links = document.querySelectorAll(".media-container a");
	const ImgDestination = modale.querySelectorAll(".modal-content"); //Identify where the image will be displayed

	// All function to manage lightbox
	// Global méchanism: The orginale node of the image of photographer page is cloned and the node of image that was displayed is removed
	function titleTemplate(mediaData) {
		return `<div class="lightbox-title"><h2>${mediaData.title}</h2></div>`;
	}

	//-> Go to previous image
	function gotoprevious(e) {
		const currentImagePosition = ImgDestination[0].childNodes[0]; //identify where is the currentPosition
		let iteration = 0;
		for (let link of links.entries()) {
			if (link[1].isEqualNode(currentImagePosition)) {
				ImgDestination[0].innerHTML = "";

				if (iteration < 1) {
					iteration = 1;
				}
				let clonedNode = links[iteration - 1].cloneNode(true);
				ImgDestination[0].appendChild(clonedNode); // The node is diplayed in modal
				let divTitle = `${dataOfJsonFileMediaAfterclassAssociation.filter((obj) => {
						return obj.id == clonedNode.id;
					}).map(titleTemplate)}`;
				ImgDestination[0].insertAdjacentHTML("beforeEnd", divTitle);
			}
			iteration++;
		}
	}
	//-> Go to next image
	function gotonext(e) {
		let currentImagePosition = ImgDestination[0].childNodes[0];
		let iteration = 0;
		for (let link of links.entries()) {
			if (link[1].isEqualNode(currentImagePosition)) {
				ImgDestination[0].innerHTML = "";
				if (iteration > links.length - 2) {
					iteration = links.length - 2;
				}
				let clonedNode = links[iteration + 1].cloneNode(true);
				ImgDestination[0].appendChild(clonedNode); // The node is diplayed in modal
				let divTitle = `${dataOfJsonFileMediaAfterclassAssociation.filter((obj) => {
						return obj.id == clonedNode.id;
					}).map(titleTemplate)}`;
				ImgDestination[0].insertAdjacentHTML("beforeEnd", divTitle);
			}
			iteration++;
		}
	}

	function choosedirection(e) {
		e = e || window.event; //Next, e = e || event; is a standard way of saying "if the parameter was not passed, default it to whatever's after the ||". In this case, if the event parameter is not passed, then it looks for the global variable.
		if (e.keyCode == "37") {
			//left arrow
			gotoprevious();
		} else if (e.keyCode == "39") {
			// Right arrow
			gotonext();
		} else if (e.keyCode == "27") {
			//escape
			exit();
		}
	}

	//Manage display and node when exit the modal
	function exit(e) {
		if (modale.classList.contains("displayed")) {
			modale.classList.add("notdisplayed");
			modale.classList.remove("displayed");
			ImgDestination[0].innerHTML = "";
		} else if (modaleForm.classList.contains("displayed")) {
			modaleForm.classList.add("notdisplayed");
			modaleForm.classList.remove("displayed");
		}
	}
	// When an image is clicked the original node is cloned

	function placemedia(e) {
		// Add an eventLister on each image ;
		e.preventDefault();
		modale.classList.add("displayed"); //Display modal
		modale.classList.remove("notdisplayed");
		ImgDestination[0].innerHTML = "";
		let clonedNode = this.cloneNode(true); // The image clicked is cloned
		ImgDestination[0].appendChild(clonedNode); // The node is diplayed in modal
		let divTitle = `${dataOfJsonFileMediaAfterclassAssociation
			.filter((obj) => {
				return obj.id == clonedNode.id;
			})
			.map(titleTemplate)}`;
		ImgDestination[0].insertAdjacentHTML("beforeEnd", divTitle);
		const focusableElements = 'button,  [tabindex]:not([tabindex="-1"]';
		const firstFocusableElement = modale.querySelectorAll(focusableElements)[0];
		const firsttofocuson = modale.querySelectorAll(focusableElements)[1]; // get first element to be focused inside modal
		const focusableContent = modale.querySelectorAll(focusableElements);
		const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
		document.addEventListener("keydown", function (e) {
			let isTabPressed = e.key === "Tab" || e.key === 9;

			if (!isTabPressed) {
				return;
			}

			if (e.shiftKey) {
				// if shift key pressed for shift + tab combination
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus(); // add focus for the last focusable element
					e.preventDefault();
				}
			} else {
				// if tab key is pressed
				if (document.activeElement === lastFocusableElement) {
					// if focused has reached to last focusable element then focus first focusable element after pressing tab
					firstFocusableElement.focus(); // add focus for the first focusable element
					e.preventDefault();
				}
			}
		});
		firsttofocuson.focus();
	}

	// All event listener to manage lightbox
	prev.addEventListener("click", gotoprevious);
	next.addEventListener("click", gotonext);
	document.addEventListener("keydown", choosedirection);
	links.forEach(function (link) {
		link.addEventListener("click", placemedia);
	});

	close.addEventListener("click", exit);

	//formulary
	const modaleForm = document.querySelector(".modal-form");
	const form = document.querySelector("#form");
	const closeForm = document.querySelector(".close-form");
	const submitButton = document.querySelector(".btn-submit"); // Button to close modal
	const formButton = document.getElementById("contactez-moi");
	const formTitle = document.getElementById("h1-form");
	const formInputFirstName = document.getElementById("input-first-name");
	const formInputLastName = document.getElementById("input-last-name");
	const formInputEmail = document.getElementById("input-email");
	const formeTitleText = "Contactez-moi ";

	//Sequence when form is
	function submitform(e) {
		e.preventDefault();
		console.log(formInputFirstName.value);
		console.log(formInputLastName.value);
		console.log(formInputEmail.value);
		exit();
	}
	function callform(e) {
		modaleForm.classList.add("displayed");
		modaleForm.classList.remove("notdisplayed");
		formTitle.innerHTML = formeTitleText + currentPhotographer.name;
		const focusableElements =
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
		const firstFocusableElement =
			modaleForm.querySelectorAll(focusableElements)[0];
		const firsttofocuson = modaleForm.querySelectorAll(focusableElements)[1]; // get first element to be focused inside modal
		const focusableContent = modaleForm.querySelectorAll(focusableElements);
		const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
		document.addEventListener("keydown", function (e) {
			let isTabPressed = e.key === "Tab" || e.key === 9;
			if (!isTabPressed) {
				return;
			}
			if (e.shiftKey) {
				// if shift key pressed for shift + tab combination
				if (document.activeElement === firstFocusableElement) {
					lastFocusableElement.focus(); // add focus for the last focusable element
					e.preventDefault();
				}
			} else {
				// if tab key is pressed
				if (document.activeElement === lastFocusableElement) {
					// if focused has reached to last focusable element then focus first focusable element after pressing tab
					firstFocusableElement.focus(); // add focus for the first focusable element
					e.preventDefault();
				}
			}
		});
		firsttofocuson.focus();
	}
	formButton.addEventListener("click", callform);
	submitButton.addEventListener("click", submitform);
	closeForm.addEventListener("click", exit);
	applyListener();
};

document.addEventListener("DOMContentLoaded", (event) => {
	mainFunction();
});
