const mealsEl = document.getElementById('meals');
const favcontainer = document.getElementById('fav');

const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}

function addMeal(mealData, random = false) {
    console.log(mealData);

    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
                 <div class="meal-header">
                    ${random ? `<span class="random">
                        Random Recipe
                    </span>`: ''}
                    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                    <div class="meal-body">
                        <h4>${mealData.strMeal}</h4>
                        <button class="fav-btn">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
    `
    const btn = meal.querySelector('.meal-body .fav-btn ');
    btn.addEventListener("click", () => {
        if (btn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove("active")
        } else {
            addMealToLS(mealData.idMeal);
            btn.classList.add("active")
        }
        fetchFavMeals();
    });

    meals.appendChild(meal)
}
function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem(
        'mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}
function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}
async function fetchFavMeals() {
    //clean the container
    favcontainer.innerHTML = '';

    const mealIds = getMealsFromLS();

    const meals = [];

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i];

        meal = await getMealById(mealId);
        addMealToFav(meal);

    }
    console.log(meals);
}
function addMealToFav(mealsData) {

    const favMeals = document.createElement('li');
    favMeals.innerHTML = `
                 <li><img src="${mealsData.strMealThumb}" alt="${mealsData.strMeal}"><span>${mealsData.strMeal}</span></li>
                 <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    const btn = favMeals.querySelector('.clear');
    btn.addEventListener('click', () => {
        removeMealFromLS(mealsData.idMeal);

        fetchFavMeals();
    });

    favcontainer.appendChild(favMeals);
}

searchBtn.addEventListener('click', async () => {
    mealsEl.innerHTML = '';

    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);

    if (meals) {
        meals.forEach(meal => {
            addMeal(meal);
        });
    }

})