 const searchBtn = document.getElementById('search-btn');
 const mealList = document.getElementById('meal');
 const mealDetailsContent = document.querySelector('.meal-details-content');
 const receipeCloseBtn = document.getElementById('receipe-close-btn');

 // event listeners
 searchBtn.addEventListener('click', getMealList);
 mealList.addEventListener('click', getMealReceipe);
receipeCloseBtn.addEventListener('click', ()=>{
	mealDetailsContent.parentElement.classList.remove('showReceipe');
})

 // get meal list that matches with the ingredients 
 async function getMealList(){
 	let searchInputTxt = document.getElementById('search-input').value.trim();
 	let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`);
 	let data =  await response.json();
 	let html = "";
 	if(data.meals){
 		data.meals.forEach(meal => {
 			html += `
 				<div class="meal-item" data-id="${meal.idMeal}">
				 		<div class="meal-img">
				 			<img src="${meal.strMealThumb}" alt="food">
				 		</div>
				 		<div class="meal-name">
				 			<h3>${meal.strMeal}</h3>
				 			<a href="#" class="receipe-btn">Get Receipe</a>
				 		</div>
				 	</div>
 			`;
 		});
 	}else{
 		html = "Sorry, we didn't find any meal with this ingredient!";
 		mealList.classList.add('notFound');
 	}

 	mealList.innerHTML = html;
}
 	
// get receipe for meal
async function getMealReceipe(event){
	event.preventDefault();
	if(event.target.classList.contains('receipe-btn')){
		let mealItem = event.target.parentElement.parentElement;
		let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`);
		let data = await res.json();
		mealReceipeModal(data.meals);
	}
}
// create a modal
function mealReceipeModal(meal){
	console.log(meal);
	meal = meal[0];
	let html = `
			<h2 class="receipe-title">${meal.strMeal}</h2>
			<p class="receipe-category">${meal.strCategory}</p>
			<div class="receipe-instruct">
				<h3>Instructions:</h3>
				<p>${meal.strInstructions}</p>
			</div>
			<div class="receipe-meal-img">
				<img src="${meal.strMealThumb}" alt="">
			</div>
			<div class="receipe-link">
				<a href="${meal.strYoutube}" target="_blank">Watch Video</a>
			</div>
	`;
	mealDetailsContent.innerHTML = html;
	mealDetailsContent.parentElement.classList.add('showReceipe');
}

