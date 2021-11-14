const menuIngredients = document.querySelectorAll("#menu-ingredients");
const menuAppareil = document.querySelectorAll("#menu-appareil");
const menuUstensiles = document.querySelectorAll("#menu-ustensiles");
const listIngredientsArea = document.getElementById("area-list-ingredients");
const listAppareilArea = document.getElementById("area-list-appareil");
const listUstensilesArea = document.getElementById("area-list-ustensiles");
const menuListIngredients = document.getElementById("menu-list-ingredients");
const menuListAppareil = document.getElementById("menu-list-appareil");
const menuListUstensiles = document.getElementById("menu-list-ustensiles");
const inputIngredients = document.getElementById("input-ingredients");
const inputAppareil = document.getElementById("input-appareil");
const inputUstensiles = document.getElementById("input-ustensiles");
const titleIngredients = document.getElementById("title-ingredients");
const titleAppareil = document.getElementById("title-appareil");
const titleUstensiles = document.getElementById("title-ustensiles");
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
// const recipesIngredients = document.querySelectorAll(".recipe-ingredients");

const typeIngredients = "Ingrédients";
const typeAppareil = "Appareil";
const typeUstensiles = "Ustensiles";
let typeOfInput;

let resultatRecherchePrincipale = [];
let resultatRecherchePrincipaleSansDoublon = [];
let resultatRechercheAvecTag = [];
let resultatRechercheAvecTagSansDoublon = [];
let resultatRechercheFinale = [];
let resultatRechercheFinaleSansDoublon = [];

const filteredIngredientsElements = [];
const filteredAppareilElements = [];
const filteredUstensilesElements = [];

let tableauIngredients  = [];
let tableauAppareils = [];
let tableauUstensiles = [];

let tableauIngredientsFiltre = [];
let tableauAppareilsFiltre = [];
let tableauUstensilesFiltre = [];

let idOfPage;

var item = document.getElementsByClassName("accordion-button");

const getIngredients = function (params) {
	let newtab = [];
	for (let i = 0; i < params.length; i++) {
		for (let j = 0; j < params[i].ingredients.length; j++) {
			newtab.unshift(params[i].ingredients[j].ingredient);
		}
	}
	let uniq = [...new Set(newtab)]; // apply filter on table
	return uniq;
};
const getAppareils = function (params) {
	let newtab = [];
	for (let i = 0; i < params.length; i++) {
		newtab.unshift(params[i].appliance);
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
//Identify selected element and place it in resume bar
const filterOnHashtag = function (e, filterToApply, typeOf) {
	//Populate appropriate array
	if (typeOf === typeIngredients) {
		filteredIngredientsElements.unshift(filterToApply);
	}
	if (typeOf === typeAppareil) {
		filteredAppareilElements.unshift(filterToApply);
	}
	if (typeOf === typeUstensiles) {
		filteredUstensilesElements.unshift(filterToApply);
	}
	// Place information on resume bar
	searchResumeIngredients.innerHTML = `${filteredIngredientsElements
		.map(updateResumeList)
		.join("")}`;
	searchResumeAppareil.innerHTML = `${filteredAppareilElements
		.map(updateResumeList)
		.join("")}`;
	searchResumeUstensiles.innerHTML = `${filteredUstensilesElements
		.map(updateResumeList)
		.join("")}`;
	filteredAppareilElements.forEach((appareilSelectionnee) => {
		recipes.forEach((recette) => {
			if (recette.appliance == appareilSelectionnee) {
				resultatRechercheAvecTag.unshift(recette);
			}
		});
	});
	filteredIngredientsElements.forEach((ingredientsSelectionnee) => {
		recipes.forEach((recette) => {
			recette.ingredients.forEach((ingredients) => {
				if (ingredients.ingredient == ingredientsSelectionnee) {
					resultatRechercheAvecTag.unshift(recette);
				}
			});
		});
	});
	filteredUstensilesElements.forEach((UstensilesSelectionnee) => {
		recipes.forEach((recette) => {
			recette.ustensils.forEach((Ustensiles) => {
				if (Ustensiles == UstensilesSelectionnee) {
					resultatRechercheAvecTag.unshift(recette);
				}
			});
		});
	});

	// console.log(resultatRechercheAvecTag.ingredients);
	//Tableau qui filtre mes tags
	// console.log(resultatRechercheAvecTag);
	resultatRechercheAvecTagSansDoublon = [...new Set(resultatRechercheAvecTag)]; // apply filter on table
	console.log(resultatRechercheAvecTagSansDoublon);
	getGlobalResult();
	// console.log(filteredAppareilElements);
};
function filterOnMainInput(ValueOfInput) {
	console.log(ValueOfInput);
	if (ValueOfInput.length > 2) {
		recipes.forEach((recette) => {
			if (recette.name.toLowerCase().includes(ValueOfInput.toLowerCase())) {
				resultatRecherchePrincipale.unshift(recette);
			}
			console.log(recette.ingredients)
			recette.ingredients.forEach((ingredients) => {
				if (
					ingredients.ingredient.toLowerCase().includes(ValueOfInput.toLowerCase())
				) {
					resultatRecherchePrincipale.unshift(recette);
				}
			});
			if (
				recette.description.toLowerCase().includes(ValueOfInput.toLowerCase())
			) {
				resultatRecherchePrincipale.unshift(recette);
			}
		});

		resultatRecherchePrincipaleSansDoublon = [...new Set(resultatRecherchePrincipale)]; // apply filter on table
		console.log(resultatRecherchePrincipaleSansDoublon);
		getGlobalResult()
		UpdateArraysOfIngredientsAndAppareilsAndUstensiles()

		// array3 = [...new Set([...array1, ...array2])];

		// resultatRecherchePrincipale = recipes.filter((description) =>
		// description.toLowerCase().includes(ValueOfInput)
		// );
	}
	else{
		resultatRechercheFinaleSansDoublon = recipes; 
		UpdateArraysOfIngredientsAndAppareilsAndUstensiles()
	}
	// else {
	// 	menuListAppareil.innerHTML = `${tableauAppareil.map(updateList).join("")}`;
	// 	applytagEventListener();
	// }
}
function getGlobalResult() {
	resultatRechercheFinaleSansDoublon = [...new Set([...resultatRecherchePrincipaleSansDoublon, ...resultatRechercheAvecTagSansDoublon])];
	results.innerHTML = `${resultatRechercheFinaleSansDoublon.map(updateResults).join("")}`;
}
function UpdateArraysOfIngredientsAndAppareilsAndUstensiles() {
 tableauIngredients = getIngredients(resultatRechercheFinaleSansDoublon);
 tableauAppareils = getAppareils(resultatRechercheFinaleSansDoublon);
 tableauUstensiles = getUstensiles(resultatRechercheFinaleSansDoublon);
 menuListIngredients.innerHTML = `${tableauIngredients
	.map(updateList)
	.join("")}`;
menuListAppareil.innerHTML = `${tableauAppareils.map(updateList).join("")}`;
menuListUstensiles.innerHTML = `${tableauUstensiles.map(updateList).join("")}`;
 console.log(tableauIngredients);
}
function updateList(data) {
	return `<li>${data}</li>`;
}
function updateResumeList(data) {
	return `<li>${data}</li>`;
}
function updateIngredients(data) {
	return `<p class="ingredient">
	<span class="ingredient-name">${data.ingredient}</span>
	<span class="ingredient-quantity">${data.quantity ? data.quantity :"" }</span>
	<span class="ingredient-unit">${data.unit ? data.unit : ""}</span>
</p>`;
}
function updateResults(data) {
	return `<div class="recipe card">
	<img src="..." class="card-img-top" alt="..." />
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
function applytagEventListener() {
	const tagIngredients = document.querySelectorAll(
		"#area-list-ingredients .accordion-body li"
	);
	tagIngredients.forEach(function (val) {
		val.addEventListener("click", (e) => {
			typeOfInput = typeIngredients;
			filterOnHashtag(e, val.innerHTML, typeOfInput);
		});
	});
	const tagAppareil = document.querySelectorAll(
		"#area-list-appareil .accordion-body li"
	);
	tagAppareil.forEach(function (val) {
		val.addEventListener("click", (e) => {
			typeOfInput = typeAppareil;
			filterOnHashtag(e, val.innerHTML, typeOfInput);
		});
	});
	const tagUstensiles = document.querySelectorAll(
		"#area-list-ustensiles .accordion-body li"
	);
	tagUstensiles.forEach(function (val) {
		val.addEventListener("click", (e) => {
			typeOfInput = typeUstensiles;
			filterOnHashtag(e, val.innerHTML, typeOfInput);
		});
	});
}
// accordion-collapse
// if (this._triggerArray.length) {
// 	this._triggerArray.forEach(element => {
// 	  element.classList.remove(CLASS_NAME_COLLAPSED);
// 	  element.setAttribute('aria-expanded', true);
// 	});
//   }

// function deleteDoublon() {
// 	let uniq = [...new Set(resultatRechercheAvecTag)]; // apply filter on table
// 	resultatRechercheAvecTag.length = 0;
// 	resultatRechercheAvecTag = uniq;
// }
resultatRechercheFinaleSansDoublon = recipes
UpdateArraysOfIngredientsAndAppareilsAndUstensiles()

for (let i = 0; i < item.length; i++) {
	item[i].addEventListener("click", function (el) {
		el.currentTarget.classList.toggle("collapsed");
		UpdateArraysOfIngredientsAndAppareilsAndUstensiles()
		if (el.target.id === menuIngredients[0].id) {
			listIngredientsArea.classList.toggle("show");
			inputIngredients.classList.toggle("show");
			titleIngredients.classList.toggle("show");
		} else if (el.target.id === menuAppareil[0].id) {
			listAppareilArea.classList.toggle("show");
			inputAppareil.classList.toggle("show");
			titleAppareil.classList.toggle("show");
		} else if (el.target.id === menuUstensiles[0].id) {
			listUstensilesArea.classList.toggle("show");
			inputUstensiles.classList.toggle("show");
			titleUstensiles.classList.toggle("show");
		}
		// console.log(el.target.id===menuUstensiles[0].id)
		// for (let i = 0; i < item.length; i++) {
		//   if (item[i] !== el.currentTarget && item[i].className === "item collapsed") {
		//     item[i].classList.remove('collapsed');
		//   }
		// }
	});
}
applytagEventListener();

inputIngredients.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	console.log(term);
	if (term.length > 2) {
		tableauIngredientsFiltre = tableauIngredients.filter((s) =>
			s.toLowerCase().includes(term)
		);
		menuListIngredients.innerHTML = `${tableauIngredientsFiltre
			.map(updateList)
			.join("")}`;
		applytagEventListener();
	} else {
		menuListIngredients.innerHTML = `${tableauIngredients
			.map(updateList)
			.join("")}`;
		applytagEventListener();
	}
});
inputAppareil.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	console.log(term);
	if (term.length > 2) {
		tableauAppareilFiltre = tableauAppareil.filter((s) =>
			s.toLowerCase().includes(term)
		);
		menuListAppareil.innerHTML = `${tableauAppareilFiltre
			.map(updateList)
			.join("")}`;
		applytagEventListener();
	} else {
		menuListAppareil.innerHTML = `${tableauAppareil.map(updateList).join("")}`;
		applytagEventListener();
	}
});
inputUstensiles.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	console.log(term);
	if (term.length > 2) {
		tableauUstensilesFiltre = tableauUstensiles.filter((s) =>
			s.toLowerCase().includes(term)
		);

		console.log(resultatRechercheAvecTag);
		menuListUstensiles.innerHTML = `${tableauUstensilesFiltre
			.map(updateList)
			.join("")}`;
		applytagEventListener();
	} else {
		menuListUstensiles.innerHTML = `${tableauUstensiles
			.map(updateList)
			.join("")}`;
		applytagEventListener();
	}
});
mainSearchInput.addEventListener("change", (e) => {
	let value = e.target.value;
	filterOnMainInput(value);
});

// document.addEventListener("DOMContentLoaded", (event) => {
// 	mainFunction();
// });
