// Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let Text = document.getElementById("Text-code");
let loadingMessage = document.getElementById("loading-message"); // Loading message element
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", async () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
  } else {
    try {
      // Display loading message while fetching data
      loadingMessage.style.display = "block";
      loadingMessage.innerHTML = "Loading...";

      const response = await axios.get(url + userInp);
      const info = response.data;
      let myMeal = info.meals[0];
      console.log(info)
      if (myMeal) {
        loadingMessage.style.display = "none";

        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `
          <img src=${myMeal.strMealThumb}>
          <div class="details">
              <h2>${myMeal.strMeal}</h2>
              <h4>${myMeal.strArea}</h4>
          </div>
          <div id="ingredient-con"></div>
          <div id="recipe">
              <button id="hide-recipe">X</button>
              <pre id="instructions">${myMeal.strInstructions}</pre>
          </div>
          <button id="show-recipe">View Recipe</button>
        `;

        let ingredientCon = document.getElementById("ingredient-con");
        let parent = document.createElement("ul");
        let recipe = document.getElementById("recipe");
        let hideRecipe = document.getElementById("hide-recipe");
        let showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((i) => {
          let child = document.createElement("li");
          child.innerText = i;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      } else {
        // Hide loading message when no results found
        loadingMessage.style.display = "none";

      }
    } catch (error) {
      result.innerHTML = `<h3>No Results Found</h3>`;
      // Hide loading message when there is an error
      loadingMessage.style.display = "none";
    }
  }
});
