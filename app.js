const form = document.getElementById("search-movie-form")
const typeSelect = document.getElementById("type")
const titleInput = document.getElementById("title")
const resultWrapper = document.getElementById("result")


form.addEventListener("submit", () => {
    event.preventDefault()
    const url = `https://www.omdbapi.com/?apikey=acf6457c&s=${ titleInput.value }&type=${ typeSelect.value }`
    getMovie(url)

})

function getMovie(url) {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Error")
            }
        })
        .then((data) => {
            if (data.Response === "False") {
                resultWrapper.innerHTML = `<p class="error-message">${ data.Error.toUpperCase() }</p>`
            } else {
                console.log(data)
                renderMovie(data.Search)
            }
        })
}

function renderMovie(movies) {
    const h2 = document.createElement("h2")
    h2.innerText = "All users:"
    resultWrapper.appendChild(h2)
    const result = movies.map((movie) =>
        `
<div class="content-wrapper">
    <div class="film-wrapper">
        <div class="image-wrapper">
            <img src=${ movie.Poster } alt="">
        </div>
        <div class="film-info-wrapper">
             <h4 class="movie-type">${ movie.Type }</h4>
             <h3 class="movie-title">${ movie.Title }</h3>
             <span class="year">${ movie.Year }</span>
             <button class="details-btn" type="button">Details</button>
        </div>
        
    </div>
</div>
`)
    resultWrapper.innerHTML = result.join(" ")
}