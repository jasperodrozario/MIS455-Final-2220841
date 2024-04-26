let full_data = [];
let original_div = document.getElementById("body-div");
let show_all_btn = document.getElementById("show-more-btn");
let search_item = "";

function connect() {
    show_all_btn.innerText = "Show More"
    show_all_btn.onclick = showMore

    search_item = document.getElementById("search-bar").value;
    document.getElementById("search-bar").value = "";
    
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_item}`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        full_data = data.meals || [];
        if(full_data.length > 0) {
            show(full_data.slice(0, 5), search_item)
            show_all_btn.style.display = full_data.length > 5? "block" : "none";
        }
        else {
            original_div.innerHTML = `
                <h6>Showing result(s) for "${search_item}":</h6>
                <p>No results found. Search something else.</p>
            `;
        }
    })
}

function show(data) {
    original_div.innerHTML = `<h6>Showing result(s) for "${search_item}":</h6>`;
    for(i=0; i<data.length; i++) {
        var new_div = document.createElement("div");
        new_div.id = "new-div";

        var ingredient_str = "";

        for(j=1; j<=20; j++) {
            ingredient = data[i][`strIngredient${j}`];
            measurement = data[i][`strMeasure${j}`];
            if(ingredient != "") {
                ingredient_str += `| ${ingredient}: ${measurement} `
            }
        }

        new_div.innerHTML = `
            <div class="card-header">
                <img src="${data[i].strMealThumb}">
                <div class="card-heading">
                    <h1>${data[i].strMeal}</h1><p><b>ID:</b> ${data[i].idMeal}</p>
                </div>
            </div>
            <div class="card-ingredients">
                <h5 style="margin-top: 10px">Ingredients: </h5>
                ${ingredient_str}
            </div>
            <div class="card-instructions">
                <h5 style="margin-top: 10px">Cooking Instructions: </h5>
                ${data[i].strInstructions}
            </div>        `;
        new_div.classList.add("card-style");
        original_div.appendChild(new_div);
    }
}

function showMore() {
    show(full_data);
    show_all_btn.innerText = "Show Less"
    show_all_btn.onclick = showLess;
}

function showLess() {
    show(full_data.slice(0, 5));
    show_all_btn.innerText = "Show More";
    show_all_btn.onclick = showMore;
}