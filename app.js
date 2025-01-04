function searchMeals() {
  const searchValue = document.getElementById("searchInput").value;
  const mealsContainer = document.getElementById("mealsContainer");
  const notFound = document.getElementById("notFound");
  const selectedMeal = document.getElementById("selectedMeal");

  mealsContainer.innerHTML = "";
  notFound.style.display = "none";
  selectedMeal.style.display = "none";
  document.getElementById("searchInput").value = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        data.meals.forEach((meal) => {
          const mealCard = `
                                <div class="col">
                                    <div class="card meal-card" onclick="showMealDetails('${meal.idMeal}')">
                                        <img src="${meal.strMealThumb}" class="card-img-top meal-img" alt="${meal.strMeal}">
                                        <div class="card-body">
                                            <h5 class="card-title">${meal.strMeal}</h5>
                                        </div>
                                    </div>
                                </div>
                            `;
          mealsContainer.innerHTML += mealCard;
        });
      } else {
        notFound.style.display = "block";
      }
    })
}

function showMealDetails(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      document.getElementById("selectedImage").src = meal.strMealThumb;
      document.getElementById("selectedName").textContent = meal.strMeal;
      document.getElementById("selectedIngredients").innerHTML = ingredients
        .map((ingredient) => `<div>${ingredient}</div>`)
        .join("");
      document.getElementById("selectedMeal").style.display = "flex";
    })
}
