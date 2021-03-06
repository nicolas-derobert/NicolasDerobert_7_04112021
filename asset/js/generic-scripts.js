const menuIngredient = document.querySelectorAll("#menu-ingredients");
const menuAppliance = document.querySelectorAll("#menu-appareil");
const menuUstensil = document.querySelectorAll("#menu-ustensiles");
const areaOfListOfIngredient = document.getElementById("area-list-ingredients");
const areaOfListOfAppliance = document.getElementById("area-list-appareil");
const areaOfListOfUstensil = document.getElementById("area-list-ustensiles");
const locationOfListOfIngredient = document.getElementById(
	"menu-list-ingredients"
);
const locationOfListOfAppliance = document.getElementById("menu-list-appareil");
const locationOfListOfUstensil = document.getElementById(
	"menu-list-ustensiles"
);
const listButton = document.getElementsByClassName("accordion-button");
const inputIngredient = document.getElementById("input-ingredients");
const inputAppliance = document.getElementById("input-appareil");
const inputUstensil = document.getElementById("input-ustensiles");
const titleIngredient = document.getElementById("title-ingredients");
const titleAppliance = document.getElementById("title-appareil");
const titleUstensil = document.getElementById("title-ustensiles");
const results = document.getElementById("results");
const searchResume = document.getElementById("search-resume");

const menuElemList = document.querySelectorAll("#search-resume ul li");
const mainSearchInput = document.getElementById("main-search-input");

const searchResumeIngredients = document.getElementById(
	"search-resume-ingredients"
);
const searchResumeAppareil = document.getElementById("search-resume-appareil");
const searchResumeUstensiles = document.getElementById(
	"search-resume-ustensiles"
);

const typeIngredients = "Ingrédients";
const typeAppareil = "Appareil";
const typeUstensiles = "Ustensiles";
let typeOfInput;

//Array of recipes
let ArrayOfRecipesComingFromMainSearchBar = [];
let ArrayOfRecipesComingFromMainSearchBarWithoutDoublon = [];
let ArrayOfRecipesComingFromTagsBar = [];
let ArrayOfRecipesComingFromTagsBarWithoutDoublon = [];
let ArrayOfRecipesFinalWithoutDoublon = [];

let listOfSelectedTagIngredient = [];
let listOfSelectedTagAppliance = [];
let listOfSelectedTagUstensil = [];

let listOfAvailableTagIngredient = [];
let listOfAvailableTagAppliance = [];
let listOfAvailableTagUstensil = [];

let listOfFilteredTagIngredients = [];
let listOfFilteredTagAppliance = [];
let listOfFilteredTagUstensil = [];

function capitalizeFirstLetter(string) {
	let value = string.toLowerCase();
	value = value.charAt(0).toUpperCase() + value.slice(1);
	return value;
}

const getIngredients = function (params) {
	let newtab = [];
	for (let i = 0; i < params.length; i++) {
		for (let j = 0; j < params[i].ingredients.length; j++) {
			newtab.unshift(capitalizeFirstLetter(params[i].ingredients[j].ingredient));
		}
	}
	let uniq = [...new Set(newtab)]; // apply filter on table
	return uniq;
};
const getAppareils = function (params) {
	let newtab = [];
	for (let i = 0; i < params.length; i++) {
		newtab.unshift(capitalizeFirstLetter(params[i].appliance));
	}
	let uniq = [...new Set(newtab)]; // apply filter on table
	return uniq;
};
const getUstensiles = function (params) {
	let newtab = [];
	for (let i = 0; i < params.length; i++) {
		newtab.unshift(params[i].ustensils);
	}
	newtab = newtab.flat();
	let uniq = [...new Set(newtab)]; // apply filter on table
	return uniq;
};

function filterByFilteringElement(ValueOfInput) {
	ArrayOfRecipesComingFromMainSearchBarWithoutDoublon = recipes.filter(
		(recette) =>
			recette.name.toLowerCase().includes(ValueOfInput.toLowerCase()) ||
			recette.ingredients.some((ing) =>
				ing.ingredient.toLowerCase().includes(ValueOfInput.toLowerCase())
			) ||
			recette.description.toLowerCase().includes(ValueOfInput.toLowerCase())
	);
}

function filterOnMainInput(ValueOfInput) {
	if (ValueOfInput.length > 2) {
		filterByFilteringElement(ValueOfInput);
		getGlobalResult();
	} else {
		ArrayOfRecipesComingFromMainSearchBarWithoutDoublon = recipes;
		results.innerHTML = `${recipes.map(
			updateResults
		).join("")}`;
		}
	UpdateArraysOfIngredientsAndAppareilsAndUstensiles();
	applytagEventListener();
}

function UpdateDisplayingOfTag() {
	searchResumeIngredients.innerHTML = `${listOfSelectedTagIngredient
		.map(updateResumeList)
		.join("")}`;
	searchResumeAppareil.innerHTML = `${listOfSelectedTagAppliance
		.map(updateResumeList)
		.join("")}`;
	searchResumeUstensiles.innerHTML = `${listOfSelectedTagUstensil
		.map(updateResumeList)
		.join("")}`;
}

function applytagEventListener() {
	const tagIngredients = document.querySelectorAll(
		"#area-list-ingredients .accordion-body li"
	);
	tagIngredients.forEach(function (val) {
		val.addEventListener("click", (e) => {
			typeOfInput = typeIngredients;
			filterOnHashtag(e, val.innerHTML, typeOfInput);
			areaOfListOfIngredient.classList.toggle("show");
			inputIngredient.classList.toggle("show");
			titleIngredient.classList.toggle("show");
		});
	});
	const tagAppareil = document.querySelectorAll(
		"#area-list-appareil .accordion-body li"
	);
	tagAppareil.forEach(function (val) {
		val.addEventListener("click", (e) => {
			typeOfInput = typeAppareil;
			filterOnHashtag(e, val.innerHTML, typeOfInput);
			areaOfListOfAppliance.classList.toggle("show");
			inputAppliance.classList.toggle("show");
			titleAppliance.classList.toggle("show");
		});
	});
	const tagUstensiles = document.querySelectorAll(
		"#area-list-ustensiles .accordion-body li"
	);
	tagUstensiles.forEach(function (val) {
		val.addEventListener("click", (e) => {
			typeOfInput = typeUstensiles;
			filterOnHashtag(e, val.innerHTML, typeOfInput);
			areaOfListOfUstensil.classList.toggle("show");
			inputUstensil.classList.toggle("show");
			titleUstensil.classList.toggle("show");
		});
	});
}

function applyEventListenerOnTagOnTagBar() {
	const areaOfSelectedTagIngredient = document.querySelectorAll(
		"#search-resume-ingredients li"
	);
	const areaOfSelectedTagAppliance = document.querySelectorAll(
		"#search-resume-appareil li"
	);
	const areaOfSelectedTagUstensil = document.querySelectorAll(
		"#search-resume-ustensiles li"
	);
	// Add eventListener relative to new items
	areaOfSelectedTagIngredient.forEach((tag) => {
		let value = tag.innerHTML;
		tag.addEventListener("click", () => {
			listOfSelectedTagIngredient = listOfSelectedTagIngredient.filter(
				(item) => item !== value
			);
			updateTagsSearch();
		});
	});
	areaOfSelectedTagAppliance.forEach((tag) => {
		let value = tag.innerHTML;
		tag.addEventListener("click", () => {
			listOfSelectedTagAppliance = listOfSelectedTagAppliance.filter(
				(item) => item !== value
			);
			updateTagsSearch();
		});
	});
	areaOfSelectedTagUstensil.forEach((tag) => {
		let value = tag.innerHTML;
		tag.addEventListener("click", () => {
			listOfSelectedTagUstensil = listOfSelectedTagUstensil.filter(
				(item) => item !== value
			);
			updateTagsSearch();
		});
	});
}

function updateTagsSearch() {
	UpdateDisplayingOfTag();
	applyEventListenerOnTagOnTagBar();
	UpdateListOfRecipesComingFromTag();
	getGlobalResult();
	UpdateArraysOfIngredientsAndAppareilsAndUstensiles();
	applytagEventListener();
}

//Identify selected element and place it in resume bar
function filterOnHashtag(e, filterToApply, typeOf) {
	AddNewTagsInSelectedTagsBar(filterToApply, typeOf);
	UpdateListOfRecipesComingFromTag();
	applytagEventListener();
	getGlobalResult();
	UpdateArraysOfIngredientsAndAppareilsAndUstensiles();
	applytagEventListener();
}
function AddNewTagsInSelectedTagsBar(filterToApply, typeOf) {
	//Populate appropriate array of all selected element
	let formatedFilterToApply = capitalizeFirstLetter(filterToApply);
	if (typeOf === typeIngredients) {
		listOfSelectedTagIngredient.indexOf(formatedFilterToApply) === -1
			? listOfSelectedTagIngredient.push(formatedFilterToApply)
			: "";
	}
	if (typeOf === typeAppareil) {
		listOfSelectedTagAppliance.indexOf(formatedFilterToApply) === -1
			? listOfSelectedTagAppliance.push(formatedFilterToApply)
			: "";
	}
	if (typeOf === typeUstensiles) {
		listOfSelectedTagUstensil.indexOf(formatedFilterToApply) === -1
			? listOfSelectedTagUstensil.push(formatedFilterToApply)
			: "";
	}
	// Place information on resume bar
	UpdateDisplayingOfTag();
	applyEventListenerOnTagOnTagBar();
}
function UpdateListOfRecipesComingFromTag() {

	ArrayOfRecipesComingFromTagsBarWithoutDoublon = recipes.filter(function (el) {
		return (
			(listOfSelectedTagUstensil.length > 0
				? listOfSelectedTagUstensil.every((r) =>
						el.ustensils.map((a) => a.toLowerCase()).includes(r.toLowerCase())
				  )
				: true) &&
			(listOfSelectedTagIngredient.length > 0
				? listOfSelectedTagIngredient.every((r) =>
						el.ingredients
							.flatMap((myIngredients) => myIngredients.ingredient)
							.map((a) => a.toLowerCase())
							.includes(r.toLowerCase())
				  )
				: true) &&
			(listOfSelectedTagAppliance.length > 0
				? listOfSelectedTagAppliance
						.map((a) => a.toLowerCase())
						.includes(el.appliance.toLowerCase())
				: true)
		);
	});
}

function getGlobalResult() {
	if (
		ArrayOfRecipesComingFromMainSearchBarWithoutDoublon.length > 0 &&
		ArrayOfRecipesComingFromTagsBarWithoutDoublon.length > 0
	) {
		ArrayOfRecipesFinalWithoutDoublon =
			ArrayOfRecipesComingFromMainSearchBarWithoutDoublon.filter((value) =>
				ArrayOfRecipesComingFromTagsBarWithoutDoublon.includes(value)
			);
	} else if (
		ArrayOfRecipesComingFromMainSearchBarWithoutDoublon.length == 0 &&
		ArrayOfRecipesComingFromTagsBarWithoutDoublon.length > 0
	) {
		ArrayOfRecipesFinalWithoutDoublon =
			ArrayOfRecipesComingFromTagsBarWithoutDoublon;
	} else if (
		ArrayOfRecipesComingFromMainSearchBarWithoutDoublon.length > 0 &&
		ArrayOfRecipesComingFromTagsBarWithoutDoublon.length == 0
	) {
		ArrayOfRecipesFinalWithoutDoublon =
			ArrayOfRecipesComingFromMainSearchBarWithoutDoublon;
	} else {
		ArrayOfRecipesFinalWithoutDoublon.length = 0;
	}

	if (ArrayOfRecipesFinalWithoutDoublon.length == 0) {
		results.innerHTML =
			"Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
	} else {
		results.innerHTML = `${ArrayOfRecipesFinalWithoutDoublon.map(
			updateResults
		).join("")}`;
	}
}

//Define remaining lists of filters
function UpdateArraysOfIngredientsAndAppareilsAndUstensiles() {
	let tempArray = ArrayOfRecipesFinalWithoutDoublon;

	if (tempArray.length==0) {
		tempArray=recipes ;
	}

 
	listOfAvailableTagIngredient = getIngredients(tempArray);
	listOfAvailableTagAppliance = getAppareils(tempArray);
	listOfAvailableTagUstensil = getUstensiles(tempArray);
	//Populate list in listsboxs
	locationOfListOfIngredient.innerHTML = `${listOfAvailableTagIngredient
		.map(updateList)
		.join("")}`;
	locationOfListOfAppliance.innerHTML = `${listOfAvailableTagAppliance
		.map(updateList)
		.join("")}`;
	locationOfListOfUstensil.innerHTML = `${listOfAvailableTagUstensil
		.map(updateList)
		.join("")}`;
}
function updateList(data) {
	return `<li>${capitalizeFirstLetter(data)}</li>`;
}
function updateResumeList(data) {
	return `<li>${data}</li>`;
}
function updateIngredients(data) {
	return `<p class="ingredient">
	<span class="ingredient-name">${data.ingredient}</span>
	<span class="ingredient-quantity">${data.quantity ? data.quantity : ""}</span>
	<span class="ingredient-unit">${data.unit ? data.unit : ""}</span>
</p>`;
}
function updateResults(data) {
	return `<div class="recipe card">
	<img src="#" class="card-img-top" alt="..." />
	<div class="text-container">
		<h2 class="">${data.name}</h2>
		<p class="recipe-time">${data.time} min</p>

		<div class="recipe-ingredients">
		${data.ingredients.map(updateIngredients).join("")}
		

		</div>
		<div class="recipe-description-bloc overflow"><p class="recipe-description">${
			data.description
		}
		</p></div>
	</div>
</div>`;
}


//------------------------------//

//DEBUT DE L'EXECUTION
// ArrayOfRecipesComingFromMainSearchBarWithoutDoublon = recipes;
UpdateArraysOfIngredientsAndAppareilsAndUstensiles();
applytagEventListener();
results.innerHTML = `${recipes.map(
	updateResults
).join("")}`;

// For all listbox, apply approriate EventListener
for (let i = 0; i < listButton.length; i++) {
	listButton[i].addEventListener("click", function (el) {
		el.currentTarget.classList.toggle("collapsed");
		if (el.target.id === menuIngredient[0].id) {
			areaOfListOfIngredient.classList.toggle("show");
			inputIngredient.classList.toggle("show");
			titleIngredient.classList.toggle("show");
		} else if (el.target.id === menuAppliance[0].id) {
			areaOfListOfAppliance.classList.toggle("show");
			inputAppliance.classList.toggle("show");
			titleAppliance.classList.toggle("show");
		} else if (el.target.id === menuUstensil[0].id) {
			areaOfListOfUstensil.classList.toggle("show");
			inputUstensil.classList.toggle("show");
			titleUstensil.classList.toggle("show");
		}
	});
}

inputIngredient.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	listOfFilteredTagIngredients = listOfAvailableTagIngredient.filter((s) =>
		s.toLowerCase().includes(term)
	);
	locationOfListOfIngredient.innerHTML = `${listOfFilteredTagIngredients
		.map(updateList)
		.join("")}`;
	applytagEventListener();
});
inputIngredient.addEventListener("click", function (e) {
	e.stopPropagation();
});
inputAppliance.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	listOfFilteredTagAppliance = listOfAvailableTagAppliance.filter((s) =>
		s.toLowerCase().includes(term)
	);
	locationOfListOfAppliance.innerHTML = `${listOfFilteredTagAppliance
		.map(updateList)
		.join("")}`;
	applytagEventListener();
});
inputAppliance.addEventListener("click", function (e) {
	e.stopPropagation();
});
inputUstensil.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	listOfFilteredTagUstensil = listOfAvailableTagUstensil.filter((s) =>
		s.toLowerCase().includes(term)
	);

	locationOfListOfUstensil.innerHTML = `${listOfFilteredTagUstensil
		.map(updateList)
		.join("")}`;
	applytagEventListener();
});
inputUstensil.addEventListener("click", function (e) {
	e.stopPropagation();
});
mainSearchInput.addEventListener("keyup", (e) => {
	let value = e.target.value;
	filterOnMainInput(value);
});
