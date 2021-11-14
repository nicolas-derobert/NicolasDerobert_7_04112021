const filterOnHashtag = function (e, val) {
	let filterToApply = val.id; //Filter to apply
	const articleElement = document.querySelectorAll("article");
	const articleElementAsArray = Array.prototype.slice.call(articleElement);
	articleElementAsArray.forEach(function (val) {
		const tagToLookAt = val.querySelectorAll("div span");
		const tagToLookAtAsArray = Array.prototype.slice.call(tagToLookAt); // This code line allow the transfomation of tagToLookAt collection in an array --> full explanation in  : https://shifteleven.com/articles/2007/06/28/array-like-objects-in-javascript/
		let tagFound = false;
		tagToLookAtAsArray.forEach(function (val2) {
			if (val2.innerHTML == filterToApply) {
				tagFound = true;
			}
		});
		if (tagFound === true) {
			val.classList.remove("notdisplayed");
			val.classList.add("displayed");
		} else {
			val.classList.remove("displayed");
			val.classList.add("notdisplayed");
		}
	});
};

function photographersTemplate(photographerData) {
	return `
	<article class="displayed" id="">
	<a href="${photographerData.url()}">
	<div class="image-container">		<img
			src="${urlOfImagesPages + photographerData.portrait}"
			alt=""
			
			class="photograph-vignet"
		/></div>
		<h2 id="${photographerData.id}">${photographerData.name}</h2></a
	>
	<p class="location">${photographerData.city + " "} ${photographerData.country}</p>
	<p class="tagline">${photographerData.tagline}</p>
	<p class="price">${photographerData.price}€/jour</p>
	<div class="tags">
	${tagsTemplate(photographerData.tags)}
	</div>
	</article>
	`;
}
//So to get the result back you can wrap this in an IIFE like this:
const mainFunction = async () => {
	urlToApply = urlFromIndex;
	const dataOfJsonFileData = await getData();
	const dataOfJsonFilePhotographer = dataOfJsonFileData.photographers;
	placeDataInObject(dataOfJsonFilePhotographer);
	document.getElementById(
		"all-photographers"
	).innerHTML = `${dataOfJsonFilePhotographerAfterclassAssociation
		.map(photographersTemplate)
		.join("")}`;

	// To add eventlitener on tag -> Inspiration from video https://www.youtube.com/watch?v=JixTYeCLf4Q
	const tagListInHeader = document.querySelectorAll("nav > span");
	tagListInHeader.forEach(function (val) {
		val.addEventListener("click", (e) => {
			filterOnHashtag(e, val);
		});
		val.addEventListener("keypress", (e) => {
			if (e.keyCode === 13) {
				filterOnHashtag(e, val);
			}
		});
	});
};


document.addEventListener("DOMContentLoaded", (event) => {
	mainFunction();
});

// To show manage bypass block
document.addEventListener("scroll", function scrolling(e) {
	document.querySelector(".skip-link").classList.add("displayed");
	document.removeEventListener("scroll", scrolling);
});
