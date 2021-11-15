const menuIngredient = document.querySelectorAll("#menu-ingredients");
const menuAppliance = document.querySelectorAll("#menu-appareil");
const menuUstensil = document.querySelectorAll("#menu-ustensiles");
const AreaOfListOfIngredient = document.getElementById("area-list-ingredients");
const AreaOfListOfAppliance = document.getElementById("area-list-appareil");
const AreaOfListOfUstensil = document.getElementById("area-list-ustensiles");
const LocationOfListOfIngredient = document.getElementById(
	"menu-list-ingredients"
);
const LocationOfListOfAppliance = document.getElementById("menu-list-appareil");
const LocationOfListOfUstensil = document.getElementById(
	"menu-list-ustensiles"
);
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
// const recipesIngredients = document.querySelectorAll(".recipe-ingredients");

const typeIngredients = "Ingrédients";
const typeAppareil = "Appareil";
const typeUstensiles = "Ustensiles";
let typeOfInput;

//Array of recipes
let ArrayOfRecipesComingFromMainSearchBar = [];
let ArrayOfRecipesComingFromMainSearchBarWithoutDoublon = [];
let ArrayOfRecipesComingFromTagsBar = [];
let ArrayOfRecipesComingFromTagIngredient = [];
let ArrayOfRecipesComingFromTagIngredientWithoutDoublon = [];
let ArrayOfRecipesComingFromTagAppliance = [];
let ArrayOfRecipesComingFromTagApplianceWithoutDoublon = [];
let ArrayOfRecipesComingFromTagUstensil = [];
let ArrayOfRecipesComingFromTagUstensilWithoutDoublon = [];
let ArrayOfRecipesComingFromTagsBarWithoutDoublon = [];
let ArrayOfRecipesFinal = [];
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

let idOfPage;

var listButton = document.getElementsByClassName("accordion-button");

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

function AddNewTagsInSelectedTagsBar(filterToApply, typeOf){
	//Populate appropriate array of all selected element 
	if (typeOf === typeIngredients) {
		listOfSelectedTagIngredient.unshift(filterToApply);
	}
	if (typeOf === typeAppareil) {
		listOfSelectedTagAppliance.unshift(filterToApply);
	}
	if (typeOf === typeUstensiles) {
		listOfSelectedTagUstensil.unshift(filterToApply);
	}
	// Place information on resume bar
	searchResumeIngredients.innerHTML = `${listOfSelectedTagIngredient
		.map(updateResumeList)
		.join("")}`;
	searchResumeAppareil.innerHTML = `${listOfSelectedTagAppliance
		.map(updateResumeList)
		.join("")}`;
	searchResumeUstensiles.innerHTML = `${listOfSelectedTagUstensil
		.map(updateResumeList)
		.join("")}`;
	
		applyEventListenerOnTagOnTagBar()

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
			tag.addEventListener("click", () => {
				console.log(tag);
				console.log(tag.innerHTML);

				let value = tag.innerHTML;
				listOfSelectedTagIngredient = listOfSelectedTagIngredient.filter(
					(item) => item !== value
				);
			});
		});
		areaOfSelectedTagAppliance.forEach((tag) => {
			tag.addEventListener("click", () => {
				let value = tag.innerHTML;
				listOfSelectedTagAppliance = listOfSelectedTagAppliance.filter(
					(item) => item !== value
				);
			});
		});
		areaOfSelectedTagUstensil.forEach((tag) => {
			tag.addEventListener("click", () => {
				let value = tag.innerHTML;
				listOfSelectedTagUstensil = listOfSelectedTagUstensil.filter(
					(item) => item !== value
				);
			});
		});
}

function UpdateListOfRecipesComingFromTag() {
	//Obtain list of recipes linked to selected Tag
	ArrayOfRecipesFinalWithoutDoublon.forEach((recette) => {
		listOfAvailableTagIngredient.forEach((ingredientOflist) => {
			recette.ingredients.forEach((ingredients) => {
				if (
					ingredients.ingredient
						.toLowerCase()
						.includes(ingredientOflist.toLowerCase())
				) {
					ArrayOfRecipesComingFromTagIngredient.unshift(recette);
				}
			});
		});
		listOfAvailableTagAppliance.forEach((applianceOfList) => {
			if (
				recette.appliance.toLowerCase().includes(applianceOfList.toLowerCase())
			) {
				ArrayOfRecipesComingFromTagAppliance.unshift(recette);
			}
		});

		listOfAvailableTagUstensil.forEach((ustensilOfList) => {
			if (
				recette.appliance.toLowerCase().includes(ustensilOfList.toLowerCase())
			) {
				ArrayOfRecipesComingFromTagUstensil.unshift(recette);
			}
		});
	});
	ArrayOfRecipesComingFromTagIngredientWithoutDoublon = [
		...new Set(ArrayOfRecipesComingFromTagIngredient),
	];
	ArrayOfRecipesComingFromTagApplianceWithoutDoublon = [
		...new Set(ArrayOfRecipesComingFromTagAppliance),
	];
	ArrayOfRecipesComingFromTagUstensilWithoutDoublon = [
		...new Set(ArrayOfRecipesComingFromTagUstensil),
	];
	//Get the whole result from tags filter
	let data = [
		ArrayOfRecipesComingFromTagIngredientWithoutDoublon,
		ArrayOfRecipesComingFromTagApplianceWithoutDoublon,
		ArrayOfRecipesComingFromTagUstensilWithoutDoublon,
	];
	console.log(ArrayOfRecipesComingFromTagIngredient);
	console.log(ArrayOfRecipesComingFromTagIngredientWithoutDoublon);
	// console.log(ArrayOfRecipesComingFromTagsBarWithoutDoublon);

	ArrayOfRecipesComingFromTagsBarWithoutDoublon = data.reduce((a, b) =>
		a.filter((c) => b.includes(c))
	);
	console.log(ArrayOfRecipesComingFromTagsBarWithoutDoublon);
}
//Identify selected element and place it in resume bar
const filterOnHashtag = function (e, filterToApply, typeOf) {
	AddNewTagsInSelectedTagsBar(filterToApply, typeOf)
	UpdateListOfRecipesComingFromTag() 
	getGlobalResult();

	// Update result with corresponding recipes
	// listOfSelectedTagAppliance.forEach((appareilSelectionnee) => {
	// 	recipes.forEach((recette) => {
	// 		if (recette.appliance == appareilSelectionnee) {
	// 			ArrayOfRecipesComingFromTagsBar.unshift(recette);
	// 		}
	// 	});
	// });
	// listOfSelectedTagIngredient.forEach((ingredientsSelectionnee) => {
	// 	recipes.forEach((recette) => {
	// 		recette.ingredients.forEach((ingredients) => {
	// 			if (ingredients.ingredient == ingredientsSelectionnee) {
	// 				ArrayOfRecipesComingFromTagsBar.unshift(recette);
	// 			}
	// 		});
	// 	});
	// });
	// listOfSelectedTagUstensil.forEach((UstensilesSelectionnee) => {
	// 	recipes.forEach((recette) => {
	// 		recette.ustensils.forEach((Ustensiles) => {
	// 			if (Ustensiles == UstensilesSelectionnee) {
	// 				ArrayOfRecipesComingFromTagsBar.unshift(recette);
	// 			}
	// 		});
	// 	});
	// });

	// console.log(ArrayOfRecipesComingFromTagsBar.ingredients);
	//Tableau qui filtre mes tags
	// console.log(ArrayOfRecipesComingFromTagsBar);
	// ArrayOfRecipesComingFromTagsBarWithoutDoublon = [...new Set(ArrayOfRecipesComingFromTagsBar)]; // apply filter on table
	// console.log(listOfSelectedTagAppliance);
};
function filterOnMainInput(ValueOfInput) {
	console.log(ValueOfInput);
	if (ValueOfInput.length > 2) {
		recipes.forEach((recette) => {
			if (recette.name.toLowerCase().includes(ValueOfInput.toLowerCase())) {
				ArrayOfRecipesComingFromMainSearchBar.unshift(recette);
			}
			console.log(recette.ingredients);
			recette.ingredients.forEach((ingredients) => {
				if (
					ingredients.ingredient
						.toLowerCase()
						.includes(ValueOfInput.toLowerCase())
				) {
					ArrayOfRecipesComingFromMainSearchBar.unshift(recette);
				}
			});
			if (
				recette.description.toLowerCase().includes(ValueOfInput.toLowerCase())
			) {
				ArrayOfRecipesComingFromMainSearchBar.unshift(recette);
			}
		});

		ArrayOfRecipesComingFromMainSearchBarWithoutDoublon = [
			...new Set(ArrayOfRecipesComingFromMainSearchBar),
		]; // apply filter on table
		console.log(ArrayOfRecipesComingFromMainSearchBarWithoutDoublon);
		getGlobalResult();
		UpdateArraysOfIngredientsAndAppareilsAndUstensiles();

		// array3 = [...new Set([...array1, ...array2])];

		// ArrayOfRecipesComingFromMainSearchBar = recipes.filter((description) =>
		// description.toLowerCase().includes(ValueOfInput)
		// );
	} else {
		ArrayOfRecipesFinalWithoutDoublon = recipes;
		UpdateArraysOfIngredientsAndAppareilsAndUstensiles();
	}
	// else {
	// 	LocationOfListOfAppliance.innerHTML = `${listOfAvailableTagAppliance.map(updateList).join("")}`;
	// 	applytagEventListener();
	// }
}
function getGlobalResult() {
	ArrayOfRecipesFinalWithoutDoublon = [
		...new Set([
			...ArrayOfRecipesComingFromMainSearchBarWithoutDoublon,
			...ArrayOfRecipesComingFromTagsBarWithoutDoublon,
		]),
	];
	results.innerHTML = `${ArrayOfRecipesFinalWithoutDoublon.map(
		updateResults
	).join("")}`;
}
//Define remaining lists of filters
function UpdateArraysOfIngredientsAndAppareilsAndUstensiles() {
	listOfAvailableTagIngredient = getIngredients(
		ArrayOfRecipesFinalWithoutDoublon
	);
	listOfAvailableTagAppliance = getAppareils(ArrayOfRecipesFinalWithoutDoublon);
	listOfAvailableTagUstensil = getUstensiles(ArrayOfRecipesFinalWithoutDoublon);
	//Populate list in listsboxs
	LocationOfListOfIngredient.innerHTML = `${listOfAvailableTagIngredient
		.map(updateList)
		.join("")}`;
	LocationOfListOfAppliance.innerHTML = `${listOfAvailableTagAppliance
		.map(updateList)
		.join("")}`;
	LocationOfListOfUstensil.innerHTML = `${listOfAvailableTagUstensil
		.map(updateList)
		.join("")}`;
	//  console.log(listOfAvailableTagIngredient);
	//  console.log(listOfAvailableTagAppliance);
	//  console.log(listOfAvailableTagUstensil);
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
	<span class="ingredient-quantity">${data.quantity ? data.quantity : ""}</span>
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
			console.log(val);
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
// 	let uniq = [...new Set(ArrayOfRecipesComingFromTagsBar)]; // apply filter on table
// 	ArrayOfRecipesComingFromTagsBar.length = 0;
// 	ArrayOfRecipesComingFromTagsBar = uniq;
// }

//DEBUT
ArrayOfRecipesFinalWithoutDoublon = recipes;
console.log(ArrayOfRecipesFinalWithoutDoublon);
UpdateArraysOfIngredientsAndAppareilsAndUstensiles();
// Appy eventListener on tags
applytagEventListener();

// For all listbox, apply approriate EventListener
for (let i = 0; i < listButton.length; i++) {
	listButton[i].addEventListener("click", function (el) {
		el.currentTarget.classList.toggle("collapsed");
		// UpdateArraysOfIngredientsAndAppareilsAndUstensiles()
		if (el.target.id === menuIngredient[0].id) {
			AreaOfListOfIngredient.classList.toggle("show");
			inputIngredient.classList.toggle("show");
			titleIngredient.classList.toggle("show");
		} else if (el.target.id === menuAppliance[0].id) {
			AreaOfListOfAppliance.classList.toggle("show");
			inputAppliance.classList.toggle("show");
			titleAppliance.classList.toggle("show");
		} else if (el.target.id === menuUstensil[0].id) {
			AreaOfListOfUstensil.classList.toggle("show");
			inputUstensil.classList.toggle("show");
			titleUstensil.classList.toggle("show");
		}
		// console.log(el.target.id===menuUstensil[0].id)
		// for (let i = 0; i < item.length; i++) {
		//   if (item[i] !== el.currentTarget && item[i].className === "item collapsed") {
		//     item[i].classList.remove('collapsed');
		//   }
		// }
	});
}

inputIngredient.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	console.log(term);
	// if (term.length > 2) {
	listOfFilteredTagIngredients = listOfAvailableTagIngredient.filter((s) =>
		s.toLowerCase().includes(term)
	);
	LocationOfListOfIngredient.innerHTML = `${listOfFilteredTagIngredients
		.map(updateList)
		.join("")}`;
	applytagEventListener();
	// } else {
	// 	LocationOfListOfIngredient.innerHTML = `${listOfAvailableTagIngredient
	// 		.map(updateList)
	// 		.join("")}`;
	// 	applytagEventListener();
	// }
});
inputAppliance.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	console.log(term);
	// if (term.length > 2) {
	listOfFilteredTagAppliance = listOfAvailableTagAppliance.filter((s) =>
		s.toLowerCase().includes(term)
	);
	LocationOfListOfAppliance.innerHTML = `${listOfFilteredTagAppliance
		.map(updateList)
		.join("")}`;
	applytagEventListener();
	// } else {
	// 	LocationOfListOfAppliance.innerHTML = `${listOfAvailableTagAppliance.map(updateList).join("")}`;
	// 	applytagEventListener();
	// }
});
inputUstensil.addEventListener("keyup", function (e) {
	const term = e.target.value.toLowerCase();
	console.log(term);
	// if (term.length > 2) {
	listOfFilteredTagUstensil = listOfAvailableTagUstensil.filter((s) =>
		s.toLowerCase().includes(term)
	);

	console.log(ArrayOfRecipesComingFromTagsBar);
	LocationOfListOfUstensil.innerHTML = `${listOfFilteredTagUstensil
		.map(updateList)
		.join("")}`;
	applytagEventListener();
	// } else {
	// 	LocationOfListOfUstensil.innerHTML = `${listOfAvailableTagUstensil
	// 		.map(updateList)
	// 		.join("")}`;
	// 	applytagEventListener();
	// }
});
mainSearchInput.addEventListener("change", (e) => {
	let value = e.target.value;
	filterOnMainInput(value);
});

// document.addEventListener("DOMContentLoaded", (event) => {
// 	mainFunction();
// });
