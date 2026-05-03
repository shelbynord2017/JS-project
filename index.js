// API: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// API key: 1

async function main() {
const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
const data = await res.json()
console.log(data)




const meal = data.meals[0]





const wrapper = document.querySelector(".recipe__wrapper")
data.meals.forEach(meal => {
    let ingredients = ""

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]

        if (ingredient && ingredient.trim() !== "") {
            ingredients += `<li>${ingredient} - ${measure}</li>`
        }
    }
    

  wrapper.innerHTML += 
    `<h3 class="recipe__title">${meal.strMeal}</h3>
        <h5 class="recipe__origin">${meal.strArea}</h5>
        <ul class="ingredients">${ingredients}</ul>
        <p class="recipe__instr">${meal.strInstructions}</p>
        <figure class="meal__img-wrapper">
            <img src=${meal.strMealThumb} class="meal__img">
        </figure>
    `
})



}

main()