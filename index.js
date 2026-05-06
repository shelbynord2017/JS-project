// API: https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
// API key: 1

let meals = []

async function fetchMeals() {
const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
const data = await res.json()



const wrapper = document.querySelector(".recipe__wrapper")
const pageSize = 5
let currentPage = 1

function renderPage() {
    window.scrollTo(0, 0)
    wrapper.innerHTML = ""
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    const paginatedData = data.meals.slice(start, end)


    paginatedData.forEach(meal => {
        let ingredients = ""
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]

            if (ingredient && ingredient.trim() !== "") {
                ingredients += `<li>${ingredient} - ${measure}</li>`
            }
        }
  wrapper.innerHTML += 
    `
    <div class="recipe__wrapper">
        <h3 class="recipe__title">${meal.strMeal}</h3>
        <h5 class="recipe__origin">${meal.strArea}</h5>
        <div class="ingredients__wrapper">
            <ul class="ingredients">${ingredients}</ul>
        </div>
        <p class="recipe__instructions">${meal.strInstructions}</p>
        <figure class="meal__img--wrapper">
            <img src=${meal.strMealThumb} class="meal__img">
        </figure>
    </div>
    `
})
}

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--
        renderPage()
    }
})

document.getElementById("nextBtn").addEventListener("click", () => {
    currentPage++
    renderPage()
})

renderPage()
}

const form = document.querySelector(".search__form")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const searchValue = document.querySelector(".search__bar").value 
    

    fetchMeals(searchValue)
})

main()